import { useModal } from '@/shared/stores/modal/modal.store'
import { Modal } from './modal'
import { AnimatePresence } from 'motion/react'

export const GlobalModal = () => {
  const { isOpen, content, title, closeModal } = useModal()

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          content={content}
          title={title}
          onClose={closeModal}
        />
      )}
    </AnimatePresence>
  )
}
