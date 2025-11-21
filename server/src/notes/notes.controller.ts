import type { ObjectId } from 'mongoose'
import { Router } from 'express'
import notesService from './notes.service'

const notes = Router()

notes.get('/notes', (req, res) => {
  notesService
    .get()
    .then(notes => res.json(notes))
    .catch(error => res.status(400).json({ massage: error }))
})

notes.post('/notes', (req, res) => {
  const note = req.body

  notesService
    .create(note)
    .then(notes => res.json(notes))
    .catch(error => res.status(400).json({ massage: error }))
})

notes.put('/notes/:id', (req, res) => {
  const note = req.body
  const id = req.params.id

  notesService
    .update(id as unknown as ObjectId, note)
    .then(notes => res.json(notes))
    .catch(error => res.status(400).json({ massage: error }))
})

notes.delete('/notes/:id', (req, res) => {
  const id = req.params.id

  notesService
    .remove(id as unknown as ObjectId)
    .then(notes => res.json(notes))
    .catch(error => res.status(400).json({ massage: error }))
})

export { notes }
