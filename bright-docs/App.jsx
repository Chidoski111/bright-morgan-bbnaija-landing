import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import VotingSection from "./sections/VotingSection";
import LiveStatsSection from "./sections/LiveStatsSection";

const App = () => (
  <div className="min-h-screen bg-white transition-colors duration-300">
    <Navbar />
    <Hero />
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <VotingSection />
    <TechStack />
    <LiveStatsSection />
    <Testimonials />
    <Contact />
    <Footer />
  </div>
);

export default App;
