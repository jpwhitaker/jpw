"use client";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export const MoonSphere = () => {
  //CAUSES pagedata-script.js:1 CaptureThumbnail error TypeError: a.getContext(...).drawWindow is not a function
  const [moon_color, moon_height] = useTexture(["./moon_color.jpg", "./moon_height.jpg"]);

   // Create a ref to your sphere mesh
   const meshRef = useRef();

   // Rotate the mesh on each frame
   useFrame(() => {
     if (meshRef.current) {
      //  meshRef.current.rotation.x += 0.001;
       meshRef.current.rotation.y += 0.001;
     }
   });

  // Create the material using useMemo
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial();
    
    mat.map = moon_color;
    mat.aoMapIntensity = 1;
    mat.bumpMap = moon_height;
    mat.bumpScale = 0.01;
    mat.roughness = 1;
    return mat;
  }, [moon_color, moon_height]);

  return (
    <>
      <Sphere args={[0.5, 160, 30]} ref= {meshRef} material={material} castShadow receiveShadow  />
    </>
  );
};
