import type { TID } from './types'

const GLOBAL = 'http://localhost:5000'

export const ENDPOINTS = {
  ALL: GLOBAL + '/notes',
  CREATE: GLOBAL + '/notes',
  UPDATE: (id: TID) => `${GLOBAL}/notes/${id}`,
  DELETE: (id: TID) => `${GLOBAL}/notes/${id}`,
  GENERATE: (id: TID) => `${GLOBAL}/generate/${id}`
}
