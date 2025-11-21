import type { TID } from '@/shared/model/types'
import { useQuery } from '@/shared/model/use-query'
import { generateNote } from '../api'

export const useNoteGenerate = () =>
  useQuery<TID, Blob>({
    queryFn: generateNote
  })
