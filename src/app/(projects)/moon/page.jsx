"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { CameraControls, Stars } from "@react-three/drei";
import { useControls, Leva, useCreateStore } from "leva";
import Sun from './Sun'
import { MoonSphere } from "./MoonSphere";
import { SegmentedControl, Slider } from '@mantine/core';
import './styles.css';
import { useState, useEffect } from "react";


export default function Moon() {
  const store = useCreateStore();
  const [moonPhase, setMoonPhase] = useState(1);
  const { ambientIntensity, cameraX, cameraY, cameraZ, cameraFov } = useControls('Scene', {
    ambientIntensity: { value: 0.2, min: 0, max: 1, step: 0.01 },
    cameraX: { value: 0, min: -10, max: 10, step: 0.1 },
    cameraY: { value: 0, min: -10, max: 10, step: 0.1 },
    cameraZ: { value: 10, min: 0, max: 50, step: 0.1 },
    cameraFov: { value: 10, min: 0, max: 50, step: 1 },
  }, { store });

  return (
    <div id="canvas-container" className="h-full text-white">
      <Leva store={store} />
      <Canvas camera={{ position: [cameraX, cameraY, cameraZ], fov: cameraFov }}>
        <CameraUpdater cameraX={cameraX} cameraY={cameraY} cameraZ={cameraZ} cameraFov={cameraFov} />

        <Stars radius={100} depth={500} count={500} factor={4} saturation={0} speed={0.01} />
        <ambientLight intensity={ambientIntensity} />
        <MoonSphere />
        <Sun store={store} hawaiianMoonPhase={moonPhase} />
      </Canvas>
      <div className="overlay">
        <div className="segmented-container w-full px-12">
          <PhaseSlider setMoonPhase={setMoonPhase} />
        </div>
      </div>
    </div>
  );
};

const PhaseSlider = ({ setMoonPhase }) => {
  const PHASES = [
    { value: 1, label: 'Hilo' },
    { value: 2, label: 'Hoaka' },
    { value: 3, label: 'Kukahi' },
    { value: 4, label: 'Kulua' },
    { value: 5, label: 'Kukolu' },
    { value: 6, label: 'Kupau' },
    { value: 7, label: '‘Olekukahi' },
    { value: 8, label: '‘Olekulua' },
    { value: 9, label: '‘Olekukolu' },
    { value: 10, label: '‘Olepau' },
    { value: 11, label: 'Huna' },
    { value: 12, label: 'Mohalu' },
    { value: 13, label: 'Hua' },
    { value: 14, label: 'Akua' },
    { value: 15, label: 'Hoku' },
    { value: 16, label: 'Mahealani' },
    { value: 17, label: 'Kulu' },
    { value: 18, label: 'La‘aukukahi' },
    { value: 19, label: 'La‘aukulua' },
    { value: 20, label: 'La‘aupau' },
    { value: 21, label: '‘Olekukahi' },
    { value: 22, label: '‘Olekulua' },
    { value: 23, label: '‘Olepau' },
    { value: 24, label: 'Kaloakukahi' },
    { value: 25, label: 'Kaloakulua' },
    { value: 26, label: 'Kaloapau' },
    { value: 27, label: 'Kane' },
    { value: 28, label: 'Lono' },
    { value: 29, label: 'Mauli' },
    { value: 30, label: 'Muku' }
  ];

  const ANAHULU = [
    { value: 1, label: 'HO‘ONUI (Rising)' },
    { value: 11, label: 'POEPOE (rounding, full)' },
    { value: 21, label: 'EMI (diminishing)' },
  ]

  return (
    <Slider
      label={(val) => {
        console.log(val)
        return (PHASES.find((mark) => mark.value === val).label)
      }}
      labelAlwaysOn
      defaultValue={1}
      onChange={setMoonPhase}
      size={'lg'}
      step={1}
      min={1}
      max={30}
      marks={PHASES}
      color="rgb(250 250 249)"
      styles={{
        markLabel: { display: 'none' },
        track: {
          '::before': {
            backgroundColor: 'rgb(55 65 81)'
          }
        },
        bar: {
          backgroundColor: 'rgb(100 116 139)'
        },
        thumb: {
          borderColor: 'rgb(100 116 139)',
        },
        mark: {
          borderColor: 'rgb(55 65 81)',
        },
        markFilled: {
          borderColor: 'rgb(100 116 139)',
        }
      }}
    />
  )
}

const Segmented = () => {
  return (<SegmentedControl
    size="sm"
    data={[
      { label: 'React', value: 'react' },
      { label: 'Angular', value: 'ng' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ]}
    classNames={{
      root: 'bg-gray-800',
      label: 'text-gray-400',
      indicator: 'bg-gray-700'
    }}
    styles={(theme) => ({
      control: {
        ':not(:first-of-type)': {
          'border-style': 'solid',
          'border-width': '0 0 0 0.0625rem',
          'border-color': `rgb(55 65 81)`,
        },
        label: {
          '&[data-active]': {
            'color': 'rgb(209 213 219)'
          },
          '&[data-active]:hover': {
            'color': 'rgb(209 213 219)'
          },
          '&:hover': {
            'color': 'rgb(209 213 219)'
          }
        }
      }
    })}
  />)
}

const CameraUpdater = ({ cameraX, cameraY, cameraZ, cameraFov }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.fov = cameraFov;
    camera.updateProjectionMatrix();
  }, [camera, cameraX, cameraY, cameraZ, cameraFov]);

  return null;
};