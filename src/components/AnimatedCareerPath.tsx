
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Float } from '@react-three/drei'
import { Suspense, useCallback } from 'react'

function CareerNode({ position, color, title }: { position: [number, number, number], color: string, title: string }) {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh position={position}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {title}
        </Text>
      </mesh>
    </Float>
  )
}

function Scene() {
  const paths: { title: string; position: [number, number, number]; color: string }[] = [
    { title: 'Web Developer', position: [-3, 0, 0], color: 'orange' },
    { title: 'Full Stack', position: [-1, 2, 0], color: 'hotpink' },
    { title: 'DevOps', position: [1, 2, 0], color: 'cyan' },
    { title: 'Data Scientist', position: [3, 0, 0], color: 'lightgreen' },
    { title: 'AI/ML Engineer', position: [2, -2, 0], color: 'lightblue' },
    { title: 'Cybersecurity', position: [-2, -2, 0], color: 'red' },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      {paths.map(path => (
        <CareerNode key={path.title} {...path} />
      ))}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </>
  )
}

export default function AnimatedCareerPath() {
  const handleCreated = useCallback(({ gl }) => {
    // Handle WebGL context restoration
    gl.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      console.log('WebGL context lost, attempting to restore...');
    });
    
    gl.domElement.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored');
    });
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Career Paths in 3D</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interact with our 3D career map to visualize your journey. Drag to rotate and explore different paths.
          </p>
        </div>
        <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading 3D career paths...</p>
              </div>
            </div>
          }>
            <Canvas 
              camera={{ position: [0, 0, 8], fov: 50 }}
              onCreated={handleCreated}
              gl={{ 
                antialias: true, 
                alpha: false,
                powerPreference: "high-performance"
              }}
            >
              <Scene />
            </Canvas>
          </Suspense>
        </div>
        <div className="text-center mt-6 text-gray-400">
          <p className="text-sm">💡 Tip: Drag to rotate, each sphere represents a different career path</p>
        </div>
      </div>
    </section>
  )
}
