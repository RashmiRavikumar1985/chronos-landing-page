import { Clock, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: "Temporal Precision",
    description: "Nanosecond-accurate time manipulation with quantum-locked stability across all dimensions.",
  },
  {
    icon: Zap,
    title: "Instant Sync",
    description: "Zero-latency temporal field synchronization powered by our proprietary flux capacitor array.",
  },
  {
    icon: Shield,
    title: "Paradox Shield",
    description: "Advanced causality protection prevents timeline corruption and grandfather paradoxes.",
  },
  {
    icon: Globe,
    title: "Universal Access",
    description: "Seamless temporal navigation across infinite parallel timelines and pocket dimensions.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative min-h-screen py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-title gold-text mb-6">
            Master Time Itself
          </h2>
          <div className="glow-line max-w-md mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-orbitron text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
