"use client";
import { Sphere, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export const MoonSphere = () => {
  const [moon_color, moon_height] = useTexture(["./moon_color.jpg", "./moon_height.jpg"]);

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
      <Sphere args={[0.5, 160, 30]} material={material} castShadow receiveShadow />
    </>
  );
};
