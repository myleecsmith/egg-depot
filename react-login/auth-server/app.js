const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// MongoDB connection URI
const dbURI = "mongodb+srv://devindubois03:lMRzhP3qH0o3rQR5@eggdata.oydljq9.mongodb.net/EggDepotData";

// Define a JWT secret key (should be isolated using environment variables for security)
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg';

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define mongoose schema and model for user
const userSchema = new mongoose.Schema({
  User_ID: { type: Number, required: true },
  email: { type: String, required: true }, // Renamed Username to email
  donor: { type: Boolean, default: false },
  Password: { type: String, required: true },
  Level: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Auth endpoint for creating a new user or logging in an existing user
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get the count of existing users to determine the new User_ID
    const userCount = await User.countDocuments();
    const newUser_ID = userCount + 1;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with default values for donor and Level
    const newUser = await User.create({
      User_ID: newUser_ID,
      email, // Changed Username to email
      Password: hashedPassword,
      donor: false,
      Level: '1'
    });

    // Generate JWT token
    const token = jwt.sign({ email }, jwtSecretKey);

    // Send success response with token
    return res.status(200).json({ message: 'success', token });
  } catch (error) {
    console.error('Error in authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify endpoint to check if JWT token is valid
app.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token';
  const authToken = req.headers[tokenHeaderKey];
  
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: 'logged in', message: 'success' });
    } else {
      return res.status(401).json({ status: 'invalid auth', message: 'error' });
    }
  } catch (error) {
    return res.status(401).json({ status: 'invalid auth', message: 'error' });
  }
});

// Check if an account exists for a given email address
app.post('/check-account', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }); // Changed Username to email
    if (user) {
      return res.status(200).json({ status: 'User exists', userExists: true });
    } else {
      return res.status(200).json({ status: 'User does not exist', userExists: false });
    }
  } catch (error) {
    console.error('Error checking account:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
