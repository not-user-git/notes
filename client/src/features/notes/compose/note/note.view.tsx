import type { FC, MouseEvent } from 'react'
import type { INote } from '@/shared/model/types'

import { useEffect, useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

import { EllipsisVertical } from 'lucide-react'
import { AnimatePresence } from 'motion/react'

import { NoteMenu } from './note-menu'
import { NoteParagraph } from './note-paragraph'

type TFn = () => void

interface INoteViewProps {
  note: INote
  onInfo: TFn
  onDelete: TFn
  onUpdate: TFn
  onGenerate: TFn
  menuId: string | null
  onMenuOpen: (id: string) => void
}

export const NoteView: FC<INoteViewProps> = ({
  note,
  onInfo,
  onDelete,
  onUpdate,
  onGenerate,
  menuId,
  onMenuOpen
}) => {
  const [isMenuHide, setIsMenuHide] = useState<boolean>(true)

  const { _id: id, title, content } = note

  useEffect(() => {
    if (menuId) {
      if (menuId !== id) setIsMenuHide(true)
      else setIsMenuHide(false)
    } else setIsMenuHide(true)
  }, [menuId])

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (menuId === id) setIsMenuHide(true)
    onMenuOpen(id)
  }

  return (
    <section
      className={twMerge(
        'relative',
        'p-4 border-2 border-neutral-200 rounded-lg',
        'duration-100',

        !isMenuHide && 'border-neutral-400'
      )}
    >
      <div
        className={twJoin(
          'w-full',
          'flex justify-between items-center',
          'mb-2.5'
        )}
      >
        <h4 className='text-xl text-neutral-800 leading-normal'>{title}</h4>

        <button
          className={twJoin(
            'size-8',
            'flex justify-center items-center',
            'translate-x-2',
            'cursor-pointer'
          )}
          onClick={e => handleMenuOpen(e)}
        >
          <EllipsisVertical className='size-5 text-neutral-600' />
        </button>
        <AnimatePresence>
          {!isMenuHide && (
            <NoteMenu
              onInfo={onInfo}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onGenerate={onGenerate}
            />
          )}
        </AnimatePresence>
      </div>

      <NoteParagraph menuState={isMenuHide} content={content} />
    </section>
  )
}
