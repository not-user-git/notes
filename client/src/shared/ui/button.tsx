import type { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { MainLoaderSVG } from './main-loader-svg'

type TProps = {
  variant: 'primary' | 'delete' | 'line'
  fullWidth?: boolean
  autoHeight?: boolean
  isLoading?: boolean
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const after =
  'after:[] after:w-full after:h-[1px] after:absolute after:top-1/2 after:bg-neutral-300 after:z-[-1]'

const VARIANTS = {
  primary: 'text-white bg-neutral-700',
  delete: 'text-white bg-red-800',
  line: `text-neutral-700 relative ${after}`
}

export const Button: FC<TProps> = ({
  children,
  variant,
  fullWidth,
  autoHeight,
  isLoading,
  ...attr
}) => {
  return (
    <button
      {...attr}
      disabled={isLoading}
      className={twMerge(
        'min-w-10 h-9',
        'flex items-center justify-center',
        'text-[12px] font-semibold uppercase',
        'px-4 rounded-md cursor-pointer',

        'disabled:cursor-not-allowed',

        fullWidth && 'w-full',
        autoHeight && 'h-auto py-1',
        VARIANTS[variant]
      )}
    >
      {isLoading ? (
        <div className='size-5'>
          <MainLoaderSVG />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
