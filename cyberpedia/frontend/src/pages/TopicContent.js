import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTopic } from '../services/api';

function TopicContent() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await getTopic(id);
        if (response.data.success) {
          setTopic(response.data.topic);
        }
      } catch (err) {
        setError('Topic not found');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-cyber-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-cyber-primary mb-4">Topic Not Found</h1>
          <Link to="/dashboard" className="text-gray-500 hover:text-cyber-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
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

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyber-primary text-glow mb-2">
            {topic.title}
          </h1>
          <div className="flex gap-2">
            {topic.lab && (
              <span className="text-xs bg-cyber-primary/20 text-cyber-primary px-2 py-1">
                Lab Available
              </span>
            )}
          </div>
        </div>

        {/* Content Card */}
        <div className="cyber-card space-y-6">
          {/* Introduction */}
          <div>
            <h2 className="text-lg text-cyber-primary font-mono mb-2">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              {topic.introduction}
            </p>
          </div>

          {/* Detailed Explanation */}
          <div>
            <h2 className="text-lg text-cyber-primary font-mono mb-2">Detailed Explanation</h2>
            {topic.sections && topic.sections.length > 0 ? (
               <div className="space-y-6">
                {topic.sections.map((section, index) => (
                  <div key={index} className="border-l-2 border-gray-800 pl-4">
                    <h3 className="text-cyber-accent font-semibold mb-3">
                      {section.heading}
                    </h3>

                    {/* Section content */}
                    {section.content && (
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {section.content}
                      </p>
                    )}

                    {/* Key Concepts with points */}
                    {section.points && section.points.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {section.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyber-primary">▸</span>
                            <span className="text-gray-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Subsections (White Hat, Black Hat, Grey Hat) */}
                    {section.subsections && section.subsections.length > 0 && (
                      <div className="space-y-4 mt-4">
                        {section.subsections.map((subsection, subIndex) => (
                          <div key={subIndex} className="bg-black/30 p-4 rounded border border-gray-800">
                            <h4 className="text-cyber-accent font-semibold mb-2">
                              {subsection.title}
                            </h4>
                            {subsection.content && (
                              <p className="text-gray-300 leading-relaxed mb-2">
                                {subsection.content}
                              </p>
                            )}
                            {subsection.points && subsection.points.length > 0 && (
                              <ul className="space-y-1">
                                {subsection.points.map((point, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-cyber-primary">•</span>
                                    <span className="text-gray-400">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comparison Table */}
                    {section.table && section.table.length > 0 && (
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-cyber-primary p-2">Aspect</th>
                              <th className="text-cyber-primary p-2">White Hat</th>
                              <th className="text-cyber-primary p-2">Black Hat</th>
                              <th className="text-cyber-primary p-2">Grey Hat</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.map((row, i) => (
                              <tr key={i} className="border-b border-gray-800/50">
                                <td className="text-cyber-accent p-2 font-semibold">{row.aspect}</td>
                                <td className="text-gray-300 p-2">{row.white_hat}</td>
                                <td className="text-gray-300 p-2">{row.black_hat}</td>
                                <td className="text-gray-300 p-2">{row.grey_hat}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
             ) : (
                <p className="text-gray-300 leading-relaxed">
                {topic.detailed_explanation}
              </p>
            )}
          </div>

          {/* Key Concepts */}
          <div>
            <h2 className="text-lg text-cyber-primary font-mono mb-2">Key Concepts</h2>
            <ul className="space-y-2">
              {topic.key_concepts && topic.key_concepts.map((concept, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-cyber-primary">▸</span>
                  <span className="text-gray-300">{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Real-world Example */}
          <div>
            <h2 className="text-lg text-cyber-primary font-mono mb-2">Real-world Example</h2>
            {topic.real_world_example ? (
              <div className="bg-black border border-gray-800 p-4">
                {topic.real_world_example.title && (
                  <h3 className="text-cyber-accent font-semibold mb-2">
                    {topic.real_world_example.title}
                  </h3>
                )}
                <p className="text-gray-300 italic">
                  {topic.real_world_example.description || topic.real_world_example}
                </p>
              </div>
            ) : (
              <div className="bg-black border border-gray-800 p-4">
                <p className="text-gray-300 italic">
                  "{topic.example}"
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-lg text-cyber-primary font-mono mb-2">Summary</h2>
            <p className="text-gray-300 leading-relaxed border-l-2 border-cyber-primary pl-4">
              {topic.summary}
            </p>
          </div>
        </div>

        {/* Lab Button */}
        {topic.lab && (
          <div className="mt-6">
            <Link
              to="/lab"
              className="block cyber-card text-center hover:border-cyber-primary cursor-pointer"
            >
              <h3 className="text-xl text-cyber-primary font-mono mb-2">
                🖥️ Try in Lab
              </h3>
              <p className="text-gray-400 text-sm">
                Practice what you learned in the terminal simulator
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopicContent;
