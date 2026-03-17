import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

// 3D Mobile Device Wireframe Element
const DeviceGeometry = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 4) * 0.2;
    groupRef.current.rotation.x = Math.cos(t / 4) * 0.1;
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Phone Case outer */}
      <mesh>
        <boxGeometry args={[2.5, 5, 0.2]} />
        <meshPhysicalMaterial 
          color="#18181b" 
          metalness={0.8} 
          roughness={0.2} 
          transparent 
          opacity={0.8}
        />
        <Wireframe 
          stroke={"#06b6d4"} 
          fill={"#000000"}
          fillOpacity={0}
          thickness={0.02}
        />
      </mesh>
      
      {/* Internal Floating Layers (simulating App UI Architecture) */}
      <group position={[0, 0, 0.3]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[0, 1, 0.1]}>
            <planeGeometry args={[2, 1]} />
            <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.6} />
          </mesh>
        </Float>
        <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={[0, -0.5, 0.2]}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.6} />
          </mesh>
        </Float>
      </group>
    </group>
  );
};

// Floating abstract particles
const Particles = ({ count = 50 }) => {
  const meshRef = useRef();
  
  // Create a minimal starfield effect
  const dummy = new THREE.Object3D();
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    particles[i] = (Math.random() - 0.5) * 15;
  }
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = t;
    meshRef.current.rotation.x = t * 0.5;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#a855f7" 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <DeviceGeometry />
        </Float>
        
        <Particles count={150} />
      </Canvas>
      
      {/* Gradient overlay to fade scene gracefully into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 pointer-events-none" />
    </div>
  );
};

export default HeroScene;
