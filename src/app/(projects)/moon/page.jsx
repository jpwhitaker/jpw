"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { PresentationControls, Stars } from "@react-three/drei";
import { useControls, Leva, useCreateStore } from "leva";
import Sun from './Sun'
import { MoonSphere } from "./MoonSphere";
import './styles.css';
import { useState, useEffect } from "react";
import UIOverlay from './UIOverlay'


export default function Moon() {
  const store = useCreateStore();
  //default moon phase
  const [moonPhase, setMoonPhase] = useState(5);
  const { ambientIntensity, cameraX, cameraY, cameraZ, cameraFov } = useControls('Scene', {
    ambientIntensity: { value: 0.2, min: 0, max: 1, step: 0.01 },
    cameraX: { value: 0, min: -10, max: 10, step: 0.1 },
    cameraY: { value: 0, min: -10, max: 10, step: 0.1 },
    cameraZ: { value: 10, min: 0, max: 50, step: 0.1 },
    cameraFov: { value: 10, min: 0, max: 50, step: 1 },
  }, { store });

  return (
    <div id="canvas-container" className="h-full text-white">
      <Leva store={store} collapsed hidden />
      <Canvas camera={{ position: [cameraX, cameraY, cameraZ], fov: cameraFov }}>
        <CameraUpdater cameraX={cameraX} cameraY={cameraY} cameraZ={cameraZ} cameraFov={cameraFov} />
        <ambientLight intensity={ambientIntensity} />
        <PresentationControls
          global={true}
          snap={true}
          polar={[-Infinity, Infinity]}
        >
        <Stars radius={100} depth={150} count={5000} factor={4} saturation={0} speed={0.01} />
        <MoonSphere />
        </PresentationControls>
        <Sun store={store} hawaiianMoonPhase={moonPhase} />
      </Canvas>
      <UIOverlay moonPhase={moonPhase} setMoonPhase={setMoonPhase}/>
    </div>
  );
};



const CameraUpdater = ({ cameraX, cameraY, cameraZ, cameraFov }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.fov = cameraFov;
    camera.updateProjectionMatrix();
  }, [camera, cameraX, cameraY, cameraZ, cameraFov]);

  return null;
};