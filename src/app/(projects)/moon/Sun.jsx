import { useControls, Leva, useCreateStore } from "leva";
import { useEffect, useRef } from "react";
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
      moonPhase: {
        options: [
          "new-moon",
          "waxing-crescent-moon",
          "first-quarter-moon",
          "waxing-gibbous-moon",
          "full-moon",
          "waning-gibbous-moon",
          "last-quarter-moon",
          "waning-crescent-moon",
        ],
      },
    },
    { store }
  );

  const thetaCalc = (num) => {
    return 2 * Math.PI * num;
  };

  const rotationFunctions = {
    "new-moon": () => thetaCalc(0),
    "waxing-crescent-moon": () => thetaCalc(1.5 / 8),
    "first-quarter-moon": () => thetaCalc(2 / 8),
    "waxing-gibbous-moon": () => thetaCalc(3 / 8),
    "full-moon": () => thetaCalc(4 / 8),
    "waning-gibbous-moon": () => thetaCalc(5.5 / 8),
    "last-quarter-moon": () => thetaCalc(6 / 8),
    "waning-crescent-moon": () => thetaCalc(7 / 8),
  };

  const hawaiianMoonRotationFunction = (hawaiianMoonPhase) => {
    return (thetaCalc(hawaiianMoonPhase/30))
  }

  useEffect(() => {
    if (light.current) {
      const initialX = 0;
      const initialZ = -1.5;
      // const theta = rotationFunctions[moonPhase]();
      const theta = hawaiianMoonRotationFunction(hawaiianMoonPhase);
      console.log(hawaiianMoonPhase)
      
      light.current.position.x = initialX * Math.cos(theta) - initialZ * Math.sin(theta);
      light.current.position.z = initialX * Math.sin(theta) + initialZ * Math.cos(theta);
    }
  }, [hawaiianMoonPhase]);
  

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