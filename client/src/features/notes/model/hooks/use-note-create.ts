import { useMutation } from '@/shared/lib/mini-query'
import { createNote } from '../api'

export const useNoteCreate = () =>
  useMutation({
    mutationFn: createNote,
    keys: ['notes']
  })
