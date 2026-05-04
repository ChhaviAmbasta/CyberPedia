import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoadmap } from '../services/api';

function Preferences() {
  const [domain, setDomain] = useState('');
  const [level, setLevel] = useState('');
  const [mode, setMode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const domains = ['Ethical Hacking', 'Network Fundamentals', 'Linux Fundamentals'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const modes = ['Theory', 'Practical', 'Mixed'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!domain || !level || !mode) {
      setError('Please select all options');
      return;
    }

    setLoading(true);

    try {
      const response = await generateRoadmap(domain, level, mode);
      if (response.data.success) {
        localStorage.setItem('roadmap', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-cyber-primary text-glow">
            CYBERPEDIA
          </h1>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-cyber-primary text-sm"
          >
            Logout
          </button>
        </div>

        {/* Preferences Form */}
        <div className="cyber-card">
          <h2 className="text-xl text-cyber-primary mb-2 font-mono">
            Select Your Preferences
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Customize your learning path based on your goals
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-2 mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Domain Selection */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-3">Domain</label>
              <div className="grid grid-cols-1 gap-2">
                {domains.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDomain(d)}
                    className={`p-4 text-left border-2 transition-all ${
                      domain === d
                        ? 'border-cyber-primary bg-cyber-primary/10 text-cyber-primary'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Selection */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-3">Level</label>
              <div className="grid grid-cols-3 gap-2">
                {levels.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    className={`p-3 text-center border-2 transition-all ${
                      level === l
                        ? 'border-cyber-primary bg-cyber-primary/10 text-cyber-primary'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-3">Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {modes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`p-3 text-center border-2 transition-all ${
                      mode === m
                        ? 'border-cyber-primary bg-cyber-primary/10 text-cyber-primary'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !domain || !level || !mode}
              className="cyber-button w-full"
            >
              {loading ? 'Generating Roadmap...' : 'Start Learning'}
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <p>Your roadmap will be generated based on these preferences</p>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
