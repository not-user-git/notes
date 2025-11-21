import type { INote } from '@/shared/model/types'
import type { FC } from 'react'
import { motion } from 'motion/react'
import { twJoin } from 'tailwind-merge'

import { pageAnimate } from '@/shared/animates'
import { Note } from './note'

interface INoteListProps {
  notes: INote[]
}

export const NotesList: FC<INoteListProps> = ({ notes }) => {
  return (
    <motion.div
      className={twJoin(
        'container-primary',
        'flex flex-col gap-4',
        'pb-[50px]'
      )}
      {...pageAnimate}
    >
      {notes.map(note => (
        <Note {...note} key={note._id} />
      ))}
    </motion.div>
  )
}
