"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { CameraControls, Stars } from "@react-three/drei";
import { useControls, Leva, useCreateStore } from "leva";
import Sun from './Sun'
import { MoonSphere } from "./MoonSphere";



export default function Moon() {
  const store = useCreateStore();
  const { ambientIntensity } = useControls('Scene', {
    ambientIntensity: { value: 0.2, min: 0, max: 1, step: 0.01 },
  }, { store });
  return (
    <div id="canvas-container" className="h-full text-white">
      <Leva store={store}/>
      <Canvas>
        <CameraControls />
        <Stars radius={100} depth={500} count={500} factor={4} saturation={0}  speed={0.01} />
        <ambientLight intensity={ambientIntensity} />
        <MoonSphere />
        <Sun store={store}/>
      </Canvas>
    </div>
  );
}