const express = require('express');
const router = express.Router();

// Roadmap data based on domain and level
const roadmaps = {
  'Ethical Hacking': {
    'Beginner': {
      'Theory': ['intro_hacking', 'types_of_hackers', 'legal_basics'],
      'Practical': ['footprinting', 'osint'],
      'Mixed': ['intro_hacking', 'types_of_hackers', 'footprinting', 'osint']
    },
    'Intermediate': {
      'Theory': ['types_of_hackers', 'legal_basics', 'footprinting'],
      'Practical': ['port_scanning', 'network_scanning'],
      'Mixed': ['types_of_hackers', 'footprinting', 'port_scanning', 'network_scanning']
    },
    'Advanced': {
      'Theory': ['legal_basics', 'footprinting', 'osint'],
      'Practical': ['port_scanning', 'network_scanning'],
      'Mixed': ['legal_basics', 'footprinting', 'port_scanning', 'network_scanning']
    }
  },
  'Network Fundamentals': {
    'Beginner': {
      'Theory': ['intro_hacking', 'network_scanning'],
      'Practical': ['port_scanning'],
      'Mixed': ['intro_hacking', 'network_scanning', 'port_scanning']
    },
    'Intermediate': {
      'Theory': ['network_scanning', 'port_scanning'],
      'Practical': ['port_scanning', 'network_scanning'],
      'Mixed': ['network_scanning', 'port_scanning']
    },
    'Advanced': {
      'Theory': ['port_scanning', 'network_scanning'],
      'Practical': ['network_scanning', 'port_scanning'],
      'Mixed': ['network_scanning', 'port_scanning']
    }
  },
  'Linux Fundamentals': {
    'Beginner': {
      'Theory': ['intro_hacking', 'types_of_hackers'],
      'Practical': ['footprinting'],
      'Mixed': ['intro_hacking', 'types_of_hackers', 'footprinting']
    },
    'Intermediate': {
      'Theory': ['types_of_hackers', 'legal_basics'],
      'Practical': ['osint', 'footprinting'],
      'Mixed': ['types_of_hackers', 'legal_basics', 'osint', 'footprinting']
    },
    'Advanced': {
      'Theory': ['legal_basics', 'osint'],
      'Practical': ['port_scanning', 'network_scanning'],
      'Mixed': ['legal_basics', 'osint', 'port_scanning', 'network_scanning']
    }
  }
};

router.post('/generate', (req, res) => {
  const { domain, level, mode } = req.body;
  
  if (!domain || !level || !mode) {
    return res.status(400).json({
      success: false,
      message: 'Please provide domain, level, and mode'
    });
  }
  
  const roadmapKey = roadmaps[domain] && roadmaps[domain][level] ? level : 'Beginner';
  const modeKey = roadmaps[domain] && roadmaps[domain][roadmapKey] ? mode : 'Theory';
  
  const topics = roadmaps[domain]?.[roadmapKey]?.[modeKey] || [];
  
  res.json({
    success: true,
    roadmap: topics,
    domain,
    level: roadmapKey,
    mode: modeKey
  });
});

module.exports = router;
