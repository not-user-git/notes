import { useCallback, type FC } from 'react'
import type { INote } from '@/shared/model/types'

import { NoteView } from './note.view'
import { NoteInfo } from '../../modal/note-info'
import { DeleteNote } from '../../modal/delete-note'
import { UpdateNoteForm } from '../../modal/update-note-form'
import { NoteGenerate } from '../../modal/note-generate'

import { useModal } from '@/shared/stores/modal/modal.store'
import { useMenuStore } from '@/shared/stores/menu.store'

export const Note: FC<INote> = note => {
  const openModal = useModal(state => state.openModal)
  const menuId = useMenuStore(state => state.id)
  const onOpen = useMenuStore(state => state.onOpen)

  const { _id: id, title, content, createdAT, updatedAT } = note

  const onInfo = useCallback(() => {
    openModal(
      <NoteInfo title={title} createdAT={createdAT} updatedAT={updatedAT} />,
      'Информация'
    )
  }, [title, createdAT, updatedAT])

  const onDelete = useCallback(() => {
    openModal(<DeleteNote _id={id} />, 'Вы уверены?')
  }, [id])

  const onUpdate = useCallback(() => {
    openModal(
      <UpdateNoteForm
        _id={id}
        title={title}
        content={content}
        createdAT={createdAT}
      />,
      'Обновить'
    )
  }, [id, title, content])

  const onGenerate = useCallback(() => {
    openModal(
      <NoteGenerate id={id as unknown as Pick<INote, '_id'>} />,
      'Обновить'
    )
  }, [id])

  return (
    <NoteView
      note={note}
      onInfo={onInfo}
      onDelete={onDelete}
      onUpdate={onUpdate}
      onGenerate={onGenerate}
      menuId={menuId}
      onMenuOpen={onOpen}
    />
  )
}
