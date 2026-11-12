
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function CrystalHeart() {
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 0.3);
    shape.bezierCurveTo(0, 0.55, -0.5, 0.9, -0.85, 0.55);
    shape.bezierCurveTo(-1.3, 0.1, -0.75, -0.55, 0, -1.1);
    shape.bezierCurveTo(0.75, -0.55, 1.3, 0.1, 0.85, 0.55);
    shape.bezierCurveTo(0.5, 0.9, 0, 0.55, 0, 0.3);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.07,
      bevelThickness: 0.07,
    });

    geometry.center();
    return geometry;
  }, []);

  const heartRef = useRef(null);

  useFrame((state) => {
    if (!heartRef.current) return;

    heartRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.22;

    heartRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
      <mesh
        ref={heartRef}
        geometry={heartGeometry}
        scale={0.62}
        position={[2.7, 1.55, -1.5]}
      >
        <meshPhysicalMaterial
          color="#e9a6ca"
          emissive="#762d62"
          emissiveIntensity={0.45}
          roughness={0.19}
          metalness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function OrbitPlanet({ position, size, color }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={0.8} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[size, 48, 48]} />
          <meshStandardMaterial
            color={color}
            roughness={0.35}
            metalness={0.3}
            emissive={color}
            emissiveIntensity={0.12}
          />
        </mesh>

        <mesh rotation={[0.6, 0.2, -0.35]}>
          <torusGeometry args={[size * 1.6, 0.012, 8, 100]} />
          <meshStandardMaterial
            color="#e8c69a"
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}

function UniverseScene() {
  return (
    <>
      <ambientLight intensity={0.65} />

      <directionalLight
        position={[-4, 5, 5]}
        intensity={2}
        color="#ffe5ef"
      />

      <pointLight
        position={[2, 1, 3]}
        intensity={1.4}
        color="#cf8ecb"
      />

      <Stars
        radius={75}
        depth={45}
        count={1800}
        factor={2.5}
        saturation={0.35}
        fade
        speed={0.3}
      />

      <Sparkles
        count={80}
        scale={[12, 8, 8]}
        size={2}
        speed={0.35}
        color="#f2cce5"
      />

      <CrystalHeart />

      <OrbitPlanet
        position={[-3.4, -1.8, -2]}
        size={0.42}
        color="#8d79bd"
      />

      <OrbitPlanet
        position={[3.5, -2.5, -2]}
        size={0.25}
        color="#d5a4ad"
      />
    </>
  );
}

export default function PasswordUniverse() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <UniverseScene />
    </Canvas>
  );
}
