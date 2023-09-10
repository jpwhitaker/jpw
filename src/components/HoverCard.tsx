import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import styles from './HoverCard.module.css';

const HoverCard = ({ i, children }: { i: number; children: React.ReactNode }) => {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [zIndex, setZIndex] = useState('z-[0]');

  const message = [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-purple-400',
    'bg-orange-400',
    'bg-pink-400',
    'bg-yellow-400',
    '',
  ];

  const containerStyle = ` ${isMaximized ? 'fixed inset-0' : ' aspect-[16/9]'} ${zIndex}`;
  const motionDivStyle = isMaximized ? 'h-screen w-screen' : 'h-full';

  return (
    <div className="aspect-[16/9]">
      <AnimatePresence>
        <div className={containerStyle} onClick={() => {
           if (isMaximized === false) setZIndex('z-[100]');
           setIsMaximized(!isMaximized)
           
          }}>
          <motion.div
            initial={{ borderRadius: isMaximized ? 0 : 8 }}
            animate={{ borderRadius: isMaximized ? 0 : 8 }}
            onAnimationComplete={() => {
              if (isMaximized === false) setZIndex('z-[0]');
              if (isMaximized === true) setZIndex('z-[100]');
              
            }}
            exit={{ opacity: 0 }}
            whileHover={{ cursor: 'pointer' }}
            layout
            transition={trans}
            className={`${message[i]} ${motionDivStyle}`}
          >
            <motion.div
              transition={trans}
              layout="position"
              className="text-white"
            >
              {/* RotateCard is assumed to be defined elsewhere */}
              <RotateCard isMaximized={isMaximized} message={message[i]}>{message[i]}</RotateCard>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

const trans: Transition = {
  duration: 1,
};

// Update the z-index as required when the state changes.
// Place this logic inside the `onClick` handler.
// const updateZIndex = (isMaximized: boolean, setZIndex: number) => {
//  else {
//     // Resetting the z-index to 0 is now handled in the onAnimationComplete callback
//   }
// };

export default HoverCard;


const RotateCard = ({ isMaximized, message, children }: { isMaximized: boolean, message: string, children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const angle = 80;




  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Get mouse coordinates relative to the page
    const x = e.pageX;
    const y = e.pageY;

    // Get the element's position and dimensions
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Calculate mouse coordinates relative to the center of the card
      const relativeX = Math.round(x - cardCenterX);
      const relativeY = Math.round(y - cardCenterY);
      // Update state
      setMouseX(relativeX);
      setMouseY(relativeY);
    }
  };

  const handleMouseLeave = () => {
    setRx(0);
    setRy(0);
    // setIsHovering(false);
  };

  //rotation
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const degX = width / angle;
      const degY = height / angle;
      setRx(-(mouseY / degY));
      setRy(mouseX / degX);
      // var newTransform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      // transform.set(newTransform);
    }
  }, [mouseX, mouseY]);

  return (
    <>
      {/** Outer container div, constricts inner child motion div **/}
      <motion.div ref={cardRef} className={`rounded-[8px] aspect-[16/9] h-full`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      >
        {/** Main motion div, grows and shrinks on hover, on click grows to full screen **/}
        <motion.div
          layout={true}
          transition={trans}

          initial={{
            rotateX: 0,
            rotateY: 0,
            transformPerspective: 1000,
          }}
          animate={{
            rotateX: isMaximized ? 0 : rx,
            rotateY: isMaximized ? 0 : ry,
            transformPerspective: 1000,
          }}
          className='h-full'
        >
          {/** Inner Content, shifts position with same transition speed **/}
          <motion.div
            transition={trans}
            layout={true}
            className={`text-white border-indigo-500 border-2 h-full rounded-[8px] p-4`}
          >
            <motion.div
              layout='position'>
              {children}
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};
