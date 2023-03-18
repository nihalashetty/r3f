import { Loader, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Model from "./Model";
import { Suspense } from "react";
import Suzanne from "./Suzanne";

export default function ModelsMain () {
    return <>
        <color args={ ["ivory"] } attach="background" />
        <OrbitControls makeDefault/>
        <directionalLight intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} position={ [1, 2, 3] } shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5} />
        <Perf position="top-left"/>
        <mesh receiveShadow position-y={ -1 } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow"/>
        </mesh>

        {/* Model written separately so that lazy load can be applied only to model and not on scene or ground(Plane) */}
        {/* Suspense will make Model lazy load */}
        <Suspense fallback={
            //What to show user when lazy load is happening
                <mesh position-rotateY={0.5} scale={[2, 3, 2]}>
                    <boxGeometry args={ [1, 1, 1, 2, 2, 2] }/>
                    <meshBasicMaterial wireframe color="red"/>
                </mesh>
            }>
            <Model />
            <Suzanne position-y={0} position-x={2} />
        </Suspense>
    </>
}

//shadow-normalBias -> some shadow bug when we load model as mesh