import LiveCampaignStats from '../components/LiveCampaignStats';
import LiveUpdates from '../components/LiveUpdates';
import TitleHeader from '../components/TitleHeader';

const LiveStatsSection = () => {
  return (
    <section id="updates" className="section-padding bg-black-200">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Live Campaign Dashboard"
          sub="📊 Real-time Team BRIGHTSTARS Updates"
        />
        
        <div className="mt-16">
          {/* Live Campaign Stats */}
          <div className="mb-16">
            <LiveCampaignStats />
          </div>

          {/* Live Updates Feed */}
          <div>
            <LiveUpdates />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsSection;
