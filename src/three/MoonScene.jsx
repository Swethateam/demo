
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import * as THREE from "three";
import gsap from "gsap";

// MOON

function Moon() {
  const moonRef = useRef();

  const [colorMap, heightMap] = useTexture([
    "/textures/moon-color.jpg",
    "/textures/moon-height.jpg",
  ]);

  colorMap.colorSpace = SRGBColorSpace;

  useEffect(() => {
    if (!moonRef.current) return;

    const animation = gsap.to(moonRef.current.position, {
      y: 2.45,
      duration: 7,
      ease: "power3.out",
      delay: 0.4,
    });

    return () => animation.kill();
  }, []);

  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.06) * 0.06;
    }
  });

  return (
    <group ref={moonRef} position={[0, -5.8, -3]}>
      <mesh>
        <sphereGeometry args={[2, 128, 128]} />

        
<meshStandardMaterial
  map={colorMap}
  displacementMap={heightMap}
  displacementScale={0.025}
  roughness={0.85}
  emissive="#b9b5ff"
  emissiveIntensity={0.22}
/>

      </mesh>
    </group>
  );
}

 
// INDIVIDUAL STARS
function StarField() {
  const pointsRef = useRef();

  const positions = new Float32Array(1800 * 3);
  const colors = new Float32Array(1800 * 3);
  const sizes = new Float32Array(1800);

  for (let i = 0; i < 1800; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 35;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = -8 - Math.random() * 35;

    const brightness = 0.65 + Math.random() * 0.35;

    colors[i * 3] = brightness;
    colors[i * 3 + 1] = brightness;
    colors[i * 3 + 2] = 1;

    sizes[i] = Math.random() * 2 + 1;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.04) * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// SHOOTING STARS
function ShootingStar({ delay = 0 }) {
  const groupRef = useRef();
  const direction = useRef(new THREE.Vector3());
  const start = useRef(new THREE.Vector3());
  const trailRef = useRef();

  const duration = 1.5;
  const interval = 5;

  useEffect(() => {
    const reset = () => {
      const x = THREE.MathUtils.randFloatSpread(13);
      const y = THREE.MathUtils.randFloat(2, 7);

      start.current.set(x, y, -2);

      const angle = THREE.MathUtils.randFloat(-0.8, 0.8);

      direction.current.set(
        Math.cos(angle),
        -Math.sin(angle) - 0.4,
        0
      ).normalize();

      if (groupRef.current) {
        groupRef.current.position.copy(start.current);
        groupRef.current.visible = true;
      }
    };

    const timer = gsap.delayedCall(delay, reset);

    return () => timer.kill();
  }, [delay]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const cycle = (state.clock.elapsedTime + delay) % interval;
    const progress = cycle / duration;

    if (cycle < duration) {
      if (!groupRef.current.visible) {
        const x = THREE.MathUtils.randFloatSpread(13);
        const y = THREE.MathUtils.randFloat(2, 7);

        start.current.set(x, y, -2);

        const angle = THREE.MathUtils.randFloat(-0.8, 0.8);
        direction.current.set(
          Math.cos(angle),
          -Math.sin(angle) - 0.4,
          0
        ).normalize();

        groupRef.current.visible = true;
      }

      groupRef.current.position
        .copy(start.current)
        .addScaledVector(direction.current, progress * 12);

      if (trailRef.current) {
        trailRef.current.material.opacity = 1 - progress;
      }
    } else {
      groupRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="white" />
      </mesh>

      <mesh
        ref={trailRef}
        position={[-0.7, 0, 0]}
        scale={[0.9, 0.018, 0.018]}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial
          color="#c9c5ff"
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}

function Atmosphere() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[-4, 5, 5]}
        intensity={2}
      />

      <pointLight
        position={[0, 0, 2]}
        intensity={1.5}
        color="#c5b5ff"
      />

      <Sparkles
        count={45}
        scale={[15, 10, 8]}
        size={1.5}
        speed={0.15}
        opacity={0.45}
        color="#d9d5ff"
      />
    </>
  );
}

export default function MoonScene() {
  return (
    <div className="moon-scene">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#080817"]} />

        <Moon />
        <StarField />

        <ShootingStar delay={0} />
        <ShootingStar delay={2.5} />
        <ShootingStar delay={5} />
        <ShootingStar delay={7.5} />

        <Atmosphere />
      </Canvas>
    </div>
  );
}

