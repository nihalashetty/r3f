import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Suzanne(props) {
  const { nodes, materials } = useGLTF("./suzanne.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, 0.19, -0.04]}
      >
        <meshNormalMaterial color="lightpink"/>
      </mesh>
    </group>
  );
}

useGLTF.preload("/suzanne.gltf");