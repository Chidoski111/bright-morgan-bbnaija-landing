import { useState } from 'react';
import { interactivePolls } from '../constants';

const InteractivePolls = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [hasVoted, setHasVoted] = useState({});

  const handleVote = (pollId, optionIndex) => {
    if (hasVoted[pollId]) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: optionIndex
    }));
    setHasVoted(prev => ({
      ...prev,
      [pollId]: true
    }));
  };

  return (
    <div className="interactive-polls">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Fan Polls</h2>
        <p className="text-white-50">Share your thoughts and see what other fans think!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {interactivePolls.map((poll) => (
          <div key={poll.id} className="poll-card bg-black-100 border border-black-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">{poll.question}</h3>
            
            <div className="space-y-3">
              {poll.options.map((option, index) => (
                <div 
                  key={index}
                  className={`poll-option relative cursor-pointer p-3 rounded-lg border transition-all ${
                    selectedOptions[poll.id] === index 
                      ? 'border-purple-500 bg-purple-500 bg-opacity-20' 
                      : 'border-black-50 hover:border-white-50'
                  } ${hasVoted[poll.id] ? 'cursor-not-allowed' : 'hover:bg-white hover:bg-opacity-5'}`}
                  onClick={() => handleVote(poll.id, index)}
                >
                  <div className="flex justify-between items-center">
                    <span className={selectedOptions[poll.id] === index ? 'text-purple-300' : ''}>{option.text}</span>
                    {hasVoted[poll.id] && <span className="text-sm text-white-50">{option.percentage}%</span>}
                  </div>
                  
                  {hasVoted[poll.id] && (
                    <div className="mt-2">
                      <div className="w-full bg-black-50 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            selectedOptions[poll.id] === index ? 'bg-purple-500' : 'bg-white-50'
                          }`}
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasVoted[poll.id] && (
              <div className="mt-4 text-center">
                <p className="text-sm text-white-50">
                  {poll.totalVotes.toLocaleString()} total votes
                </p>
                <p className="text-xs text-green-400 mt-1">✓ Thanks for voting!</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractivePolls;
