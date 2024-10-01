const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables

const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Question 1
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving patients:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Question 2
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving providers:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Question 3
app.get('/patients/:firstName', (req, res) => {
  const firstName = req.params.firstName;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(query, [firstName], (err, results) => {
    if (err) {
      console.error('Error retrieving patients by first name:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Question 4
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  db.query(query, [specialty], (err, results) => {
    if (err) {
      console.error('Error retrieving providers by specialty:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
