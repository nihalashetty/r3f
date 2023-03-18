import { shaderMaterial, Sparkles, useTexture, OrbitControls, useGLTF, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { extend, useFrame } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro';
import { Color, AdditiveBlending } from 'three'

export default function PortalScene () {
    const {nodes} = useGLTF('./portal.glb');
    const bakedTexture = useTexture('./baked.jpg');
    bakedTexture.flipY = false;

    const portalMaterial = useRef()
    useFrame((state, delta) => (portalMaterial.current.uTime += delta))

    return <>
        <OrbitControls makeDefault/>
        <Perf position="top-left"/>
        <color args={['#201919']} attach="background" />

        {/* We will not write like this because we need to add some animation lights to model */}
        {/* <primitive object={ model.scene } scale={0.4} position-y={-0.5} position-x={-2} /> */}
        {/* so we will put one by one */}
        <Center>
            <mesh geometry={nodes.baked.geometry} >
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh position={nodes.poleLightA.position} geometry={nodes.poleLightA.geometry} >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>
            <mesh position={nodes.poleLightB.position} geometry={nodes.poleLightB.geometry} >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>
            <mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation} >
                <portalMaterial ref={portalMaterial} blending={AdditiveBlending} uColorStart="pink" uColorEnd="white" />
            </mesh>
            <Sparkles size={6} scale={[4,2,4]} position-y={1.5} speed={0.3} count={40} />
        </Center>
    </>
}

const PortalMaterial = shaderMaterial(
    { uTime: 0, uColorStart: new Color('hotpink'), uColorEnd: new Color('white') },
    glsl`
    varying vec2 vUv;
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }`,
    glsl`
    #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;
    void main() {
      vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
      float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
      float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
      strength += outerGlow;
      strength += step(-0.2, strength) * 0.8;
      strength = clamp(strength, 0.0, 1.0);
      vec3 color = mix(uColorStart, uColorEnd, strength);
      gl_FragColor = vec4(color, 1.0);
    }`,
)

// shaderMaterial creates a THREE.ShaderMaterial, and auto-creates uniform setter/getters
// extend makes it available in JSX, in this case <portalMaterial />
extend({ PortalMaterial })