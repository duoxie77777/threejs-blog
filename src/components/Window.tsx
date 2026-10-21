import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function ComputerDesk() {
  const { scene } = useGLTF("/models/computer_desk.glb");

  // glb 里的 mesh 默认不投影，需手动开启，地板才能收到阴影
  useEffect(() => {
    scene.traverse((object) => {
      const mesh = object as { isMesh?: boolean; castShadow?: boolean; receiveShadow?: boolean };
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} position={[0, 2.5, -2.5]} />;
}
