const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const trimmedUsername = typeof username === 'string' ? username.trim().toLowerCase() : '';
  const trimmedPassword = typeof password === 'string' ? password.trim().toLowerCase() : '';

  if (trimmedUsername === 'demo' && trimmedPassword === 'student') {
    res.json({
      success: true,
      message: 'Login successful',
      user: { username: 'demo' }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

module.exports = router;

