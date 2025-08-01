import { useEffect, useState } from 'react';
import { campaignStats } from '../constants';
import AnimatedCounter from './AnimatedCounter';

const LiveCampaignStats = () => {
  const [stats, setStats] = useState(campaignStats);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate live updates every 30 seconds
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          if (stat.label === "Total Votes Cast") {
            return { ...stat, value: stat.value + Math.floor(Math.random() * 15) + 1 };
          }
          if (stat.label === "Social Media Reach" && Math.random() > 0.7) {
            return { ...stat, value: stat.value + Math.floor(Math.random() * 3) + 1 };
          }
          return stat;
        })
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-campaign-stats">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <h2 className="text-3xl font-bold">Live Campaign Stats</h2>
        </div>
        <p className="text-white-50">Real-time updates from Team BRIGHTSTARS community</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl p-6 text-center border border-purple-500 border-opacity-30">
            <div className="mb-3">
              <img src={stat.icon} alt="" className="w-8 h-8 mx-auto opacity-80" />
            </div>
            
            <div className="stat-number text-3xl font-bold mb-1 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              {stat.value.toLocaleString()}{stat.suffix}
            </div>
            
            <div className="stat-label text-sm text-white-50 mb-2">
              {stat.label}
            </div>
            
            <div className={`trend text-xs px-2 py-1 rounded-full ${
              stat.trend.includes('+') ? 'bg-green-500 bg-opacity-20 text-green-400' :
              stat.trend === 'active' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
              'bg-gray-500 bg-opacity-20 text-gray-400'
            }`}>
              {stat.trend === 'active' ? '🟢 Active' : stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-black-100 border border-black-50 rounded-lg p-4 inline-block">
          <p className="text-sm text-white-50">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveCampaignStats;
