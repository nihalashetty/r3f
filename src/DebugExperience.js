import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function DebugExperience () {
    const {perfVisible} = useControls('Perf Controls', {
        perfVisible: false
    });

    const {position, scale, boxPosition, color, visible} = useControls('Controller Name', {
        position: 2,
        scale: {
            value: 1,
            min: 1,
            max: 4,
            step: 1
        },
        boxPosition: {
            value: {x:-2, y:0},
            step: 0.1,
            joystick: 'invertY'
        },
        color: "#ff0000",
        visible: true,
        clickMe: button(() => {
            console.log('ok');
        })
    });

    return <>
        { perfVisible && <Perf position="top-left"/> }
        <OrbitControls makeDefault/>
        <directionalLight intensity={1.5}/>
        <ambientLight intensity={0.5} />
        <mesh position-x={ position } scale={scale}>
            <sphereGeometry />
            <meshStandardMaterial color="purple"/>
        </mesh>
        <mesh position={ [boxPosition.x, boxPosition.y, 0] } rotation-y={ Math.PI * 0.5 } visible={ visible }>
            <boxGeometry />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={ [0, -1, -2] } scale={ 10 } rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshStandardMaterial color="lightgreen"/>
        </mesh>
    </>
}