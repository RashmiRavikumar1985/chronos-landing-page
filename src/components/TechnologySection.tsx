const TechnologySection = () => {
  return (
    <section className="relative min-h-screen py-32 px-8 flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title temporal-text mb-8">
          Quantum Temporal Engine
        </h2>
        <div className="glow-line max-w-lg mx-auto mb-12" />
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          At the heart of CHRONOS lies our revolutionary Quantum Temporal Engine. 
          By harnessing the power of entangled chronotons and stabilizing temporal 
          flux fields, we've created the first commercially viable time manipulation 
          platform for enterprise and personal use.
        </p>
        
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-orbitron font-bold temporal-text mb-2">
              10⁻¹²
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Second Precision
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-orbitron font-bold gold-text mb-2">
              ∞
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Timeline Access
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-orbitron font-bold temporal-text mb-2">
              0
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Paradox Incidents
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
