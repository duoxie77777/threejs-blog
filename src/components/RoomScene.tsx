import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ComputerDesk from "./ComputerDesk";
import ComputerChair from "./ComputerChair";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useMemo } from "react";
function Floor() {
  const [colorMap, normalMap] = useTexture([
    "/textures/Wood_Floor_001/tex/Wood_Floor_001_Diffiuse.jpg",
    "/textures/Wood_Floor_001/tex/Wood_Floor_001_Normal.jpg",
  ]);

  const textures = useMemo(() => {
    const color = colorMap.clone();
    color.colorSpace = THREE.SRGBColorSpace;
    color.wrapS = THREE.RepeatWrapping;
    color.wrapT = THREE.RepeatWrapping;
    color.repeat.set(3, 3);
    color.needsUpdate = true;

    const normal = normalMap.clone();
    normal.colorSpace = THREE.NoColorSpace;
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;
    normal.repeat.set(3, 3);
    normal.needsUpdate = true;

    return { color, normal };
  }, [colorMap, normalMap]);

  useEffect(() => {
    return () => {
      textures.color.dispose();
      textures.normal.dispose();
    };
  }, [textures]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial
        map={textures.color}
        normalMap={textures.normal}
        normalScale={new THREE.Vector2(0.65, 0.65)}
        color="#ffffff"
        roughness={0.85}
      />
    </mesh>
  );
}

function Walls() {
  return (
    <>
      {/* 后墙 */}
      <mesh position={[0, 2, -4]} receiveShadow>
        <boxGeometry args={[8, 4, 0.15]} />
        <meshStandardMaterial color="#f1dfc8" />
      </mesh>

      {/* 左墙 */}
      <mesh position={[-4, 2, 0]} receiveShadow>
        <boxGeometry args={[0.15, 4, 8]} />
        <meshStandardMaterial color="#dfc7ac" />
      </mesh>
    </>
  );
}

function Room() {
  return (
    <>
      <color attach="background" args={["#eee6dc"]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 8, 5]} intensity={2} castShadow />
      <Floor />
      <Walls />
    </>
  );
}

export default function RoomScene() {
  return (
    <Canvas
      camera={{
        position: [8, 7, 8],
        fov: 40,
        near: 0.1,
        far: 100,
      }}
      shadows
    >
      <Room />

      <Suspense fallback={null}>
        <ComputerDesk />
      </Suspense>

      <Suspense fallback={null}>
        <ComputerChair />
      </Suspense>

      <OrbitControls
        makeDefault
        target={[0, 1, 0]}
        minDistance={5}
        maxDistance={18}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
