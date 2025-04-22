// app.js

const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Body parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password
  database: 'user_database', // Make sure to create the database
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database!');
});

// Signup Route
app.post('/signup', (req, res) => {
  const { phone_number, username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    // Insert user data into the database
    const query = 'INSERT INTO users (phone_number, username, password_hash) VALUES (?, ?, ?)';
    db.query(query, [phone_number, username, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving user to database' });
      }
      res.status(200).json({ message: 'User registered successfully' });
    });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { phone_number, password } = req.body;

  // Fetch the user from the database
  const query = 'SELECT * FROM users WHERE phone_number = ?';
  db.query(query, [phone_number], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    // Compare the password with the stored hash
    bcrypt.compare(password, result[0].password_hash, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ error: 'Invalid phone number or password' });
      }
      res.status(200).json({ message: 'Login successful' });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
