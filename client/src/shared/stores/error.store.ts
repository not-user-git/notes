import { create } from 'zustand'

type TErrorProps = {
  error: string | null
  setError: (error: string) => void
}

export const useErrorStore = create<TErrorProps>(set => ({
  error: null,
  setError: error => set({ error: error })
}))
