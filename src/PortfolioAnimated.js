import { Perf } from "r3f-perf"
import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"

export default function PortfolioAnimated () {
    //market.pmnd.rs
    const group = useRef()
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    const screen = useRef();
    const htmlref = useRef();
    let [iframeHidden, setIframeHidden] = useState(true);

    useFrame(() => {
        if (screen.current.rotation.x > 1.31) {
            screen.current.rotation.x -= 0.02;
        }

        if (screen.current.rotation.x <= 1.31) {
            setIframeHidden(false)
        }
    })

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
            <Float speed={2} rotationIntensity={0.5}>
                {/* Lights */}
                <rectAreaLight 
                    width={2.5}
                    height={1.65}
                    intensity={iframeHidden ? 0 : 65}
                    color={'#ffffff'}
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />
                <group ref={group} dispose={null} position-y={-1.1}>
                    <group position={[0, 0.52, 0,]} scale={[0.1, 0.1, 0.1,]} >
                        <mesh geometry={nodes.Circle001.geometry} material={nodes.Circle001.material} />
                        <mesh geometry={nodes.Circle001_1.geometry} material={nodes.Circle001_1.material} />
                        <mesh geometry={nodes.Circle001_2.geometry} material={materials.HeadPhoneHole} />
                        <mesh geometry={nodes.Circle001_3.geometry} material={nodes.Circle001_3.material} />
                        <mesh geometry={nodes.Circle001_4.geometry} material={nodes.Circle001_4.material} />
                        <mesh geometry={nodes.Circle001_5.geometry} material={materials.TouchbarBorder} />
                        <mesh geometry={nodes.Circle001_6.geometry} material={materials.Keyboard} />
                        <mesh geometry={nodes.FrontCameraRing001.geometry} material={materials['CameraRIngBlack.002']} position={[-0.15, 19.57, -16.15,]} scale={5.8} />
                        <mesh geometry={nodes.KeyboardKeyHole.geometry} material={nodes.KeyboardKeyHole.material} position={[-11.79, -0.15, -8.3,]} scale={5.8} />
                        <mesh geometry={nodes.RubberFoot.geometry} material={materials.DarkRubber} position={[-11.95, -0.75, 7.86,]} scale={5.8} />
                        <group position={[0.01, -0.21, -10.56,]} scale={5.8} >
                            <mesh geometry={nodes.Circle012.geometry} material={materials.HingeBlack} />
                            <mesh geometry={nodes.Circle012_1.geometry} material={materials.HingeMetal} />
                        </group>
                            <group position={[0, -0.51, 0,]} scale={5.8} >
                            <mesh geometry={nodes.Circle006.geometry} material={nodes.Circle006.material} />
                            <mesh geometry={nodes.Circle006_1.geometry} material={nodes.Circle006_1.material} />
                        </group>
                        <group position={[-11.79, -0.15, -8.3,]} scale={5.8} >
                            <mesh geometry={nodes.Circle.geometry} material={nodes.Circle.material} />
                            <mesh geometry={nodes.Circle_1.geometry} material={materials.Key} />
                            <mesh geometry={nodes.Circle_2.geometry} material={materials.Touchbar} />
                        </group>
                        <group ref={screen} position={[0.01, -0.47, -10.41,]} rotation={[3.15, 0, 0,]} scale={5.8} >
                            <mesh geometry={nodes.Circle002.geometry} material={nodes.Circle002.material} />
                            <mesh geometry={nodes.Circle002_1.geometry} material={materials.Screen} />
                            <mesh geometry={nodes.Circle002_2.geometry} material={materials.ScreenGlass} />
                            <mesh geometry={nodes.Circle002_3.geometry} material={materials.Rubber} />
                            <mesh geometry={nodes.Circle002_4.geometry} material={materials.DisplayGlass} />
                            <mesh geometry={nodes.AppleLogo000.geometry} material={materials['AppleLogo.004']} position={[0, -0.11, -1.8,]} rotation={[-Math.PI, 0, -Math.PI,]} scale={[0.58, 0.58, 0.58,]} />
                        </group>
                        <group position={[-15.03, 0.03, 0.6,]} scale={5.8} >
                            <mesh geometry={nodes.Circle009.geometry} material={nodes.Circle009.material} />
                            <mesh geometry={nodes.Circle009_1.geometry} material={nodes.Circle009_1.material} />
                        </group>
                        <group position={[12.2, 0.03, 0.6,]} scale={5.8} >
                            <mesh geometry={nodes.Circle003.geometry} material={nodes.Circle003.material} />
                            <mesh geometry={nodes.Circle003_1.geometry} material={nodes.Circle003_1.material} />
                        </group>
                    </group>
                    <Html style={{opacity: iframeHidden ? 0 : 1}} ref={htmlref} transform wrapperClass="htmlScreen" distanceFactor={1.17} position={[0.01, 1.49, -1.4]} rotation-x={-0.256}>
                        <iframe src="https://sketchfab.com/models/88b89d3074cb4946a353ab990d1ff6a2/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" />
                    </Html>
                </group>
                <Text
                    font='./fonts/Staatliches-Regular.ttf'
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