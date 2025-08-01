import { votingPlatforms, votingCountdown } from '../constants';

const VotingInstructions = () => {
  return (
    <div className="voting-instructions">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">How to Vote for Bright Morgan</h2>
        <p className="text-white-50">Follow these simple steps to support Team BRIGHTSTARS!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Step-by-step instructions */}
        <div className="instructions-card">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">📝 Voting Steps</h3>
          <div className="space-y-4">
            {votingCountdown.instructions.map((instruction, index) => (
              <div key={index} className="instruction-step flex items-start gap-3">
                <div className="step-number bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-white-50">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Voting platforms */}
        <div className="platforms-card">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">🌐 Official Voting Platforms</h3>
          <div className="space-y-4">
            {votingPlatforms.map((platform, index) => (
              <div key={index} className="platform-item bg-black-100 border border-black-50 rounded-lg p-4 hover:border-purple-500 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <img src={platform.icon} alt="" className="w-6 h-6" />
                  <h4 className="font-semibold">{platform.name}</h4>
                  {platform.isOfficial && (
                    <span className="bg-green-500 bg-opacity-20 text-green-400 text-xs px-2 py-1 rounded-full">
                      Official
                    </span>
                  )}
                </div>
                <p className="text-sm text-white-50 mb-3">{platform.description}</p>
                <a 
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Vote Here →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important notes */}
      <div className="mt-8 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-6">
        <h3 className="text-yellow-400 font-semibold mb-3">⚠️ Important Voting Information</h3>
        <ul className="space-y-2 text-sm text-white-50">
          <li>• You need an active DStv or GOtv subscription to vote</li>
          <li>• Voting is FREE for subscribers</li>
          <li>• You can vote multiple times during voting periods</li>
          <li>• Voting typically opens after Sunday eviction shows</li>
          <li>• Share your vote on social media with #TeamBRIGHTSTARS</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Every Vote Counts!</h3>
          <p className="text-white-50 mb-4">Help Bright Morgan reach the finale and win BBNaija Season 10</p>
          <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
            Start Voting Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingInstructions;
