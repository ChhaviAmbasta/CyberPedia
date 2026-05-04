import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(username.trim(), password.trim());
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/preferences');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyber-primary text-glow mb-2">
            CYBERPEDIA
          </h1>
          <p className="text-gray-500 text-sm">Interactive Cybersecurity Learning Platform</p>
        </div>

        {/* Login Form */}
        <div className="cyber-card">
          <h2 className="text-xl text-cyber-primary mb-6 font-mono">Login</h2>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-2 mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="cyber-input"
                placeholder="demo"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input"
                placeholder="student"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cyber-button w-full"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500 text-xs">
            <p>Demo credentials: demo / student</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></span>
          <span className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse delay-75"></span>
          <span className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse delay-150"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
