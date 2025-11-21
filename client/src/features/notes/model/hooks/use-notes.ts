import { useQuery } from '@/shared/lib/mini-query'

import { getAllNotes } from '../api'

export const useNotes = () =>
  useQuery({
    queryFn: getAllNotes,
    keys: ['notes'],
    autoFetch: true
  })
