import { useState, useEffect } from 'react';
import { liveUpdates } from '../constants';

const LiveUpdates = () => {
  const [updates, setUpdates] = useState(liveUpdates);
  const [newUpdateCount, setNewUpdateCount] = useState(0);

  useEffect(() => {
    // Simulate new updates every 2 minutes
    const interval = setInterval(() => {
      const newUpdate = {
        id: `update_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'fan_activity',
        title: 'New fan milestone reached!',
        content: `Team BRIGHTSTARS community grows stronger! ${Math.floor(Math.random() * 100) + 50} new supporters joined`,
        priority: 'medium'
      };
      
      setUpdates(prev => [newUpdate, ...prev.slice(0, 9)]); // Keep only 10 most recent
      setNewUpdateCount(prev => prev + 1);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updateTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500 bg-opacity-10';
      case 'medium': return 'border-yellow-500 bg-yellow-500 bg-opacity-10';
      default: return 'border-blue-500 bg-blue-500 bg-opacity-10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'house_activity': return '🏠';
      case 'social_media': return '📱';
      case 'fan_milestone': return '🎯';
      case 'voting': return '🗳️';
      default: return '📢';
    }
  };

  return (
    <div className="live-updates">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl font-bold">Live Updates</h2>
          {newUpdateCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {newUpdateCount} new
            </span>
          )}
        </div>
        <p className="text-white-50">Real-time news and activities from Bright's BBNaija journey</p>
      </div>

      <div className="updates-container max-w-4xl mx-auto">
        <div className="space-y-4">
          {updates.map((update) => (
            <div 
              key={update.id} 
              className={`update-card border rounded-lg p-4 transition-all hover:scale-[1.02] ${getPriorityColor(update.priority)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getTypeIcon(update.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{update.title}</h3>
                    <span className="text-sm text-white-50">{formatTime(update.timestamp)}</span>
                  </div>
                  <p className="text-white-50 mb-3">{update.content}</p>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      update.type === 'house_activity' ? 'bg-purple-500 bg-opacity-20 text-purple-400' :
                      update.type === 'social_media' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
                      'bg-green-500 bg-opacity-20 text-green-400'
                    }`}>
                      {update.type.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      update.priority === 'high' ? 'bg-red-500 bg-opacity-20 text-red-400' :
                      update.priority === 'medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                      'bg-gray-500 bg-opacity-20 text-gray-400'
                    }`}>
                      {update.priority} priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
            onClick={() => setNewUpdateCount(0)}
          >
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Social Media Integration Placeholder */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Follow Live on Social Media</h3>
        <div className="flex justify-center gap-4">
          <a href="https://www.instagram.com/brightmorgan__" target="_blank" rel="noopener noreferrer" 
             className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform">
            <img src="/images/insta.png" alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="https://x.com/brightmorgan___" target="_blank" rel="noopener noreferrer"
             className="bg-black p-3 rounded-full hover:scale-110 transition-transform">
            <img src="/images/x.png" alt="X (Twitter)" className="w-6 h-6" />
          </a>
          <a href="https://www.tiktok.com/@officialbrightmorgan" target="_blank" rel="noopener noreferrer"
             className="bg-black p-3 rounded-full hover:scale-110 transition-transform">
            <span className="w-6 h-6 block text-white text-sm font-bold">TT</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LiveUpdates;
