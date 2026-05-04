import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [roadmap, setRoadmap] = useState(null);
  const [topics, setTopics] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRoadmap = localStorage.getItem('roadmap');
    if (!savedRoadmap) {
      navigate('/preferences');
      return;
    }

    const roadmapData = JSON.parse(savedRoadmap);
    setRoadmap(roadmapData);

    // Fetch all topics
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content/');
        const topicsData = {};
        response.data.topics.forEach(topic => {
          topicsData[topic.id] = topic;
        });
        setTopics(topicsData);
      } catch (err) {
        console.error('Failed to fetch topics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handlePreferences = () => {
    navigate('/preferences');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-cyber-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-cyber-primary text-glow">
             CYBERPEDIA
            </h1>
            {roadmap && (
              <p className="text-gray-500 text-sm mt-1">
                {roadmap.domain} • {roadmap.level} • {roadmap.mode}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePreferences}
              className="text-gray-500 hover:text-cyber-primary text-sm"
            >
              Change Preferences
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-cyber-primary text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Lab Access */}
        <div className="mb-8">
          <Link
            to="/lab"
            className="block cyber-card text-center hover:border-cyber-primary cursor-pointer"
          >
            <h3 className="text-xl text-cyber-primary font-mono mb-2">
              🖥️ Lab Simulator
            </h3>
            <p className="text-gray-400 text-sm">
              Practice commands in a terminal environment
            </p>
          </Link>
        </div>

        {/* Roadmap */}
        <div className="cyber-card">
          <h2 className="text-xl text-cyber-primary mb-6 font-mono">
            Your Learning Roadmap
          </h2>

          {roadmap && roadmap.roadmap && (
            <div className="space-y-4">
              {roadmap.roadmap.map((topicId, index) => {
                const topic = topics[topicId];
                if (!topic) return null;

                return (
                  <Link
                    key={topicId}
                    to={`/topic/${topicId}`}
                    className="block border border-gray-800 p-4 hover:border-cyber-primary transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-cyber-primary/10 text-cyber-primary font-mono text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-100 font-mono mb-1">
                          {topic.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                          {topic.introduction}
                        </p>
                        <div className="flex gap-2">
                          {topic.lab && (
                            <span className="text-xs bg-cyber-primary/20 text-cyber-primary px-2 py-1">
                              Lab Available
                            </span>
                          )}
                          {topic.key_concepts && topic.key_concepts.slice(0, 2).map((concept, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-800 text-gray-400 px-2 py-1"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-8 cyber-card">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Progress</span>
            <span className="text-cyber-primary text-sm">
              {roadmap?.roadmap?.length || 0} topics
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2">
            <div
              className="bg-cyber-primary h-2 transition-all"
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
