import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useState } from "react"
import { NumbersWrapper } from "./components/numbers-wrapper";

function App() {
  const [state, setState] = useState<'visible' | 'hidden' | 'copied'>('hidden')

  const variants = {
    hidden: {
      strokeDashoffset: 0,
      strokeWidth: 0,
      fill: '#c7d2fe',
      stroke: '#ffffff', 
      transition: { 
        default: { type: 'tween', ease: 'easeInOut', duration: .3 },
        strokeDashoffset: { duration: 0 },
        strokeWidth: { duration: 0 }
      },

    },
    visible: {
      strokeDashoffset: (38 * 4),
      fill: '#a7f3d0',
      stroke: '#10b981',
      strokeWidth: 2,
      transition: { 
        default: { type: 'tween', ease: 'easeInOut', duration: .3 },
        strokeDashoffset: { duration: 2.5, type: 'tween', ease: 'easeOut', delay: .2 }
      },
    },
    copied: {
      strokeDashoffset: (38 * 4),
      strokeWidth: 0,
      fill: '#10b981',
      stroke: '#10b981',
      transition: { 
        default: { type: 'tween', ease: 'easeInOut', duration: .3 },
        strokeDashoffset: { duration: 0 }
      },
    }
  }
  
  const handleClick = () => {
    if(state == 'hidden') return setState('visible')
    if(state == 'visible') return setState('copied')
  }

  return (
    <section className="w-full h-dvh flex justify-center items-center">
      <motion.div
        layout 
        className="border-2 py-1 pl-3 pr-1 rounded-2xl flex items-center gap-4 text-xl"
      >
        <NumbersWrapper state={state} />
        <motion.div 
          whileTap={{ scale: state == 'visible' ? 1 : .9 }}
          className="ml-8 w-10 h-10 relative flex justify-center items-center outline-none cursor-pointer"
          onClick={handleClick}
        >
          {/* rect  */}
          <svg className="w-full h-full">
            <motion.rect
              initial={{ strokeDashoffset: 0, strokeWidth: 2 }}
              animate={state}
              variants={variants}
              onAnimationComplete={(e) => {
                if(e == 'hidden') return 
                if(e == 'visible') return setState('hidden')

                if(e == 'copied') return setTimeout(() => {
                  setState('hidden')
                }, 500)
              }}
              x="1"
              y="1"
              width="38"
              height="38"
              rx="12"
              ry="12"
              strokeDasharray={(38 * 4)}
              strokeLinejoin="round"
            />
          </svg>
          <MotionConfig transition={{ duration: .15, type: 'spring', bounce: .3 }}>
            <AnimatePresence initial={false} mode="wait">
              {state == 'hidden' && (
                // eye
                <motion.svg
                  key="eye"
                  initial={{ scale: .5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: .5, opacity: 0 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="absolute fill-indigo-500 w-6 h-6"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </motion.svg>
              )}
              {state == 'visible' && (
                // files 
                <motion.svg
                  key="files"
                  initial={{ scale: .5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: .5, opacity: 0 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="absolute fill-none stroke-emerald-500 w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                  <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
                  <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
                </motion.svg>
              )}
              {state == 'copied' && (
                // check 
                <motion.svg
                  key="check"
                  initial={{ scale: .5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: .5, opacity: 0 }}
                  className="absolute stroke-white fill-none w-7 h-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6 9 17l-5-5" />
                </motion.svg>
              )}
            </AnimatePresence>
          </MotionConfig>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default App
