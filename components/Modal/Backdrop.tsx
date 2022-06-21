import {motion} from 'framer-motion'
import { ButtonHTMLAttributes } from 'react';

const Backdrop = ({ children, onClick }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <motion.div
      onClick={() => onClick}
      className="absolute top-0 left-0 h-full w-full overflow-y-scroll bg-black/70 flex items-center justify-center z-[1002]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
