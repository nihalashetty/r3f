import { Canvas, useFrame } from '@react-three/fiber';
import { StrictMode, React } from 'react';
import ReactDOM from 'react-dom/client';
import Experience from './Experience';
import HtmlAndText from './HtmlAndText';
import './index.css';
import DebugExperience from './DebugExperience';
import { Leva } from 'leva';
// import EnvironmentAndStaging from './EnvironmentAndStaging';
// import EnvironmentAndStaging2 from './EnvironmentAndStaging2';
// import EnvironmentAndStaging3 from './EnvironmentAndStaging3';
// import EnvironmentAndStaging4 from './EnvironmentAndStaging4';
// import ModelsMain from './ModelsMain';
// import ThreeDText from './ThreeDText';
// import PortalScene from './PortalScene';
// import MouseEvents from './MouseEvents';
// import PostProcessing from './PostProcessing';
// import PostProcessing2 from './PostProcessing2';
// import Portfolio from './Portfolio';
import PortfolioAnimated from './PortfolioAnimated';

const root = ReactDOM.createRoot(document.getElementById('root'));

//called ones canvas is ready
const created = (state) => {
  console.log('created')
}

root.render(
  <>
    <StrictMode>
      <Leva collapsed/>
      <Canvas
        flat //no tone mapping applied if used flat
        shadows 
        camera={ {fov: 45, near: 0.1, far: 200, position: [-4, 3, 6]} }
        onCreated={created}
      >
        {/* <Experience /> */}
        {/* <DebugExperience /> */}
        {/* <EnvironmentAndStaging /> */}
        {/* <EnvironmentAndStaging2 /> */}
        {/* <EnvironmentAndStaging3 /> */}
        {/* <EnvironmentAndStaging4 /> */}
        {/* <ModelsMain /> */}
        {/* <ThreeDText /> */}
        {/* <PortalScene /> */}
        {/* <MouseEvents /> */}
        {/* <PostProcessing /> */}
        {/* <PostProcessing2 /> */}
        {/* <Portfolio /> */}
        <PortfolioAnimated />
        {/* <HtmlAndText /> */}
      </Canvas>
    </StrictMode>
  </>
);