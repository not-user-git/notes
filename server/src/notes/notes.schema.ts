import type { INote } from './types'
import { Schema, model } from 'mongoose'

const NOTE_SCHEMA = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAT: { type: String, required: true },
  updatedAT: { type: String, required: true }
})

const notes = model('note', NOTE_SCHEMA, 'data')

export { notes }
