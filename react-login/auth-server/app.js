const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// MongoDB connection URI
const dbURI = "mongodb+srv://tori:aJM8EVn3exWin0y2@eggdepot.edyuvos.mongodb.net/";

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
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Email exists, check password
      const passwordMatch = await bcrypt.compare(password, existingUser.Password);
      if (!passwordMatch) {
        // Password doesn't match
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // Password matches, generate JWT token
      const token = jwt.sign({ email }, jwtSecretKey);
      return res.status(200).json({ message: 'success', token });
    } else {
      // Email doesn't exist, create a new account
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
    }
  } catch (error) {
    console.error('Error in authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Set donor status for the current user
app.post('/setDonor', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user exists, update donor status to true
    if (user) {
      user.donor = true;
      await user.save();
      return res.status(200).json({ message: 'Donor status updated successfully' });
    } else {
      // If user does not exist, return error
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error setting donor status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// Increase the level of the current user by one
app.post('/increaseLevel', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user exists, increment the level by one
    if (user) {
      // Convert level to number and increment by one
      user.Level = (parseInt(user.Level) + 1).toString();
      await user.save();
      return res.status(200).json({ message: 'User level increased successfully' });
    } else {
      // If user does not exist, return error
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error increasing user level:', error);
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
