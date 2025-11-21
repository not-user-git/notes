import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { notes } from '@/notes/notes.controller'

const app = express()

const DB_LINK = process.env.DB_LINK ?? ''
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(notes)

const start = async () => {
  try {
    app.listen(PORT)
    await connect(DB_LINK)
  } catch (error) {
    console.log(error)
  }
}

start()
