import type { FC, FormEvent } from 'react'

import { useState, useEffect } from 'react'
import { twJoin } from 'tailwind-merge'

import { useNoteCreate } from '../model'

import { useModal } from '@/shared/stores/modal/modal.store'
import { useNotesStore } from '@/shared/stores/notes.store'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Label } from '@/shared/ui/label'

export const CreateNoteForm: FC = () => {
  const { data, handler, isLoading, isError } = useNoteCreate()

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const updateNotes = useNotesStore(state => state.updateNotes)
  const closeModal = useModal(state => state.closeModal)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handler({ title, content })
  }

  useEffect(() => {
    if (data?.length && !isError) {
      updateNotes(data)
      closeModal()
    }
  }, [data, isError])

  return (
    <div className='w-[500px] my-2.5'>
      <form
        className={twJoin('w-full', 'flex flex-col gap-3', 'mb-4')}
        onSubmit={e => handleSubmit(e)}
      >
        <Label htmlFor='title'>Заголовок записки</Label>
        <Input
          fullWith
          value={title}
          setValue={setTitle}
          id='title'
          placeholder='Заголовок'
        />

        <Label htmlFor='content'>Контент записки</Label>
        <Textarea
          fullWith
          value={content}
          setValue={setContent}
          id='content'
          placeholder='Контент'
        />
        <Button variant='primary' isLoading={isLoading} type='submit' fullWidth>
          Создать
        </Button>
      </form>
    </div>
  )
}
