const CTASection = () => {
  return (
    <section className="relative min-h-screen py-32 px-8 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="section-title text-foreground mb-6">
          Begin Your Journey
        </h2>
        <p className="text-xl text-muted-foreground mb-12">
          Join the temporal revolution. The future—and the past—await.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="glass-button-primary">
            Initialize Sync
          </button>
          <button className="glass-button">
            Learn More
          </button>
        </div>
        
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-sm text-muted-foreground">
            CHRONOS™ — Temporal Solutions for a Timeless Future
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
