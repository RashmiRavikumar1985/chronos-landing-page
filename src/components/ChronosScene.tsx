import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Floating Chain Link Component
const ChainLink = ({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.002;
      ref.current.rotation.z += 0.001;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref} position={position} rotation={rotation} scale={scale}>
        <mesh>
          <torusGeometry args={[0.15, 0.05, 8, 16]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            metalness={0.9} 
            roughness={0.2}
            emissive="#8B6914"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Chain Group - Multiple connected-looking links floating freely
const FloatingChains = () => {
  const chainPositions = useMemo(() => {
    const positions: { pos: [number, number, number]; rot: [number, number, number]; scale: number }[] = [];
    
    // Create scattered chain links around the scene
    for (let i = 0; i < 25; i++) {
      const angle = (i / 25) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 4;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      
      positions.push({
        pos: [x, y, z],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.6 + Math.random() * 0.8,
      });
    }
    
    return positions;
  }, []);

  return (
    <>
      {chainPositions.map((chain, i) => (
        <ChainLink key={i} position={chain.pos} rotation={chain.rot} scale={chain.scale} />
      ))}
    </>
  );
};

// Steampunk Gear Component
const Gear = ({ 
  radius, 
  teeth, 
  position, 
  rotationSpeed, 
  clockwise = true 
}: { 
  radius: number; 
  teeth: number; 
  position: [number, number, number]; 
  rotationSpeed: number; 
  clockwise?: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += rotationSpeed * (clockwise ? 1 : -1);
    }
  });

  // Create gear shape
  const gearShape = useMemo(() => {
    const shape = new THREE.Shape();
    const innerRadius = radius * 0.4;
    const outerRadius = radius;
    const toothHeight = radius * 0.15;
    
    const totalTeeth = teeth;
    const anglePerTooth = (Math.PI * 2) / totalTeeth;
    
    // Start point
    shape.moveTo(innerRadius, 0);
    
    for (let i = 0; i < totalTeeth; i++) {
      const startAngle = i * anglePerTooth;
      const midAngle = startAngle + anglePerTooth * 0.25;
      const peakAngle = startAngle + anglePerTooth * 0.5;
      const endMidAngle = startAngle + anglePerTooth * 0.75;
      const endAngle = (i + 1) * anglePerTooth;
      
      // Inner arc to tooth base
      shape.lineTo(
        Math.cos(startAngle) * outerRadius,
        Math.sin(startAngle) * outerRadius
      );
      
      // Tooth rise
      shape.lineTo(
        Math.cos(midAngle) * (outerRadius + toothHeight),
        Math.sin(midAngle) * (outerRadius + toothHeight)
      );
      
      // Tooth top
      shape.lineTo(
        Math.cos(endMidAngle) * (outerRadius + toothHeight),
        Math.sin(endMidAngle) * (outerRadius + toothHeight)
      );
      
      // Tooth fall
      shape.lineTo(
        Math.cos(endAngle) * outerRadius,
        Math.sin(endAngle) * outerRadius
      );
    }
    
    // Create center hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    return shape;
  }, [radius, teeth]);

  const extrudeSettings = {
    steps: 1,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  };

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <extrudeGeometry args={[gearShape, extrudeSettings]} />
        <meshStandardMaterial 
          color="#C9A227"
          metalness={0.95}
          roughness={0.15}
          emissive="#8B6914"
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  );
};

// Temporal Core - Glowing central sphere
const TemporalCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.x += 0.005;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.1} />
      </mesh>
      
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.9}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.1}
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Inner energy */}
      <mesh scale={0.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00FFFF" wireframe />
      </mesh>
      
      {/* Core point light */}
      <pointLight color="#00D4FF" intensity={2} distance={10} />
    </group>
  );
};

// Ring of runes around core
const RuneRing = ({ radius, speed }: { radius: number; speed: number }) => {
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += speed;
    }
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 64]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#00D4FF" 
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

const ChronosScene = () => {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D4FF" />
        
        {/* Temporal Core */}
        <TemporalCore />
        
        {/* Rune rings */}
        <RuneRing radius={1} speed={0.005} />
        <RuneRing radius={1.3} speed={-0.003} />
        <RuneRing radius={1.6} speed={0.002} />
        
        {/* Gears surrounding the core */}
        <Gear radius={0.5} teeth={12} position={[1.5, 1.2, 0.5]} rotationSpeed={0.01} clockwise />
        <Gear radius={0.4} teeth={10} position={[-1.6, 1, 0.3]} rotationSpeed={0.015} clockwise={false} />
        <Gear radius={0.6} teeth={14} position={[1.8, -0.8, 0.2]} rotationSpeed={0.008} clockwise />
        <Gear radius={0.35} teeth={8} position={[-1.4, -1.2, 0.4]} rotationSpeed={0.02} clockwise={false} />
        <Gear radius={0.45} teeth={11} position={[0.8, -1.6, 0.3]} rotationSpeed={0.012} clockwise />
        <Gear radius={0.5} teeth={12} position={[-0.9, 1.5, 0.2]} rotationSpeed={0.009} clockwise={false} />
        <Gear radius={0.3} teeth={9} position={[2.2, 0.2, 0.1]} rotationSpeed={0.018} clockwise />
        <Gear radius={0.55} teeth={13} position={[-2, -0.3, 0.2]} rotationSpeed={0.007} clockwise={false} />
        
        {/* Floating Chains */}
        <FloatingChains />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default ChronosScene;
