// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const recordsList = document.getElementById('records-list');
const appointmentsList = document.getElementById('appointments-list');

const API_URL = "http://localhost:5000"; // While developing locally

// Updated Login Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;

    try {
        // 1. Fetch patient data from your real backend
        const response = await fetch(`${API_URL}/patients`);
        const patients = await response.json();

        // 2. Find the patient by email (Simple logic for now)
        const patient = patients.find(p => p.email === email);

        if (patient) {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            document.getElementById('welcome-message').textContent = `Welcome, ${patient.name}`;
            displayData(patient);
        } else {
            alert("Patient not found. Check the database!");
        }
    } catch (error) {
        console.error("Error connecting to backend:", error);
    }
});

function displayData(patient) {
    recordsList.innerHTML = `<li><strong>Diagnosis:</strong> ${patient.diagnosis || 'No records found'}</li>`;
    appointmentsList.innerHTML = `<li><strong>Next Visit:</strong> ${patient.appointmentDate || 'None scheduled'}</li>`;
}
// Handle Logout - Don't forget this!
logoutBtn.addEventListener('click', () => {
    dashboardSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    document.getElementById('email').value = ''; // Clear the input
    document.getElementById('password').value = '';
});

// Refined Login Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    // Show a loading state (Optional but good UX)
    document.querySelector('button[type="submit"]').textContent = "Connecting...";

    try {
        const response = await fetch(`${API_URL}/patients`);
        
        if (!response.ok) throw new Error("Failed to connect to server");

        const patients = await response.json();
        const patient = patients.find(p => p.email.toLowerCase() === email.toLowerCase());

        if (patient) {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            document.getElementById('welcome-message').textContent = `Welcome, ${patient.name}`;
            displayData(patient);
        } else {
            alert("User not found in our medical records.");
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Server is offline. Did you run 'node server.js'?");
    } finally {
        document.querySelector('button[type="submit"]').textContent = "Login";
    }
});