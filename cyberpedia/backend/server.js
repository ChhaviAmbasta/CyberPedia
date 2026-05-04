const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\`$({new Date().toISOString()}) ${req.method} ${req.url}\``);
  next();
});

// Import routes
const authRoutes = require('./routes/auth');
const roadmapRoutes = require('./routes/roadmap');
const contentRoutes = require('./routes/content');
const labRoutes = require('./routes/lab');

app.use('/api/auth', authRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/lab', labRoutes);

// Serve static files in production
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
