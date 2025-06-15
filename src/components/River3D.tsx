
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const RiverShader = {
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.05;
      float wave2 = sin(pos.y * 3.0 + uTime * 0.3) * 0.05;
      pos.z = wave1 + wave2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                             dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      vec2 p = vUv * 5.0;
      p.x -= uTime * 0.1;
      float n = snoise(p);
      
      vec3 color1 = vec3(0.1, 0.4, 0.7); // Dark blue
      vec3 color2 = vec3(0.2, 0.8, 0.6); // Green-cyan
      
      vec3 color = mix(color1, color2, (n + 1.0) * 0.5);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function RiverPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        vertexShader={RiverShader.vertexShader}
        fragmentShader={RiverShader.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function River3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 2.5, 5], fov: 75 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <RiverPlane />
      </Canvas>
    </div>
  );
}
