
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Float } from '@react-three/drei'
import { Suspense } from 'react'

function CareerNode({ position, color, title }: { position: [number, number, number], color: string, title: string }) {
  return (
    <Float>
      <mesh position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} />
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </mesh>
    </Float>
  )
}

export default function AnimatedCareerPath() {
  const paths = [
    { title: 'Web Developer', position: [-3, 0, 0], color: 'orange' },
    { title: 'Full Stack', position: [-1, 2, 0], color: 'hotpink' },
    { title: 'DevOps', position: [1, 2, 0], color: 'cyan' },
    { title: 'Data Scientist', position: [3, 0, 0], color: 'lightgreen' },
    { title: 'AI/ML Engineer', position: [2, -2, 0], color: 'lightblue' },
    { title: 'Cybersecurity', position: [-2, -2, 0], color: 'red' },
  ]
  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Explore Career Paths in 3D</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Interact with our 3D career map to visualize your journey.
                </p>
            </div>
            <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading 3D view...</div>}>
                    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        {paths.map(path => (
                            <CareerNode key={path.title} {...path} />
                        ))}
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5}/>
                    </Canvas>
                </Suspense>
            </div>
        </div>
    </section>
  )
}
