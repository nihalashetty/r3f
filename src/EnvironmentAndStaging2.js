import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Sky, useHelper, OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import { useControls } from "leva";

export default function EnvironmentAndStaging2 () {
    const cube = useRef();

    //Using this we can check where light source is situated
    const directionalLight = useRef();
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        // cube.current.position.x = -2 + Math.sin(time);
        cube.current.rotation.y += delta * 0.2;
    });

    const {sunPosition} = useControls('Sun Position', {
        sunPosition: {value: [1, 2, 3]}
    });

    return <>
        {/* <BakeShadows /> */}
        <color args={ ["ivory"] } attach="background" />
        <OrbitControls makeDefault/>
        <directionalLight ref={ directionalLight } intensity={1.5} position={ sunPosition } castShadow shadow-mapSize={[1024, 1024]}/>
        <ambientLight intensity={0.5} />
        <Sky sunPosition={ sunPosition } />
        <mesh castShadow position={ [2, 0, 0] }>
            <sphereGeometry />
            <meshStandardMaterial color="purple"/>
        </mesh>
        <mesh castShadow ref={ cube } position={ [-2, 0, 0] }>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
        <mesh receiveShadow position-y={ -1 } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow"/>
        </mesh>
    </>
}