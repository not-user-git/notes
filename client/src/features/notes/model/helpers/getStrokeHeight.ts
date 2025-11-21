import { useMemo } from 'react'

export const getStrokeHeight = (element: HTMLParagraphElement | null) =>
  useMemo(() => {
    if (element) {
      const paragraphStyles = window.getComputedStyle(element)
      return parseInt(paragraphStyles.lineHeight)
    }
    return null
  }, [element])
