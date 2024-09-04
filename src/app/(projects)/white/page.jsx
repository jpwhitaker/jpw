"use client";
import { Layers, BackSide, DoubleSide, FrontSide, MeshStandardMaterial } from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { PresentationControls, Stars, Box, Plane, Svg } from "@react-three/drei";
import { useControls, Leva, useCreateStore } from "leva";
import { useSpring, a } from '@react-spring/three';
import './styles.css';
import { useState, useEffect } from "react";
import UIOverlay from './UIOverlay'


export default function CanvasWrapper() {
  const cameraLayer = new Layers();

  return (
    <div id="canvas-container" className="h-full text-white bg-white">
      <Canvas camera={{ position: [0, 0, 5], fov: 50, layers: cameraLayer }}>
        <Scene />
      </Canvas>
    </div>
  );
};

const Scene = () => {
  const BOX_LAYER = 1;
  const LIGHT_LAYER = 2;
  const cameraLayer = new Layers();
  cameraLayer.enable(BOX_LAYER);
  cameraLayer.enable(LIGHT_LAYER);
  const [isFlipped, setIsFlipped] = useState(false);

  const materials = [
    new MeshStandardMaterial({ color: 'white', side: DoubleSide, transparent: true, opacity: 1 }),
    new MeshStandardMaterial({ color: 'white', side: DoubleSide, transparent: true, opacity: 1 }),
    new MeshStandardMaterial({ color: 'white', side: DoubleSide, transparent: true, opacity: 1 }),
    new MeshStandardMaterial({ color: 'white', side: DoubleSide, transparent: true, opacity: 1 }),
    new MeshStandardMaterial({ color: 'red', side: DoubleSide, transparent: true, opacity: 0 }),
    new MeshStandardMaterial({ color: 'white', side: DoubleSide, transparent: false }),
  ];

  // Define the spring-animated state
  const [springProps, setSpringProps] = useSpring(() => ({
    rotation: [0, 0, 0], // Initial rotation
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  }));

  // Event handler to flip the plane
  const handleClick = () => {
    setSpringProps({
      rotation: isFlipped ? [0, 0, 0] : [-Math.PI / 2.2, 0, 0]
    });
    setIsFlipped(!isFlipped); // Update the flip state
    console.log('click')
  };

  // Use useFrame to update the rotation of the plane
  useFrame(({ scene }) => {
    const plane = scene.getObjectByName('group');
    if (plane) {
      plane.rotation.x = springProps.rotation.get()[0];
    }
  });


  return (
    <>
      <directionalLight
        color={0xffffff}
        intensity={2}
        position={[0, 0, 5]}
        castShadow
        // Other directional light properties
        layers={new Layers().set(LIGHT_LAYER)}
      />
      <ambientLight intensity={1.3} />

      <Stars radius={100} depth={150} count={5000} factor={4} saturation={0} speed={0.01} />
      {/* <Svg src={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
</svg>`} /> */}
      <a.group onClick={handleClick} position={[0, 0.5, 0]} name='group'>
        <mesh name="plane" position={[0, -0.5, 0]} >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial toneMapped={false} side={DoubleSide} />
        </mesh>
      </a.group>
      <mesh position={[0, 0, -0.5]} material={materials} layers={new Layers().set(BOX_LAYER)} onClick={handleClick}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh></>
  )
}