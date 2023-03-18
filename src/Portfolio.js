import { Perf } from "r3f-perf"
import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from "@react-three/drei"

export default function Portfolio () {
    //market.pmnd.rs
    const model = useGLTF('./macbook.gltf');

    return <>
        <Environment preset="city" />
        <color args={['#695b5b']} attach="background"/>
        <Perf position="top-left"/>
        {/* <Center></Center> could have been used but we want screen to be visible */}
        {/* polar will restrict vertical movement and azimuth will be horizontal restriction */}
        <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{mass:2, tension: 400}}
            snap
        >
            <Float rotationIntensity={0.4}>
                {/* Lights */}
                <rectAreaLight 
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={'#ff6900'}
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />
                <primitive
                    object={model.scene}
                    position-y={-1.2}
                >
                    <Html transform wrapperClass="htmlScreen" distanceFactor={1.17} position={[0, 1.56, -1.4]} rotation-x={-0.256}>
                        <iframe src="https://bruno-simon.com/html" />
                    </Html>
                </primitive>
                <Text
                    font='./font/Staatliches_Regular.woff'
                    fontSize={1}
                    position={[2.5, 0.75, 0.75]}
                    rotation-y={-1.25}
                    maxWidth={2}
                    textAlign="center"
                >NIHAL SHETTY</Text>
            </Float>
        </PresentationControls>

        {/* Added outside so that shadows wont rotate when dragged */}
        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
}

//PresentationControls is alternative for orbiralcontrols
//PresentationControls helps to restrict the orbital controls
//PresentationControls works on models not on camera