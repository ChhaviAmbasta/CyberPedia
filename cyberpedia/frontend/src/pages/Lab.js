import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { executeCommand, getAvailableCommands } from '../services/api';

function Lab() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Cyberpedia Lab Simulator v1.0.0' },
    { type: 'system', text: 'Type "help" for available commands' },
    { type: 'system', text: '-------------------------------------' }
  ]);
  const [availableCommands, setAvailableCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const outputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await getAvailableCommands();
        if (response.data.success) {
          setAvailableCommands(response.data.commands);
        }
      } catch (err) {
        console.error('Failed to fetch commands:', err);
      }
    };

    fetchCommands();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.trim();
    setLoading(true);

    // Add user command to output
    setOutput(prev => [...prev, { type: 'command', text: `$ ${cmd}` }]);

    try {
      const response = await executeCommand(cmd);
      if (response.data.success) {
        setOutput(prev => [...prev, { type: 'output', text: response.data.output }]);
      }
    } catch (err) {
      setOutput(prev => [...prev, { type: 'error', text: 'Command execution failed' }]);
    } finally {
      setLoading(false);
      setCommand('');
    }
  };

  const handleHelp = () => {
    setOutput(prev => [
      ...prev,
      { type: 'command', text: '$ help' },
      { type: 'system', text: 'Available commands:' },
      ...availableCommands.map(cmd => ({ type: 'output', text: `  ${cmd}` })),
      { type: 'system', text: '-------------------------------------' }
    ]);
  };

  const handleClear = () => {
    setOutput([
      { type: 'system', text: 'Terminal cleared' },
      { type: 'system', text: '-------------------------------------' }
    ]);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      handleClear();
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-cyber-primary text-sm">
            ← Back to Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-cyber-primary text-sm"
          >
            Logout
          </button>
        </div>

        {/* Terminal */}
        <div className="cyber-card p-0 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-gray-500 text-sm ml-2">Lab Terminal</span>
          </div>

          {/* Terminal Output */}
          <div 
            ref={outputRef}
            className="terminal h-96 overflow-auto"
            onKeyDown={handleKeyDown}
          >
            {output.map((line, index) => (
              <div key={index} className={`mb-1 ${
                line.type === 'command' ? 'terminal-prompt' :
                line.type === 'output' ? 'terminal-output' :
                line.type === 'error' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                {line.text}
              </div>
            ))}
            {loading && (
              <div className="text-cyber-primary animate-pulse">Executing...</div>
            )}
          </div>

          {/* Terminal Input */}
          <form onSubmit={handleSubmit} className="bg-black border-t border-gray-800 p-4">
            <div className="flex items-center gap-2">
              <span className="text-cyber-primary">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="bg-transparent text-cyber-primary flex-1 focus:outline-none font-mono"
                placeholder="Enter command..."
                autoFocus
              />
            </div>
          </form>
        </div>

        {/* Quick Commands */}
        <div className="mt-4 cyber-card">
          <h3 className="text-cyber-primary text-sm mb-3 font-mono">Quick Commands</h3>
          <div className="flex flex-wrap gap-2">
            {availableCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => setCommand(cmd)}
                className="text-xs bg-gray-800 text-gray-300 px-3 py-1 hover:bg-cyber-primary hover:text-cyber-dark transition-colors"
              >
                {cmd}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="text-xs bg-gray-800 text-gray-300 px-3 py-1 hover:bg-red-500 hover:text-white transition-colors"
            >
              clear
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-center text-gray-500 text-xs">
          <p>Press Ctrl+L to clear terminal</p>
        </div>
      </div>
    </div>
  );
}

export default Lab;
