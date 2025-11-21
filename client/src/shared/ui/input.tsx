import type { InputHTMLAttributes, Dispatch, SetStateAction, FC } from 'react'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { twJoin, twMerge } from 'tailwind-merge'

import { X } from 'lucide-react'

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  fullWith?: boolean
}

const buttonAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.05 }
}

export const Input: FC<TProps> = ({
  value,
  setValue,
  fullWith,
  ...attributes
}) => {
  const [isButtonHide, setIsButtonHide] = useState<boolean>(true)
  const [isInputValueHide, setIsInputValueHide] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsButtonHide(!value)
  }, [value])

  return (
    <div
      className={twMerge(
        'h-10',
        'flex',
        'border-2 border-neutral-200 rounded-lg overflow-hidden',

        fullWith ? 'w-full' : 'w-80'
      )}
    >
      <input
        {...attributes}
        className={twMerge(
          'flex-1',
          'text-base text-neutral-800 leading-none',
          'pl-2 outline-none',
          'transition-opacity duration-100',
          isInputValueHide ? 'opacity-0' : 'opacity-100'
        )}
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <AnimatePresence>
        {!isButtonHide && (
          <motion.button
            type='button'
            className={twJoin(
              'w-10',
              'flex justify-center items-center',
              'cursor-pointer'
            )}
            onClick={() => {
              setIsInputValueHide(true)

              setTimeout(() => {
                setValue('')
                inputRef.current?.focus()
                setIsInputValueHide(false)
              }, 100)
            }}
            {...buttonAnimate}
          >
            <X className='size-4 text-neutral-700' />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
