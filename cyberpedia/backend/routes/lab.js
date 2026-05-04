const express = require('express');
const router = express.Router();
const commands = require('../data/commands.json');

// Execute lab command
router.post('/execute', (req, res) => {
  const { command } = req.body;
  
  if (!command) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a command'
    });
  }
  
  const trimmedCommand = command.trim().toLowerCase();
  const output = commands[trimmedCommand];
  
  if (output) {
    res.json({
      success: true,
      command: trimmedCommand,
      output
    });
  } else {
    res.json({
      success: true,
      command: trimmedCommand,
      output: `bash: ${trimmedCommand}: command not found`
    });
  }
});

// Get available commands
router.get('/commands', (req, res) => {
  res.json({
    success: true,
    commands: Object.keys(commands)
  });
});

module.exports = router;
