import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 2 + Math.random() * 3;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Grid() {
  return (
    <gridHelper
      args={[40, 40, '#111111', '#111111']}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
              color="#7000FF"
              wireframe
              emissive="#7000FF"
              emissiveIntensity={0.5}
              transparent
              opacity={0.1}
            />
          </mesh>
        </Float>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      </Canvas>
    </div>
  );
}
