const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    diagnosis: String,
    appointmentDate: String
});

module.exports = mongoose.model('Patient', PatientSchema);