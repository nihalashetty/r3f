import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ContactShadows, Environment, useHelper, OrbitControls, Lightformer, Stage } from "@react-three/drei";
import * as THREE from 'three';
import { useControls } from "leva";

export default function EnvironmentAndStaging4 () {
    const cube = useRef();

    useFrame((state, delta) => {
        // cube.current.position.x = -2 + Math.sin(time);
        cube.current.rotation.y += delta * 0.2;
    });

    const { envMapIntensity } = useControls({
        envMapIntensity: {value: 1, min: 0, max: 12}
    })

    return <>
        <OrbitControls makeDefault/>
        <Stage 
            contactShadow={ {opacity: 0.2, blur: 3} }
            environment="sunset"
            preset="portrait"
            intensity={2}
        >
            <mesh castShadow position={ [2, 1, 0] }>
                <sphereGeometry />
                <meshStandardMaterial envMapIntensity={ envMapIntensity } color="purple"/>
            </mesh>
            <mesh castShadow ref={ cube } position={ [-2, 1, 0] }>
                <boxGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={ envMapIntensity } />
            </mesh>
        </Stage>
        {/* <mesh receiveShadow position-y={ 0 } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={ envMapIntensity } />
        </mesh> */}
    </>
}