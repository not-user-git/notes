import type { FC } from 'react'

import { motion } from 'motion/react'
import { pageAnimate } from '../animates'
import { twJoin } from 'tailwind-merge'

interface IInfo {
  content: string
}

const InfoPage: FC<IInfo> = ({ content }) => {
  return (
    <motion.div
      className={twJoin('w-full h-full', 'flex justify-center', 'pt-[280px]')}
      {...pageAnimate}
    >
      {content}
    </motion.div>
  )
}

export default InfoPage
