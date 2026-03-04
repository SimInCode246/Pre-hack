const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// --- 1. MySQL Connection Setup ---
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// --- 2. Authentication Routes ---

// Register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        
        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(400).json({ message: "Email already exists" });
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

// --- 3. Property Routes ---

// Get all properties with filters
app.get('/api/properties', (req, res) => {
    const { city, type, bhk, budgetMin, budgetMax } = req.query;
    
    let query = 'SELECT * FROM properties WHERE 1=1';
    const params = [];

    if (city) {
        query += ' AND (city LIKE ? OR area LIKE ?)';
        params.push(`%${city}%`, `%${city}%`);
    }
    if (type && type !== 'all') {
        query += ' AND type = ?';
        params.push(type);
    }
    if (bhk && bhk !== 'all') {
        query += ' AND bhk = ?';
        params.push(bhk);
    }
    if (budgetMin) {
        query += ' AND price >= ?';
        params.push(budgetMin);
    }
    if (budgetMax) {
        query += ' AND price <= ?';
        params.push(budgetMax);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ properties: results });
    });
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