import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { notes } from '@/notes/notes.controller'

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(notes)

const start = async () => app.listen(PORT)

start()
