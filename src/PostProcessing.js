import {  OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Bloom, Noise, Glitch, Vignette, EffectComposer } from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";

export default function PostProcessing () {
    //Use Leva for finding the right blending function.
    return <>
        <color args={['#000000']} attach="background" />

        {/* Here you can find all Effects https://github.com/pmndrs/postprocessing */}
        {/* Live examples https://pmndrs.github.io/postprocessing/public/demo/#antialiasing */}
        {/* multisampling -> is that step which will render as old videogame */}
        {/* React also provides https://github.com/pmndrs/react-postprocessing */}
        {/* check bothwebsites */}
        <EffectComposer multisampling={ 8 }>
            {/* Vignette will make corners of the render darker */}
            {/* blending is availabel for each effect which will help how effects can be controlled */}
            {/* <Vignette offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} /> */}

            {/* Two values in array says that it vary between first and second value */}
            {/* <Glitch delay={[0.5, 1]} duration={[0.1, 0.3]} strength={[0.2, 0.4]} mode={GlitchMode.CONSTANT_MILD} /> */}

            {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}

            <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} />


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
            <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} />
        </mesh>
        <mesh position={ [0, -1, 0] } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="lightpink"/>
        </mesh>
    </>
}

//shadow-normalBias -> some shadow bug when we load model as mesh