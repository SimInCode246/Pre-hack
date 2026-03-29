const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property_db')
    .then(() => console.log('Connected to MongoDB Database.'))
    .catch(err => console.error('Database connection failed: ' + err.stack));

const propertySchema = new mongoose.Schema({
    city: String,
    area: String,
    type: String,
    bhk: String,
    price: Number,
}, { strict: false }); 
const Property = mongoose.model('Property', propertySchema);

const stateCapitals = [
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
    { city: 'Itanagar', state: 'Arunachal Pradesh', lat: 27.0844, lng: 93.6053 },
    { city: 'Guwahati', state: 'Assam', lat: 26.1158, lng: 91.7086 },
    { city: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
    { city: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lng: 81.6296 },
    { city: 'Panaji', state: 'Goa', lat: 15.4909, lng: 73.8278 },
    { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
    { city: 'Gurgaon', state: 'Haryana', lat: 28.4089, lng: 77.0422 },
    { city: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
    { city: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lng: 85.3096 },
    { city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
    { city: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
    { city: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
    { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
    { city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
    { city: 'Imphal', state: 'Manipur', lat: 24.8170, lng: 93.9368 },
    { city: 'Shillong', state: 'Meghalaya', lat: 25.5788, lng: 91.8933 },
    { city: 'Aizawl', state: 'Mizoram', lat: 23.7307, lng: 92.7173 },
    { city: 'Kohima', state: 'Nagaland', lat: 25.6751, lng: 94.1086 },
    { city: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245 },
    { city: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573 },
    { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
    { city: 'Gangtok', state: 'Sikkim', lat: 27.3389, lng: 88.6065 },
    { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    { city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
    { city: 'Agartala', state: 'Tripura', lat: 23.8315, lng: 91.2868 },
    { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
    { city: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lng: 78.0322 },
    { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
    { city: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { city: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lng: 76.7794 }
];

const generatedData = [];

// Generate 2-3 properties per city
stateCapitals.forEach(cityInfo => {
    // Property 1 (Affordable 2BHK)
    generatedData.push({
        title: `Affordable 2BHK in ${cityInfo.city}`,
        price: Math.floor(Math.random() * 8000) + 12000, 
        type: 'rent',
        bhk: '2',
        city: cityInfo.city,
        area: 'City Center',
        sqft: 900 + Math.floor(Math.random() * 200),
        description: `Budget-friendly apartment located in the accessible areas of ${cityInfo.city}.`,
        amenities: ['parking', 'security'],
        lat: cityInfo.lat + (Math.random() * 0.05 - 0.025),
        lng: cityInfo.lng + (Math.random() * 0.05 - 0.025),
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
        contactName: 'Local Agent',
        contactPhone: '+91 98765 00001'
    });

    // Property 2 (Premium 3BHK)
    generatedData.push({
        title: `Premium 3BHK Apartment in ${cityInfo.city}`,
        price: Math.floor(Math.random() * 20000) + 25000, 
        type: 'rent',
        bhk: '3',
        city: cityInfo.city,
        area: 'Posh Colony',
        sqft: 1500 + Math.floor(Math.random() * 300),
        description: `Spacious and luxurious living in the heart of ${cityInfo.state}.`,
        amenities: ['parking', 'gym', 'pool', 'security'],
        lat: cityInfo.lat + (Math.random() * 0.05 - 0.025),
        lng: cityInfo.lng + (Math.random() * 0.05 - 0.025),
        image: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&h=600&fit=crop',
        contactName: 'Premium Dealer',
        contactPhone: '+91 98765 00002'
    });
    
    // Property 3 (Small 1BHK)
    generatedData.push({
        title: `Cozy 1BHK near ${cityInfo.city} Station`,
        price: Math.floor(Math.random() * 5000) + 7000, 
        type: 'rent',
        bhk: '1',
        city: cityInfo.city,
        area: 'Residential Sector',
        sqft: 500 + Math.floor(Math.random() * 100),
        description: 'Perfect for bachelors and students, highly affordable flat.',
        amenities: ['security'],
        lat: cityInfo.lat + (Math.random() * 0.05 - 0.025),
        lng: cityInfo.lng + (Math.random() * 0.05 - 0.025),
        image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
        contactName: 'Independent Owner',
        contactPhone: '+91 98765 00003'
    });
});

async function seedDB() {
    try {
        console.log('Clearing old properties...');
        await Property.deleteMany({});
        
        console.log(`Inserting ${generatedData.length} new properties across all major cities/states...`);
        await Property.insertMany(generatedData);
        
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Failed to seed DB:', error);
        process.exit(1);
    }
}

setTimeout(seedDB, 1500);
