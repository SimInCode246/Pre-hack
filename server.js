const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// --- 1. MongoDB Connection Setup ---
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property_db')
    .then(() => console.log('Connected to MongoDB Database.'))
    .catch(err => console.error('Database connection failed: ' + err.stack));

// --- 1.5 Mongoose Models ---
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const propertySchema = new mongoose.Schema({
    city: String,
    area: String,
    type: String,
    bhk: String,
    price: Number,
}, { strict: false }); // strict: false allows dynamic unstructured properties since old schema wasn't fully defined
const Property = mongoose.model('Property', propertySchema);

// --- 2. Authentication Routes ---

// Register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 3. Property Routes ---

// Get all properties with filters
app.get('/api/properties', async (req, res) => {
    const { city, type, bhk, budgetMin, budgetMax } = req.query;
    
    let query = {};

    if (city) {
        query.$or = [
            { city: { $regex: city, $options: 'i' } },
            { area: { $regex: city, $options: 'i' } }
        ];
    }
    if (type && type !== 'all') {
        query.type = type;
    }
    if (bhk && bhk !== 'all') {
        query.bhk = bhk;
    }
    if (budgetMin || budgetMax) {
        query.price = {};
        if (budgetMin) query.price.$gte = Number(budgetMin);
        if (budgetMax) query.price.$lte = Number(budgetMax);
    }

    try {
        const results = await Property.find(query);
        res.json({ properties: results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 4. Loan Eligibility Logic ---
app.post('/api/loans/eligibility', (req, res) => {
    const { annualIncome } = req.body;
    
    // Logic mirroring your frontend calculations but secured on server
    const response = {
        pmayEligible: annualIncome < 600000,
        maxLoanAmount: annualIncome * 5,
        estimatedEMI: (annualIncome * 0.3) / 12,
        schemes: []
    };

    if (annualIncome < 300000) {
        response.schemes.push({ name: 'PMAY-EWS', subsidy: '6.5%' });
    } else if (annualIncome < 600000) {
        response.schemes.push({ name: 'PMAY-LIG', subsidy: '4.0%' });
    }

    res.json(response);
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
