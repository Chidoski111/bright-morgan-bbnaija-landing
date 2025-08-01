import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

const initialStats = [
  {
    label: "Total Supporters",
    value: 1247,
    suffix: "",
    trend: "+23%",
    icon: "👥",
    description: "Team BRIGHTSTARS Strong"
  },
  {
    label: "Fan Votes This Week", 
    value: 8943,
    suffix: "",
    trend: "+31%",
    icon: "⭐",
    description: "Weekly Voting Power"
  },
  {
    label: "Social Media Reach",
    value: 25,
    suffix: "K+",
    trend: "+15%", 
    icon: "📱",
    description: "Cross-Platform Followers"
  },
  {
    label: "Campaign Updates",
    value: 47,
    suffix: "",
    trend: "+8",
    icon: "📢",
    description: "This Month"
  }
];

const liveUpdates = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
    type: "voting",
    title: "Voting Spike Detected!",
    content: "Major voting activity in the last 15 minutes. Team BRIGHTSTARS mobilizing!",
    priority: "high"
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 23 * 60000).toISOString(), // 23 minutes ago
    type: "social_media",
    title: "Instagram Engagement Up",
    content: "New post receiving incredible support from the community",
    priority: "medium"
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    type: "fan_milestone",
    title: "1K Supporters Milestone!",
    content: "Team BRIGHTSTARS family continues to grow stronger each day",
    priority: "medium"
  }
];

export default function LiveStats() {
  const [stats, setStats] = useState(initialStats);
  const [updates, setUpdates] = useState(liveUpdates);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate live stats updates every 30 seconds
    const statsInterval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          if (stat.label === "Fan Votes This Week") {
            return { ...stat, value: stat.value + Math.floor(Math.random() * 12) + 1 };
          }
          if (stat.label === "Total Supporters" && Math.random() > 0.7) {
            return { ...stat, value: stat.value + Math.floor(Math.random() * 3) + 1 };
          }
          if (stat.label === "Campaign Updates" && Math.random() > 0.8) {
            return { ...stat, value: stat.value + 1 };
          }
          return stat;
        })
      );
      setLastUpdate(new Date());
    }, 30000);

    // Simulate new updates every 2 minutes
    const updatesInterval = setInterval(() => {
      const newUpdate = {
        id: `update_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'fan_activity',
        title: 'Community Activity Spike!',
        content: `${Math.floor(Math.random() * 50) + 20} new supporters joined Team BRIGHTSTARS in the last hour`,
        priority: 'medium'
      };
      
      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]); // Keep only 5 most recent
    }, 120000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(updatesInterval);
    };
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
      case 'high': return styles.priorityHigh;
      case 'medium': return styles.priorityMedium;
      default: return styles.priorityLow;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'voting': return '🗳️';
      case 'social_media': return '📱';
      case 'fan_milestone': return '🎯';
      case 'fan_activity': return '👥';
      default: return '📢';
    }
  };

  return (
    <div className={styles.liveStats}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.liveIndicator}>
            <div className={`${styles.liveDot} ${isLive ? styles.pulsing : ''}`}></div>
            <h2 className={styles.title}>Live Campaign Dashboard</h2>
          </div>
          <p className={styles.subtitle}>📊 Real-time Team BRIGHTSTARS Updates</p>
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statNumber}>
              {stat.value.toLocaleString()}{stat.suffix}
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statDescription}>{stat.description}</div>
            <div className={styles.statTrend}>
              {stat.trend}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Updates */}
      <div className={styles.updatesSection}>
        <div className={styles.updatesHeader}>
          <div className={styles.updatesTitle}>
            <div className={styles.liveDot}></div>
            <h3>Live Updates</h3>
          </div>
          <div className={styles.lastUpdate}>
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        <div className={styles.updatesList}>
          {updates.map((update) => (
            <motion.div
              key={update.id}
              className={`${styles.updateCard} ${getPriorityColor(update.priority)}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className={styles.updateIcon}>
                {getTypeIcon(update.type)}
              </div>
              <div className={styles.updateContent}>
                <div className={styles.updateHeader}>
                  <h4 className={styles.updateTitle}>{update.title}</h4>
                  <span className={styles.updateTime}>
                    {formatTime(update.timestamp)}
                  </span>
                </div>
                <p className={styles.updateText}>{update.content}</p>
                <div className={styles.updateMeta}>
                  <span className={styles.updateType}>
                    {update.type.replace('_', ' ')}
                  </span>
                  <span className={styles.updatePriority}>
                    {update.priority} priority
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Media Quick Links */}
      <div className={styles.socialLinks}>
        <h4 className={styles.socialTitle}>Follow Live Updates</h4>
        <div className={styles.socialIcons}>
          <a 
            href="https://www.instagram.com/brightmorgan__" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.socialIcon}>📷</span>
            <span>Instagram</span>
          </a>
          <a 
            href="https://x.com/brightmorgan___" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.socialIcon}>𝕏</span>
            <span>Twitter</span>
          </a>
          <a 
            href="https://www.tiktok.com/@officialbrightmorgan" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.socialIcon}>🎵</span>
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </div>
  );
}
