import { useEffect } from 'react';
import Lenis from 'lenis';
import ParticlesBackground from '@/components/ParticlesBackground';
import ChronosScene from '@/components/ChronosScene';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TechnologySection from '@/components/TechnologySection';
import CTASection from '@/components/CTASection';

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* 3D Scene - Fixed behind content */}
      <div className="fixed inset-0 z-10">
        <ChronosScene />
      </div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Content */}
      <div className="relative z-20">
        <HeroSection />
        <FeaturesSection />
        <TechnologySection />
        <CTASection />
      </div>
      
      {/* Ambient glow effects */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </div>
  );
};

export default Index;
