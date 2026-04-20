const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Patient = require('./models/Patient'); // Moved up with other imports

const app = express();
app.use(express.json());
app.use(cors()); 

const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(err => console.log("Connection error:", err));

app.get('/', (req, res) => {
    res.send("Health Management System API is running...");
});

app.post('/add-patient', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// IMPORTANT CHANGE FOR CLOUD:
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});