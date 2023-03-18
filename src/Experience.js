import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { MeshReflectorMaterial, Html, PivotControls, TransformControls, OrbitControls } from "@react-three/drei";

export default function Experience () {
    const cube = useRef();
    const sphere = useRef();

    useFrame(() => {
        cube.current.rotation.y += 0.01;
    });

    return <>
        <OrbitControls makeDefault/>
        <directionalLight intensity={1.5}/>
        <ambientLight intensity={0.5} />
        <PivotControls anchor={[0, 0, 0]} depthTest={ false }>
            <mesh ref={sphere} position={ [2, 0, 0] }>
                <sphereGeometry />
                <meshStandardMaterial color="purple" wireframe/>
                <Html wrapperClass="label" position={[1, 1, 0]} center distanceFactor={6} occlude={[sphere, cube]}>
                    Hello Label
                </Html>
            </mesh>
        </PivotControls>
        <mesh ref={ cube } position={ [-2, 0, 0] } rotation-y={ Math.PI * 0.5 }>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
        <TransformControls object={cube}/>
        <mesh position={ [0, -1, -2] } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="lightblack"/> */}
            <MeshReflectorMaterial resolution={512} mirror={0.7} color="lightblue" />
        </mesh>
    </>
}