import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import Dashboard from './pages/Dashboard';
import TopicContent from './pages/TopicContent';
import Lab from './pages/Lab';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-dark">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topic/:id" element={<TopicContent />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
