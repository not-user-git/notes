import { useMutation } from '@/shared/lib/mini-query'
import { updateNote } from '../api'

export const useNoteUpdate = () =>
  useMutation({
    mutationFn: updateNote,
    keys: ['notes']
  })
