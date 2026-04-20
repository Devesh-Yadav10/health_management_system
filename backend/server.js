const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Allows your frontend to talk to this backend

// Replace this with the string you just copied!
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(err => console.log("Connection error:", err));

// A simple Route to test
app.get('/', (req, res) => {
    res.send("Health Management System API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const Patient = require('./models/Patient');

// Route to add a new patient
app.post('/add-patient', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to get all patients
app.get('/patients', async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
});