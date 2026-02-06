import { Clock, Zap, Shield, Globe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  
  return (
    <div 
      ref={ref}
      className={`
        feature-card-highlighted group cursor-pointer
        transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
        }
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start gap-6">
        <div className="p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]">
          <feature.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div>
          <h3 className="font-orbitron text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
      
      {/* Highlight glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5" />
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 blur-sm" />
      </div>
    </div>
  );
};

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
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
