
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Text, Box, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCardProps {
  position: [number, number, number];
  title: string;
  color: string;
  onClick: () => void;
}

function FloatingCard({ position, title, color, onClick }: FloatingCardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Box
          ref={meshRef}
          args={[2, 1.2, 0.1]}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.1 : 1}
        >
          <meshStandardMaterial color={hovered ? '#ffffff' : color} />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.2}
          color={hovered ? '#333333' : '#ffffff'}
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>
    </Float>
  );
}

function FlowingParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#60a5fa" size={0.05} />
    </points>
  );
}

interface Dashboard3DProps {
  onNavigate: (path: string) => void;
}

export default function Dashboard3D({ onNavigate }: Dashboard3DProps) {
  return (
    <div className="h-96 w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <FlowingParticles />
        
        <FloatingCard
          position={[-3, 1, 0]}
          title="Courses"
          color="#3b82f6"
          onClick={() => onNavigate('/courses')}
        />
        
        <FloatingCard
          position={[0, 1, 0]}
          title="Resources"
          color="#10b981"
          onClick={() => onNavigate('/resources')}
        />
        
        <FloatingCard
          position={[3, 1, 0]}
          title="AI Tools"
          color="#8b5cf6"
          onClick={() => onNavigate('/ai-tools')}
        />
        
        <FloatingCard
          position={[-1.5, -1, 0]}
          title="Chat"
          color="#ef4444"
          onClick={() => onNavigate('/chat')}
        />
        
        <FloatingCard
          position={[1.5, -1, 0]}
          title="About"
          color="#f59e0b"
          onClick={() => onNavigate('/about')}
        />
        
        <Sphere args={[0.5]} position={[0, 3, -2]}>
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.3} />
        </Sphere>
      </Canvas>
    </div>
  );
}
