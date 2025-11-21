import type { INote } from '../model/types'
import { create } from 'zustand'

interface INotesStore {
  notes: INote[]
  updateNotes: (notes: INote[]) => void
}

export const useNotesStore = create<INotesStore>(set => ({
  notes: [],
  updateNotes: notes => set({ notes: notes })
}))
