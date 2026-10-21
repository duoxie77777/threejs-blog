import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

const TARGET_HEIGHT = 1.6;
export default function ComputerDesk() {
  const { scene } = useGLTF("/models/computer_desk.glb");

  const model = useMemo(() => {
    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = TARGET_HEIGHT / size.y;

    cloned.scale.setScalar(scale);
    cloned.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale,
    );

    cloned.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return cloned;
  }, [scene]);

  return (
    <group position={[-3.3, 0.05, 0]} rotation={[0, -Math.PI / 1, 0]}>
      <primitive object={model} />
    </group>
  );
}
