import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, Transition } from "framer-motion";
import styles from './HoverCard.module.css';

const HoverCard = ({ i }: { i: number }) => {
  const [isMaximized, setisMaximized] = useState<boolean>(false);

  const message = ['bg-red-400', 'bg-blue-400', 'bg-green-400', "bg-purple-400", 'bg-orange-400', 'bg-pink-400', 'bg-yellow-400', ''];

  return (
    <>
      {/** Outer container div, constricts inner child motion div **/}
      <div  className={`rounded-[8px] aspect-[16/9]`} >

        {/** Main motion div, grows and shrinks on hover, on click grows to full screen **/}
        <motion.div
          whileHover={{ cursor: 'pointer' }}
          layout={true}
          transition={trans}
          className={`${message[i]}   h-full p-4 }`}
        >
          {/** Inner Content, shifts position with same transition speed **/}
          <motion.div
            transition={trans}
            layout="position"
            className="text-white">
            {message[i]}</motion.div>
        </motion.div>
      </div >
    </>
  )
}

const trans: Transition = {
  duration: 0.2
}

export default HoverCard