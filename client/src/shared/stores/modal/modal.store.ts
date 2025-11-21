import type { ReactNode } from 'react'
import type { TOpenModalFn } from './modal.types'
import { create } from 'zustand'

type TModalProps = {
  isOpen: boolean
  content: ReactNode
  title: string | null
  openModal: TOpenModalFn
  closeModal: () => void
}

export const useModal = create<TModalProps>(set => ({
  isOpen: false,
  content: null,
  title: null,
  openModal: (content, title) => set({ isOpen: true, title, content }),
  closeModal: () => set({ isOpen: false, title: null, content: null })
}))
