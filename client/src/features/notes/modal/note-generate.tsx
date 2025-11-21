import type { FC } from 'react'
import type { INote } from '@/shared/model/types'

import { useEffect } from 'react'

import { useNoteGenerate } from '../model/hooks/use-note-generate'

import { Button } from '@/shared/ui'

export const NoteGenerate: FC<{ id: Pick<INote, '_id'> }> = ({ id }) => {
  const { data, handler } = useNoteGenerate()

  useEffect(() => {
    if (data && data.size > 0) {
      const url = URL.createObjectURL(data)
      window.open(url, '_blank')
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    }
  }, [data])
  return (
    <Button variant='primary' onClick={() => handler(id)}>
      Скачать
    </Button>
  )
}
