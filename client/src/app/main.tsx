import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import './index.css'

import { GlobalModal } from '@/shared/ui/modal/global-modal'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <GlobalModal />
  </StrictMode>
)
