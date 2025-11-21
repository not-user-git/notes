import { useMutation } from '@/shared/lib/mini-query'
import { deleteNote } from '../api'

export const useNoteDelete = () =>
  useMutation({
    mutationFn: deleteNote,
    keys: ['notes']
  })
