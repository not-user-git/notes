export interface INote {
  _id: string
  title: string
  content: string
  createdAT: string
  updatedAT: string
  isUpdated: boolean
}

export interface ICreateNote {
  title: string
  content: string
}

export type TID = Pick<INote, '_id'>
