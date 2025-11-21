import type { FC } from 'react'
import { motion } from 'motion/react'
import { pageAnimate } from '../animates'
import { twJoin } from 'tailwind-merge'
import { BadgeInfo } from 'lucide-react'
import { Button } from '../ui'

type TProps = {
  title: string
  info: string
  onRefetch: () => void
}

const ErrorPage: FC<TProps> = ({ title, info, onRefetch }) => {
  return (
    <motion.div className='w-full h-full' {...pageAnimate}>
      <div className='container-primary translate-y-[200%]'>
        <section className='mb-6'>
          <span className='flex justify-between'>
            <h5
              className={twJoin(
                'text-neutral-800 text-xl leading-none',
                'mb-5'
              )}
            >
              {title}
            </h5>
            <BadgeInfo className='text-neutral-500' />
          </span>
          <p className='text-neutral-800 leading-none'>{info}</p>
        </section>
        <Button fullWidth variant='primary' onClick={onRefetch}>
          Перезагрузить
        </Button>
      </div>
    </motion.div>
  )
}

export default ErrorPage
