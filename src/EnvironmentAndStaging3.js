import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ContactShadows, Environment, useHelper, OrbitControls, Lightformer } from "@react-three/drei";
import * as THREE from 'three';
import { useControls } from "leva";

export default function EnvironmentAndStaging2 () {
    const cube = useRef();

    useFrame((state, delta) => {
        // cube.current.position.x = -2 + Math.sin(time);
        cube.current.rotation.y += delta * 0.2;
    });

    const { envMapIntensity } = useControls({
        envMapIntensity: {value: 1, min: 0, max: 12}
    })

    return <>
        {/* <BakeShadows /> */}
        <Environment  
            // background
            // files={ './environmentMaps/the_sky_is_on_fire_2k.hdr' }
            preset='sunset' //provided by drei
            ground={{
                height: 7,
                radius: 28,
                scale: 100
            }}
        >
            {/* <color args={ ["#000000"] } attach="background" /> */}
            {/* we can put mesh and project color of its on objects and it will move with env */}
            {/* <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={ [10, 0, 0] }/>
            </mesh> */}

            {/* Alternative to mesh for light projection we can use LightFormer */}
            {/* <Lightformer 
                position-z={ -5 }
                scale={10}
                color="red"
                intensity={10}
                form="ring"
            /> */}
        </Environment>
        <OrbitControls makeDefault/>
        <ContactShadows 
            position={[0, 0, 0]}
            scale={ 10 }
            resolution={ 512 }
            far={5}
            color='grey'
            opacity={1}
            blur={2.8}
            frames={1}
        />
        <mesh castShadow position={ [2, 1, 0] }>
            <sphereGeometry />
            <meshStandardMaterial envMapIntensity={ envMapIntensity } color="purple"/>
        </mesh>
        <mesh castShadow ref={ cube } position={ [-2, 1, 0] }>
            <boxGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={ envMapIntensity } />
        </mesh>
        {/* <mesh receiveShadow position-y={ 0 } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={ envMapIntensity } />
        </mesh> */}
    </>
}