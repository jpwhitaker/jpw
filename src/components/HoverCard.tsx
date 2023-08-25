
import { useState, useEffect, useRef, MouseEvent, MouseEventHandler } from 'react';
import { motion, useMotionValue, Transition } from "framer-motion";
import styles from './HoverCard.module.css';



const HoverCard = ({ i }: { i: number }) => {
  const [isMaximized, setisMaximized] = useState<boolean>(false);
  const [isHovered, setHovered] = useState(false)
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null)
  const transform = useMotionValue('rotateX(0deg)');
  const angle = 40;


  const message = ['ho', 'brah', 'sup', "ka'a", 'and', 'angelo', '!', ''];

  const handleClick = () => {
    setisMaximized(!isMaximized);
  };




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
    };
  };

  


  //rotation
  useEffect(() => {
    // console.log(`x: ${mouseX} y: ${mouseY}`);
    const theta = Math.atan2(mouseX, mouseY)

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width
      const height = rect.height
      const degX = width/angle
      const degY = height / angle
      const rx = -(mouseY / degY)
      const ry = (mouseX / degX)
      var newTransform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      transform.set(newTransform);
    }

    
  }, [mouseX, mouseY]);


  return (
    <>
      {/** Outer container div, constricts inner child motion div **/}
      <div ref={cardRef} className={`rounded-[8px] aspect-[16/9]`}>
        
        {/** Main motion div, grows and shrinks on hover, on click grows to full screen **/}
        <motion.div
          onMouseMove={handleMouseMove}
          layout={true}
          transition={trans}
          // whileHover={}
          style={{transform}}
          animate={{
            
          }}
          className={`bg-black  h-full p-4`}
          onClick={() => handleClick()}
        >
          {/** Inner Content, shifts position with same transition speed **/}
          <motion.div
            transition={trans}
            layout="position"
            className="text-white">
            {message[i]}</motion.div>
        </motion.div>
      </div>
    </>
  )
}

const trans: Transition = {
  duration: 0.8
}

export default HoverCard