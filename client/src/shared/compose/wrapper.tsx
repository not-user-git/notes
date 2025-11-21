import type { FC, ReactNode } from 'react'
import { AnimatePresence } from 'motion/react'

type TProps = {
  children: ReactNode
  isError: boolean
  isLoading: boolean
  errorElement: ReactNode
  loaderElement: ReactNode
}

export const Wrapper: FC<TProps> = ({
  children,
  isError,
  isLoading,
  errorElement,
  loaderElement
}) => {
  return (
    <AnimatePresence>
      {isError ? errorElement : isLoading ? loaderElement : children}
    </AnimatePresence>
  )
}
