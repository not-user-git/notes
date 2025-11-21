import type { FC, MouseEvent } from 'react'

import { memo, useEffect, useState, useRef } from 'react'
import { twMerge, twJoin } from 'tailwind-merge'

import { getStrokeHeight } from '../../model/helpers/getStrokeHeight'

import { ChevronDown } from 'lucide-react'
import { Button } from '@/shared/ui'

interface INoteParagraphProps {
  content: string
  menuState: boolean
}

const SplittedParagraph: FC<Pick<INoteParagraphProps, 'content'>> = memo(
  ({ content }) => {
    const paragraphs = content.split('\n')

    return (
      <>
        {paragraphs.map((paragraph, index) =>
          paragraph.length ? (
            <p key={index}>{paragraph}</p>
          ) : (
            <span className='block h-[1px] mb-4' key={index}></span>
          )
        )}
      </>
    )
  }
)

export const NoteParagraph: FC<INoteParagraphProps> = ({
  content,
  menuState
}) => {
  const [isFullFormat, setIsFullFormat] = useState<boolean>(true)
  const [isCollapsible, setIsCollapsible] = useState<boolean>(false)

  const paragraphRef = useRef<HTMLParagraphElement>(null)

  const paragraph = paragraphRef.current
  const paragraphHeight = paragraph?.clientHeight ?? 0

  const neededHeight = (getStrokeHeight(paragraph) ?? 0) * 4

  useEffect(() => {
    setIsFullFormat(paragraphHeight >= neededHeight)
    setIsCollapsible(content.length > 250)
  }, [content])

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsFullFormat(!isFullFormat)
  }

  return (
    <div>
      <section
        ref={paragraphRef}
        className={twMerge(
          'text-neutral-700 leading-[1.25]',
          'pb-[1px]',
          'duration-100',

          isFullFormat && 'line-clamp-4 overflow-ellipsis',
          menuState ? 'delay-50' : 'opacity-30'
        )}
      >
        <SplittedParagraph content={content} />
      </section>

      {isCollapsible && (
        <Button
          onClick={e => handleClick(e)}
          fullWidth
          autoHeight
          variant='line'
        >
          <div
            className={twJoin(
              'min-h-6 px-4',
              'flex items-center justify-center',
              'bg-white'
            )}
          >
            <ChevronDown
              className={twMerge(
                'duration-75',
                'text-neutral-400',

                isFullFormat ? 'rotate-180' : 'rotate-0'
              )}
            />
          </div>
        </Button>
      )}
    </div>
  )
}
