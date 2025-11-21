import type { FC } from 'react'
import { twJoin } from 'tailwind-merge'
import { formatDate } from '../model/helpers/formatDate'

export interface INoteInfoProps {
  title: string
  createdAT: string
  updatedAT: string
}

interface IInfo {
  head: string
  content: string
}

// const Info: FC<{ content: string }> = ({ content }) => (
//   <span className={twJoin('text-neutral-800 italic', 'ml-1')}>{content}</span>
// )

export const NoteInfo: FC<INoteInfoProps> = ({
  title,
  createdAT,
  updatedAT
}) => {
  const infos: IInfo[] = [
    {
      head: 'Заголовок',
      content: title
    },
    {
      head: 'Создано',
      content: formatDate(createdAT)
    },
    {
      head: 'Обновлено',
      content: formatDate(updatedAT)
    }
  ]

  return (
    <div className='w-[500px] pt-4 px-2'>
      <ul
        className={twJoin(
          '*:leading-[2.5] *:border-t-1 *:border-neutral-200 [&>:first-child]:border-none',
          '*:text-neutral-600'
        )}
      >
        {infos.map((info, index) => (
          <li key={index}>
            {info.head}:{' '}
            <span className={twJoin('text-neutral-800 italic', 'ml-1')}>
              {info.content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
