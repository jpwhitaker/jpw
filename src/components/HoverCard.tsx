
import { useState, useEffect, useRef, MouseEvent, MouseEventHandler} from 'react';
import { motion, Transition } from "framer-motion";
import styles from './HoverCard.module.css';



const HoverCard = ({ i }: { i: number }) => {
  const [isMaximized, setisMaximized] = useState<boolean>(false);
  const [isHovered, setHovered] = useState(false)

  const message = ['ho', 'brah', 'sup', "ka'a", 'and', 'angelo', '!', ''];

  const handleClick = () => {
    setisMaximized(!isMaximized);
  };

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null)

  
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
        const relativeX = Math.trunc(x - cardCenterX);
        const relativeY = Math.trunc(y - cardCenterY);
        // Update state
        setMouseX(relativeX);
        setMouseY(relativeY);
        console.log(`x: ${mouseX} y: ${mouseY}`)
      };
    };

  

  return (
    <div className={`rounded-[8px] aspect-[16/9]`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}

        layout={true}
        transition={trans}
        whileHover={isMaximized ? undefined : { scale: 1.1 }}
        initial={{ borderRadius: 8 }}  // Initial border-radius value
        animate={{
          borderRadius: isMaximized ? 0 : 8,  // Final border-radius value based on the state
        }}
        className={`bg-black  h-full p-4  ${isMaximized ? 'maximized' : ''}`}
        onClick={() => handleClick()}
      >
        <motion.div
          transition={trans}
          layout="position"
          className="text-white">
          {message[i]}</motion.div>
      </motion.div>
    </div>

  )
}

const trans: Transition = {
  duration: 0.1
}

export default HoverCard