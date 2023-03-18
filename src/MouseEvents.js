import { useMatcapTexture, Center, Text3D, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useEffect } from "react";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";

export default function ThreeDText () {
    const boxRef = useRef();
    const sphereRef = useRef();

    let axis = 'x';
    useFrame((state, delta) => {
        boxRef.current.rotation[axis] += delta * 2
    })

    const boxEvent = () => {
        axis = axis === 'y' ? 'x' : 'y';
        boxRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
    }

    const sphereEvent = (event) => {
        sphereRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);

        //to stop if clicking on other object overlapping with another
        event.stopPropagation()
    }

    return <>
        <OrbitControls makeDefault/>
        <directionalLight intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} position={ [1, 2, 3] } shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5} />
        <Perf position="top-left"/>
        <mesh position={ [2, 0, 0] } ref={sphereRef} onClick={(event) => sphereEvent(event)}>
            <sphereGeometry />
            <meshStandardMaterial color="purple"/>
        </mesh>
        <mesh
            onPointerEnter={() => {document.body.style.cursor = "pointer"}}
            onPointerLeave={() => {document.body.style.cursor = "default"}}
            onClick={boxEvent}
            ref={boxRef} position={ [-2, 0, 0] } rotation-y={ Math.PI * 0.5 }>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position={ [0, -1, 0] } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="lightpink"/>
        </mesh>
    </>
}

//shadow-normalBias -> some shadow bug when we load model as mesh