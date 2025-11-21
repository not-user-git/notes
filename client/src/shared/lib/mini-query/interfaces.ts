export const ACTION = {
  DATA: 'DATA',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  REFETCH: 'REFETCH',
  RESET: 'RESET'
} as const

export interface IQueryProps<TR> {
  queryFn: () => Promise<TR>
  autoFetch?: boolean
  revalidate?: number
  keys: string[]
}

export interface IQueryMutation<TB, TR> {
  mutationFn: (body: TB) => Promise<TR>
  revalidate?: number
  keys: string[]
}

export interface IInitialState<TR> {
  data: TR | null
  isLoading: boolean
  isError: boolean
}
