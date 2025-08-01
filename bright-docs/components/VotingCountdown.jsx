import { useState, useEffect } from 'react';
import { votingCountdown } from '../constants';

const VotingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVotingActive, setIsVotingActive] = useState(votingCountdown.isVotingOpen);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(votingCountdown.nextVotingDate);
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsVotingActive(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="voting-countdown-container bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Next Eviction Show</h2>
        <p className="text-lg opacity-90">Sunday 7:00 PM WAT</p>
      </div>
      
      <div className="countdown-timer grid grid-cols-4 gap-4 mb-6">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-black bg-opacity-30 rounded-lg p-4">
              <div className="text-3xl font-bold">{value.toString().padStart(2, '0')}</div>
              <div className="text-sm uppercase opacity-80">{unit}</div>
            </div>
          </div>
        ))}
      </div>

      {isVotingActive && (
        <div className="text-center">
          <div className="bg-green-500 bg-opacity-20 border border-green-400 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">VOTING IS LIVE!</span>
            </div>
          </div>
          
          <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
            VOTE NOW FOR BRIGHT MORGAN
          </button>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm opacity-80">
          Week {votingCountdown.currentWeek} of {votingCountdown.totalWeeks}
        </p>
      </div>
    </div>
  );
};

export default VotingCountdown;
