import type { INote } from '@/shared/model/types'

export type TCreate = Pick<INote, 'title' | 'content'>
export type TUpdate = Pick<INote, '_id' | 'title' | 'content' | 'createdAT'>
export type TGenerate = {
  id: Pick<INote, '_id'>
  type: 'generate' | 'download'
}
