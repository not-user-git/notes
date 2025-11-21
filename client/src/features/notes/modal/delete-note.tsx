import type { FC } from 'react'
import type { TID } from '@/shared/model/types'

import { useEffect } from 'react'
import { twJoin } from 'tailwind-merge'

import { Button } from '@/shared/ui'

import { useNoteDelete } from '../model'

import { useModal } from '@/shared/stores/modal/modal.store'

export const DeleteNote: FC<TID> = ({ _id: id }) => {
  const { data, handler, isError, isLoading } = useNoteDelete()

  const closeModal = useModal(state => state.closeModal)

  useEffect(() => {
    if (!isError) closeModal()
  }, [data, isError])

  return (
    <div className={twJoin('w-[280px]', 'flex justify-center gap-6', 'py-4')}>
      <Button
        variant='delete'
        isLoading={isLoading}
        onClick={() => handler(id as unknown as TID)}
      >
        Удалить
      </Button>
      <Button variant='primary' onClick={closeModal}>
        Оставить
      </Button>
    </div>
  )
}
