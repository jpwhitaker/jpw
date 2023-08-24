'use client';
import { motion, Transition } from "framer-motion"
import Image from 'next/image'
import { useState, useRef } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='grid w-full grid-cols-4 gap-6 '>
        <Divs />
      </div>
    </main>
  )
}


const Divs = () => {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <Div></Div>
      ))}
    </>
  )
}

const Div = () => {
  const [isMaximized, setisMaximized] = useState<boolean>(false);


  const handleClick = () => {
    setisMaximized(!isMaximized);
  };

  return (
    <div className={`  rounded-[8px] aspect-[16/9]`}>
      <motion.div
        layout={true}
        transition={trans}
        initial={{ borderRadius: 8 }}  // Initial border-radius value
        animate={{
          borderRadius: isMaximized ? 0 : 8,  // Final border-radius value based on the state
        }}
        className={`bg-black  h-full p-4 ${isMaximized ? 'maximized' : ''}`}
        onClick={() => handleClick()}
      >
        <motion.div
          transition={trans}
          layout="position"
          className="text-white">
          ho</motion.div>
      </motion.div>
    </div>

  )
}

const trans: Transition = {
  duration: 0.2
}