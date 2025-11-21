import type {
  FC,
  TextareaHTMLAttributes,
  Dispatch,
  SetStateAction
} from 'react'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { twJoin, twMerge } from 'tailwind-merge'

import { X } from 'lucide-react'

type TProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  fullWith?: boolean
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const buttonAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.05 }
}

export const Textarea: FC<TProps> = ({
  value,
  setValue,
  fullWith,
  ...attributes
}) => {
  const [isButtonHide, setIsButtonHide] = useState<boolean>(true)
  const [isInputValueHide, setIsInputValueHide] = useState<boolean>(false)

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setIsButtonHide(!value)
  }, [value])

  return (
    <div
      className={twMerge(
        'h-[180px]',
        'flex',
        'border-2 border-neutral-200 rounded-lg overflow-hidden',
        fullWith ? 'w-full' : 'w-80'
      )}
    >
      <div className='flex-1 py-2.5'>
        <textarea
          {...attributes}
          spellCheck={false}
          className={twMerge(
            'size-full',
            'text-base text-neutral-800 leading-[1.2]',
            'pl-2 pr-4 outline-none',
            'transition-opacity duration-100',
            'resize-none',

            isInputValueHide ? 'opacity-0' : 'opacity-100'
          )}
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <AnimatePresence>
        {!isButtonHide && (
          <motion.button
            type='button'
            className={twJoin(
              'size-10',
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
