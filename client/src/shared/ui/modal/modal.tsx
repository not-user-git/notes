import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'motion/react'
import { twJoin } from 'tailwind-merge'

import { X } from 'lucide-react'

type TProps = {
  isOpen: boolean
  content: ReactNode
  title: string | null
  onClose: () => void
}

const modalAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 }
}

const modalContentAnimate = {
  initial: { translateY: -15 },
  animate: { translateY: 0 },
  transition: { duration: 0.15 }
}

export const Modal: FC<TProps> = ({ isOpen, content, title, onClose }) => {
  const modalRoot = document.getElementById('modal-root')

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen || !modalRoot) return null

  return ReactDOM.createPortal(
    <motion.div
      className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 cursor-pointer'
      onClick={onClose}
      {...modalAnimate}
    >
      <motion.div
        className='bg-white p-3 rounded min-w-[300px] cursor-default will-change-transform'
        onClick={e => e.stopPropagation()}
        {...modalContentAnimate}
      >
        <div className='flex items-center'>
          <button
            className={twJoin(
              'absolute size-6',
              'flex justify-center items-center',
              'text-neutral-400',
              'cursor-pointer'
            )}
            onClick={onClose}
          >
            <X className='size-5' />
          </button>

          <h3
            className={twJoin(
              'flex-1',
              'text-neutral-700 text-center text-lg font-semibold'
            )}
          >
            {title}
          </h3>
        </div>
        {content}
      </motion.div>
    </motion.div>,
    modalRoot
  )
}
