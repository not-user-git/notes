import type { FC, ReactNode, LabelHTMLAttributes } from 'react'

type TProps = {
  children: ReactNode
} & LabelHTMLAttributes<HTMLLabelElement>

export const Label: FC<TProps> = ({ children, ...attr }) => {
  return (
    <label {...attr} className='text-neutral-800'>
      {children}
    </label>
  )
}
