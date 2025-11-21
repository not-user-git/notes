import { create } from 'zustand'

type TMenuStore = {
  id: string | null
  onOpen: (id: string) => void
  closeAll: () => void
}

export const useMenuStore = create<TMenuStore>((set, get) => ({
  id: null,
  onOpen: id => {
    if (get().id === id) set({ id: null })
    else set({ id })
  },
  closeAll: () => {
    if (get().id) set({ id: null })
  }
}))
