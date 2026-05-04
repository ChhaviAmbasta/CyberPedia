const express = require('express');
const router = express.Router();
const topics = require('../data/topics.json');

// Get all topics
router.get('/', (req, res) => {
  res.json({
    success: true,
    topics: Object.values(topics)
  });
});

// Get topic by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const topic = topics[id];
  
  if (!topic) {
    return res.status(404).json({
      success: false,
      message: 'Topic not found'
    });
  }
  
  res.json({
    success: true,
    topic
  });
});

module.exports = router;
