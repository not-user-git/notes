import type { INote, TID } from '@/shared/model/types'
import type { TCreate, TUpdate } from './types'

import { ENDPOINTS } from '@/shared/model/endpoints'

export const getAllNotes: () => Promise<INote[]> = () =>
  fetch(ENDPOINTS.ALL, { cache: 'no-cache' }).then(res => res.json())

export const createNote = async (body: TCreate): Promise<INote> => {
  const { title, content } = body
  return await fetch(ENDPOINTS.CREATE, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  }).then(res => res.json())
}

export const updateNote = async (body: TUpdate): Promise<INote> => {
  const { _id: id, title, content, createdAT } = body
  return await fetch(ENDPOINTS.UPDATE(id as unknown as TID), {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ title, content, createdAT })
  }).then(res => res.json())
}

export const deleteNote = (id: TID): Promise<INote> =>
  fetch(ENDPOINTS.DELETE(id), { method: 'DELETE' }).then(note => note.json())

export const generateNote = (id: TID): Promise<Blob> =>
  fetch(ENDPOINTS.GENERATE(id), { method: 'GET' }).then(res => res.blob())
