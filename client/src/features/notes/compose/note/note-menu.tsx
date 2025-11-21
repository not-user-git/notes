import type { FC } from 'react'
import type { LucideIcon } from 'lucide-react'

import { twJoin } from 'tailwind-merge'

import { motion } from 'motion/react'
import { Trash, Pencil, Info, Download } from 'lucide-react'

const menuAnimate = {
  initial: { opacity: 0, translateY: -5 },
  animate: { opacity: 1, translateY: 0, delay: 0.1 },
  exit: { opacity: 0, translateY: -8 },
  transition: { duration: 0.1 }
}

interface INoteMenuProps {
  onDelete: () => void
  onUpdate: () => void
  onInfo: () => void
  onGenerate: () => void
}

interface IMenuItem {
  text: string
  icon: LucideIcon
  handler: () => void
}

const MenuItem = ({ text, icon: Icon, handler }: IMenuItem) => {
  return (
    <li
      className={twJoin(
        'w-full',
        'border-t-1 border-neutral-100',
        'duration-50 delay-25'
      )}
    >
      <button
        type='button'
        className={twJoin(
          'w-full',
          'flex gap-6 justify-between items-center',
          'py-1 px-4',
          'cursor-pointer'
        )}
        onClick={handler}
      >
        <p className='text-gray-900 text-xs'>{text}</p>
        <Icon className='size-3.5 h-[1lh] text-neutral-600' />
      </button>
    </li>
  )
}

export const NoteMenu: FC<INoteMenuProps> = ({
  onDelete,
  onUpdate,
  onInfo,
  onGenerate
}) => {
  const data: IMenuItem[] = [
    {
      text: 'Инфо',
      icon: Info,
      handler: onInfo
    },
    {
      text: 'Удалить',
      icon: Trash,
      handler: onDelete
    },
    {
      text: 'Изменить',
      icon: Pencil,
      handler: onUpdate
    },
    {
      text: 'Скачать',
      icon: Download,
      handler: onGenerate
    }
  ]

  ;('*:hover:*:not-hover:opacity-40')
  return (
    <motion.section
      className={twJoin(
        'absolute top-0 right-1 min-w-[140px] z-10',
        'translate-y-[40%]',
        'bg-white',
        'border-1 border-neutral-200 rounded-lg',
        'cursor-default overflow-hidden'
      )}
      {...menuAnimate}
    >
      <ul
        className={twJoin(
          'flex flex-col items-start',
          '[&>:first-child]:border-none',
          'hover:*:not-hover:opacity-60'
        )}
      >
        {data.map((item, index) => (
          <MenuItem
            key={index}
            text={item.text}
            icon={item.icon}
            handler={item.handler}
          />
        ))}
      </ul>
    </motion.section>
  )
}
