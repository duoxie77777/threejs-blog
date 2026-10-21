import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function ComputerChair() {
  const { scene } = useGLTF("/models/computer_chair.glb");

  useEffect(() => {
    scene.traverse((object) => {
      const mesh = object as {
        isMesh?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
      };
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      position={[-1.5, 0, 0]}
      scale={[0.6, 0.6, 0.6]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}
