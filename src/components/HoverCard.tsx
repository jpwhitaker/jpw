import { useState } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import styles from './HoverCard.module.css';

const HoverCard = ({ i }: { i: number }) => {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const message = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400', 'bg-yellow-400', ''];

  const containerStyle = isMaximized ? 'fixed inset-0 z-50 ' : ' aspect-[16/9]';
  const motionDivStyle = isMaximized ? 'h-screen w-screen' : 'h-full';

  return (
    <div className="  aspect-[16/9]">
    <AnimatePresence>
      
        <div className={containerStyle} onClick={() => setIsMaximized(!isMaximized)}>
          <motion.div
            initial={{ borderRadius: isMaximized ? 0 : 8 }}
            animate={{ borderRadius: isMaximized ? 0 : 8  }}
            exit={{ opacity: 0 }}
            whileHover={{ cursor: 'pointer' }}
            layout
            transition={trans}
            className={`${message[i]} ${motionDivStyle} p-4`}
          >
            <motion.div
              transition={trans}
              layout="position"
              className="text-white"
            >
              {message[i]}
            </motion.div>
          </motion.div>
        </div>
      
    </AnimatePresence>
    </div>
  );
};

const trans: Transition = {
  duration: 0.2
};

export default HoverCard;
