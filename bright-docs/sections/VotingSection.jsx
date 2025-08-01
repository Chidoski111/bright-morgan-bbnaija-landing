import VotingCountdown from '../components/VotingCountdown';
import VotingInstructions from '../components/VotingInstructions';
import InteractivePolls from '../components/InteractivePolls';

const VotingSection = () => {
  return (
    <section id="vote" className="section-padding">
      <div className="w-full h-full md:px-20 px-5">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Vote for Bright Morgan
          </h1>
          <p className="text-xl text-white-50 max-w-3xl mx-auto">
            Help Bright achieve his dream of winning BBNaija Season 10! Every vote brings him closer to victory.
          </p>
        </div>

        {/* Voting Countdown */}
        <div className="mb-16">
          <VotingCountdown />
        </div>

        {/* Interactive Polls */}
        <div className="mb-16">
          <InteractivePolls />
        </div>

        {/* Voting Instructions */}
        <div className="mb-16">
          <VotingInstructions />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Join Team BRIGHTSTARS Today!</h2>
            <p className="text-lg text-white-50 mb-6 max-w-2xl mx-auto">
              Be part of Bright's incredible journey to the finale. Your support and votes can make him the next BBNaija winner!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors">
                Vote Now
              </button>
              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-purple-600 transition-colors">
                Join WhatsApp Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VotingSection;
