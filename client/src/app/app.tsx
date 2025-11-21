import { twJoin } from 'tailwind-merge'

import { Header } from '@/features/header'
import { NotesPage } from '@/features/notes'

import { useMenuStore } from '@/shared/stores/menu.store'
import { useModal } from '@/shared/stores/modal/modal.store'

export const App = () => {
  const isModalOpen = useModal(state => state.isOpen)
  const closeAllMenu = useMenuStore(state => state.closeAll)

  return (
    <div
      className={twJoin('w-full h-dvh', 'flex flex-col')}
      inert={isModalOpen}
    >
      <Header />
      <main onClick={closeAllMenu} className='flex-1 pt-5 pb-3 overflow-hidden'>
        <NotesPage />
      </main>
    </div>
  )
}
