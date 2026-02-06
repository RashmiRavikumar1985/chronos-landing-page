const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="text-center z-20 pointer-events-none">
        <h1 className="hero-title text-foreground mb-4">
          CHRONOS
        </h1>
        <p className="hero-subtitle">
          The Fabric of Time, Rewoven by AI
        </p>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default HeroSection;
