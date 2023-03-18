import { useMatcapTexture, Center, Text3D, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useEffect } from "react";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";

//Optimized way of creating material and mesh
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);

//useMatCapTexture not available outside component so we will reassign it in usestate
const material = new THREE.MeshMatcapMaterial();

//Checkout matcap textures from drei github. there are soo many structures which will be auto imported
export default function ThreeDText () {
    //https://github.com/nidorx/matcaps
    const [ matcapTexture ] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);
    const donutsGroup = useRef();
    const fullSceneRotate = useRef();

    useEffect(() => {
        //Manually tell encoding to be srgb encoding. or else too bright scene will occur
        matcapTexture.encoding = THREE.sRGBEncoding;
        matcapTexture.needsUpdate = true;
        material.matcap = matcapTexture;
        material.needsUpdate = true;
    }, [])

    useFrame((state, delta) => {
        for(const donut of donutsGroup.current.children) {
            donut.rotation.y += delta * 0.2;
        }

        fullSceneRotate.current.rotation.y += delta * 0.2;
    });

    return <>
        <OrbitControls makeDefault/>
        <Perf position="top-left"/>
        <group ref={fullSceneRotate}>
        <Center>
            <Text3D
                material={material}
                font="./fonts/Staatliches_Regular.json"
                size={0.75}
                height={0.2}
                curveSegments={22}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                HELLO WORLD
            </Text3D>
        </Center>

        <group ref={donutsGroup}>
            {/* Array inside array so that i can map empty array  */}
            { [...Array(100)].map((value, index) => 
                <mesh key={index} geometry={torusGeometry} material={material} position={ [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] } scale={0.2 + Math.random() * 0.2} rotation={ [Math.random() * Math.PI, Math.random() * Math.PI, 0] }>
                    {/* You will get args value from threejs doc */}
                    {/* could have done like this but to optimise we created geometry and mesh outside of function */}
                    {/* <torusGeometry args={ [1, 0.6, 16, 32] } />
                    <meshMatcapMaterial matcap={matcapTexture} /> */}
                </mesh>
            ) }
        </group>
        </group>
    </>
}

//shadow-normalBias -> some shadow bug when we load model as mesh