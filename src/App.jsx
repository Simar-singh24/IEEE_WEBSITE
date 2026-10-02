import { useEffect, useState } from 'react';

import HeroBanner from './components/HeroBanner';
import StatsSection from './components/StatsSection';
import FlagshipEvent from './components/FlagshipEvent';
import UpcomingEvents from './components/UpcomingEvents';
import PastEvents from './components/PastEvents';
import TeamSection, { TeamDirectoryPage } from './components/TeamSection';
import Footer from './components/Footer';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash === '#team-directory' ? 'team' : 'home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash === '#team-directory' ? 'team' : 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentRoute === 'team') {
    return <TeamDirectoryPage />;
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <HeroBanner />
      <StatsSection />
      <FlagshipEvent />
      <UpcomingEvents />
      <PastEvents />
      <TeamSection />
      <Footer />
    </div>
  );
}

export default App;
