import {  OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";

export default function PostProcessing2 () {
    //Use Leva for finding the right blending function.
    return <>
        <color args={['#ffffff']} attach="background" />

        <EffectComposer multisampling={ 8 }>
            {/* Blurr effect on far objects */}
            {/* Performance sucks */}
            {/* <DepthOfField focusDistance={0.025} focusLength={0.025} bokehScale={5} /> */}
        </EffectComposer>

        <OrbitControls makeDefault/>
        <directionalLight intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} position={ [1, 2, 3] } shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5} />
        <Perf position="top-left"/>
        <mesh position={ [2, 0, 0] } >
            <sphereGeometry />
            <meshStandardMaterial color="purple"/>
        </mesh>
        <mesh position={ [-2, 0, 0] } rotation-y={ Math.PI * 0.5 }>
            <boxGeometry />
            {/* MeshNormalMaterial will not glow on every side as light affects on it */}
            <meshBasicMaterial color="orange" />
        </mesh>
        <mesh position={ [0, -1, 0] } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="lightpink"/>
        </mesh>
    </>
}

//shadow-normalBias -> some shadow bug when we load model as mesh