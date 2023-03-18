import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { RandomizedLight, AccumulativeShadows, softShadows, BakeShadows, useHelper, OrbitControls } from "@react-three/drei";
import * as THREE from 'three';

// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings: 11
// });

export default function EnvironmentAndStaging () {
    const cube = useRef();

    //Using this we can check where light source is situated
    const directionalLight = useRef();
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        cube.current.position.x = -2 + Math.sin(time);
        cube.current.rotation.y += delta * 0.2;
    });

    return <>
        {/* <BakeShadows /> */}
        <color args={ ["ivory"] } attach="background" />
        <OrbitControls makeDefault/>
        <AccumulativeShadows position={ [0, -0.99, 0] } scale={10} color="#316d39" opacity={0.8} frames={Infinity} temporal blend={100}>
            <RandomizedLight intensity={1} position={ [1, 2, 3] } amount={8} radius={1} ambient={0.5} bias={0.001}/>
        </AccumulativeShadows>
        <directionalLight ref={ directionalLight } intensity={1.5} position={ [1, 2, 3] } castShadow shadow-mapSize={[1024, 1024]}/>
        <ambientLight intensity={0.5} />
        <mesh castShadow position={ [2, 0, 0] }>
            <sphereGeometry />
            <meshStandardMaterial color="purple"/>
        </mesh>
        <mesh castShadow ref={ cube } position={ [-2, 0, 0] }>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position-y={ -1 } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow"/>
        </mesh>
    </>
}

//shadow-mapSize -> resolution of shadow
//BakeShadows -> to bake shadows ones and stops calculating everytime.
//Cast and recieve shadows are must on objects
//frames={Infinity} -> to render shaddows on animation
//AccumulativeShadows dont need softShadows. Softshadows will work with default shadows (useHelper(directionalLight,)

//AccimilativeShadows use only for static scene