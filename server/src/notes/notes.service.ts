import type { ObjectId } from 'mongoose'
import type { INote } from './types'

import { notes } from './notes.schema'

class NotesService {
  date: Date
  constructor() {
    this.date = new Date()
  }

  get = async () => {
    try {
      return await notes.find()
    } catch {
      return new Error('Ошибка при получении!')
    }
  }

  create = async (note: INote) => {
    if (note) {
      const creationNote: INote = {
        ...note,
        createdAT: this.date.toISOString(),
        updatedAT: this.date.toISOString()
      }

      try {
        return await notes.create(creationNote)
      } catch {
        return new Error('Ошибка при создании!')
      }
    } else return new Error('Записка не передана или передана с ошибкой')
  }

  update = async (id: ObjectId, note: INote) => {
    if (note) {
      const updatedNote: INote = {
        ...note,
        updatedAT: this.date.toISOString()
      }

      try {
        return await notes.replaceOne({ _id: id }, updatedNote)
      } catch {
        throw new Error('Ошибка при обновлении!')
      }
    } else throw new Error('Записка не передана или передана с ошибкой')
  }

  remove = async (id: ObjectId) => {
    if (id) {
      try {
        return await notes.findByIdAndDelete(id)
      } catch {
        return new Error('Ошибка при удалении!')
      }
    } else return new Error('id не передана или передана с ошибкой')
  }
}

export default new NotesService()