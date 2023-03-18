import { Float, Text } from "@react-three/drei";

export default function HtmlAndText () {
    return <>
        <Float speed={5} floatIntensity={10}>
            <Text font="./fonts/Staatliches-Regular.ttf" fontSize={1} color="salmon" position-y={2} maxWidth={2} textAlign="center">
                NIHAL A SHETTY
                <meshNormalMaterial />
            </Text>
        </Float>
    </>
}