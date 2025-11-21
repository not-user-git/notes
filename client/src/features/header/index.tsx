import { useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { useModal } from '@/shared/stores/modal/modal.store'

import { CreateNoteForm } from '../notes'

import { Logo } from '@/shared/ui/logo'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const Header = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const { openModal } = useModal()

  return (
    <header className={twJoin('w-full h-max', 'border-b-2 border-neutral-200')}>
      <div
        className={twJoin(
          'container-primary',
          'flex justify-between items-center'
        )}
      >
        <div className='size-16'>
          <Logo color='#000' className='size-full' />
        </div>

        <Input
          value={searchValue}
          setValue={setSearchValue}
          placeholder='Найти записку'
        />

        <Button
          variant='primary'
          onClick={() => openModal(<CreateNoteForm />, 'Создать записку')}
        >
          Создать
        </Button>
      </div>
    </header>
  )
}
