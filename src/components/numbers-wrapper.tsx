import { AnimatePresence, motion } from "motion/react";
import { formatNumber } from "../utils/formatNumber";

interface Props {
  state: 'visible' | 'hidden' | 'copied'
}

export function NumbersWrapper({ state }: Props) {
  const numberArray = formatNumber(4485199620577516)

  const key2 = state == 'hidden' ? 'hidden' : 'visible'

  return (
    <AnimatePresence initial={ false }>
      {numberArray?.map((group, i, array) => (
        <motion.div 
          key={i} 
          exit={{ opacity: 0 }}
        >
          {[...group].map((number, j) => {
            if(i == 0 || i == (array.length - 1)) {
              return <span key={`${i}-${j}`}>{number}</span>
            }
  
            if(state != 'hidden') {
              return (
                <motion.span 
                  key={`${i}-${j}-${key2}`}
                  className="inline-block"
                  initial={{ scale: .4, y: -4, opacity: 0, filter: 'blur(2px)' }}
                  animate={{ scale: 1, y: 0, opacity: 1, filter: 'blur(0px)' }}
                  // exit={{ scale: .4, y: 4, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ duration: .4, type: 'spring', bounce: .3 }}
                >
                  {number}
                </motion.span>
              )
            }
  
            return (
              <motion.span 
                key={`${i}-${j}-${key2}`}
                className="inline-block"
                initial={{ scale: .6, y: -4, opacity: 0, filter: 'blur(2px)' }}
                animate={{ scale: 1, y: 0, opacity: 1, filter: 'blur(0px)' }}
                // exit={{ scale: .6, y: 4, opacity: 0, filter: 'blur(2px)' }}
                transition={{ duration: .4, type: 'spring', bounce: .3 }}
              >
  
                x
              </motion.span>
            )
  
          })}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}