
import logoImg from '../assets/logo.jpeg';
import ResponsiveHeroBanner from './ui/responsive-hero-banner';

const HeroBanner = () => {
  return (
    <ResponsiveHeroBanner
      logoUrl={logoImg}
      backgroundImageUrl="https://cdn.21st.dev/assets/mirror/a8/a8cf38f65f7315f95eba8c803c4a80a9d78cb2ea36fbfee49828396e4a0b9737.jpg"
      navLinks={[
        { label: 'Home', href: '#', isActive: true },
        { label: 'Events', href: '#events' },
        { label: 'Team', href: '#team' },
      ]}
      ctaButtonText="Join CTSoc"
      ctaButtonHref="#events"
      badgeText="IEEE Computer Society — Chandigarh University"
      title="Code. Create. Connect.
"
      titleLine2="CTSoc IEEE SOCIETY"
      description="CTSoc is the IEEE Computer Society Student Chapter at Chandigarh University — building a vibrant community for innovation, research, execution, and leadership in technology."
      primaryButtonText="Explore Events"
      primaryButtonHref="#events"
      secondaryButtonText="Meet the Team"
      secondaryButtonHref="#team"
    />
  );
};

export default HeroBanner;

