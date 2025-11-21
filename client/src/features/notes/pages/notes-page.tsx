import { memo, lazy } from 'react'
import { AnimatePresence } from 'motion/react'

import { useNotes } from '../model'

import { NotesList } from '../compose/notes-list'
import { LoaderPage } from '@/shared/pages/loader-page'

const ErrorPage = lazy(() => import('@/shared/pages/error-page'))
const InfoPage = lazy(() => import('@/shared/pages/info-page'))

export const NotesPage = memo(() => {
  const { data: notes, isLoading, isError, refetch } = useNotes()

  return (
    <div className='container-primary h-full overflow-y-auto'>
      <AnimatePresence mode='wait'>
        {isError ? (
          <ErrorPage
            key='error'
            title='Не удалось загрузить данные!'
            info='Чтобы попробовать еще раз нажмите кнопку ниже'
            onRefetch={refetch}
          />
        ) : isLoading ? (
          <LoaderPage key='loader' />
        ) : notes?.length ? (
          <NotesList key='notes' notes={notes} />
        ) : (
          <InfoPage key='info' content='Создайте первую записку' />
        )}
      </AnimatePresence>
    </div>
  )
})
