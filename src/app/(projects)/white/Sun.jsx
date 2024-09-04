import { useControls, Leva, useCreateStore } from "leva";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
const Sun = ({ store, hawaiianMoonPhase }) => {
  const light = useRef();

  const { intensity, moonPhase } = useControls(
    "Sun",
    {
      intensity: {
        value: 3,
        min: 0,
        max: 6,
        step: 0.05,
      },
    },
    { store }
  );

  const hawaiianMoonRotationFunction = (hawaiianMoonPhase) => {
    return (2 * Math.PI * hawaiianMoonPhase / 30);
  };

  // Initialize target position with the same initial position
  const targetPosition = useRef([0, 0, -1.5]);

  useEffect(() => {
    const initialX = 0;
    const initialZ = -1.5;
    const theta = hawaiianMoonRotationFunction(hawaiianMoonPhase);

    targetPosition.current[0] = initialX * Math.cos(theta) - initialZ * Math.sin(theta);
    targetPosition.current[2] = initialX * Math.sin(theta) + initialZ * Math.cos(theta);
  }, [hawaiianMoonPhase]);

  useFrame(() => {
    if (light.current) {
      //TODO I'd like to change from LERP to something else, right now it always goes the shortest path, but it should go clockwise if going up, and counter if going down.  transitions from hilo to mahealani dont even revolve.
      // Lerp each coordinate
      const lerpFactor = 0.05; // Adjust this value for faster or slower lerping
      light.current.position.x += (targetPosition.current[0] - light.current.position.x) * lerpFactor;
      light.current.position.z += (targetPosition.current[2] - light.current.position.z) * lerpFactor;
    }
  });
  

  return (
    <>
      <directionalLight
        ref={light}
        color={0xffffff}
        intensity={intensity}
        position={[0, 0, -1.5]}
        castShadow
        shadow-mapSize-width={5000}
        shadow-mapSize-height={5000}
        shadow-camera-near={0}
        shadow-camera-far={1.4}
        shadow-camera-left={-0.6}
        shadow-camera-right={0.6}
        shadow-camera-top={0.6}
        shadow-camera-bottom={-0.6}
      />
    </>
  );
};

export default Sun;