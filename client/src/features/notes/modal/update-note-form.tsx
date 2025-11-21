import type { FC } from 'react'
import type { TUpdate } from '../model/types'

import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { useNoteUpdate } from '../model'

import { useNotesStore } from '@/shared/stores/notes.store'
import { useModal } from '@/shared/stores/modal/modal.store'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Label } from '@/shared/ui/label'

export const UpdateNoteForm: FC<TUpdate> = ({
  _id: id,
  title: prevTitle,
  content: prevContent,
  createdAT
}) => {
  const [title, setTitle] = useState<string>(prevTitle)
  const [content, setContent] = useState<string>(prevContent)

  const closeModal = useModal(state => state.closeModal)

  const { data, handler, isError, isLoading } = useNoteUpdate()

  useEffect(() => {
    if (!isError) {
      closeModal()
    }
  }, [data, isError])

  return (
    <div className='w-[500px] my-2.5'>
      <form
        className={twJoin('w-full', 'flex flex-col gap-3', 'mb-2')}
        onSubmit={e => {
          e.preventDefault()
          handler({ _id: id, title, content, createdAT })
        }}
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
        <Button variant='primary' type='submit' isLoading={isLoading} fullWidth>
          Изменить
        </Button>
      </form>
    </div>
  )
}
