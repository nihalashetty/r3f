// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useAnimations, Clone, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function Model () {
    //For simple loader
    // const model = useLoader(GLTFLoader, './littlestTokyo.glb');
    //Someloader needs dracoLoaders
    // const model = useLoader(GLTFLoader, './robotExpressive.glb', (loader) => {
    //     const dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath('./draco/');
    //     loader.setDRACOLoader(dracoLoader);
    // });

    //Above code is normal method. Simple one is to use drei
    //Using drei no need to use Draco or anything and even draco folder not required as drei takes draco folder directly from cdn
    const model = useGLTF('./robotExpressive.glb');
    const animations = useAnimations(model.animations, model.scene);
    const { animationName } = useControls('Robot Control', {
        animationName: {
            options: animations.names
        }
    })

    useEffect(() => {
        const action = animations.actions[animationName]
        action.reset().fadeIn(0.5).play()

        // setTimeout(() => {
        //     animations.actions.Walking.play();
        //     animations.actions.Walking.crossFadeFrom(animations.actions.Running, 1);
        // }, 2000);

        return () => {
            action.fadeOut(0.5);
        }
    }, [animationName]);

    //Use <primitive object={ model.scene } scale={0.4} /> if no cloning required
    //Use <Clone object={ model.scene } scale={0.4} /> if cloning required

    return <>
        <primitive object={ model.scene } scale={0.4} position-y={-0.5} position-x={-2} />
    </>
}