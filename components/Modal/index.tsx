import { motion } from 'framer-motion'
import { FC } from 'react';
import Backdrop from './Backdrop'

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

type PropsModal = {
  handleClose: () => void
  type: 'dropIn'|'gifYouUp'
}

const Modal: FC<PropsModal> = ({ handleClose, type }) => {
  return (
    <Backdrop onClick={handleClose}>
      {type === "dropIn" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg mx-6"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Create a post</h4>
            <div onClick={handleClose} className="flex items-center justify-center text-center cursor-pointer">
              <i className="material-icons h-7 w-7 dark:text-white/75">close</i>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div>Content</div>
            </div>
            Isi Kontent
          </div>
        </motion.div>
      )}

      {type === "gifYouUp" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg mx-6"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Create a post</h4>
            <div onClick={handleClose} className="flex items-center justify-center text-center cursor-pointer">
              <i className="material-icons h-7 w-7 dark:text-white/75">close</i>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div>Content</div>
            </div>
            Isi Kontent
          </div>
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;
