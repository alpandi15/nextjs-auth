import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

const Theme = () => {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <div className="flex items-center">
      {/* Dark mode toggle */}
      <div
        className={`mr-4 bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
          resolvedTheme === "dark" ? "justify-end" : "justify-start"
        }`}
        onClick={() =>
          setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }
      >
        <span className="absolute left-0">🌜</span>
        <motion.div
          className="w-5 h-5 bg-white rounded-full z-40"
          layout
          transition={spring}
        />

        <span className="absolute right-0.5">🌞</span>
      </div>
    </div>    
  )
}

export default Theme