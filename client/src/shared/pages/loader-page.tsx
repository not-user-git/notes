import { motion } from 'motion/react'
import { pageAnimate } from '../animates'
import { twJoin } from 'tailwind-merge'
import { MainLoaderSVG } from '../ui'

export const LoaderPage = () => {
  return (
    <motion.div
      className={twJoin('w-full h-full', 'flex justify-center')}
      {...pageAnimate}
    >
      <div className={twJoin('size-10', 'translate-y-[17rem]')}>
        <MainLoaderSVG />
      </div>
    </motion.div>
  )
}
