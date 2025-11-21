import type { IQueryProps, IQueryMutation, IInitialState } from './interfaces'
import type { TDataAction } from './types'

import { useEffect, useReducer } from 'react'

import { Cache } from './cache'

export class MiniQuery {
  cache: Cache

  constructor() {
    this.cache = new Cache()
  }

  private reducer = <TR>(
    state: IInitialState<TR>,
    action: TDataAction<TR>
  ): IInitialState<TR> => {
    const initialState: IInitialState<TR> = {
      data: null,
      isLoading: false,
      isError: false
    }

    switch (action.type) {
      case 'DATA':
        return {
          ...state,
          data: action.payload
        }
      case 'LOADING':
        return {
          ...state,
          isLoading: typeof action.payload === 'boolean' && action.payload
        }
      case 'ERROR':
        return {
          ...state,
          isError: typeof action.payload === 'boolean' && action.payload
        }
      case 'REFETCH':
        return {
          ...initialState,
          isLoading: true
        }
      case 'RESET':
        return initialState
      default:
        return initialState
    }
  }

  useQuery = <TR>({ queryFn, keys, autoFetch }: IQueryProps<TR>) => {
    const initialState: IInitialState<TR> = {
      data: null,
      isLoading: false,
      isError: false
    }

    const [state, dispatch] = useReducer(
      (s: IInitialState<TR>, a: TDataAction<TR>) => this.reducer(s, a),
      initialState
    )
    const { data, isLoading, isError } = state

    const handler = async () => {
      dispatch({ type: 'LOADING', payload: true })

      await queryFn()
        .then(data => {
          dispatch({ type: 'DATA', payload: data })
          dispatch({ type: 'LOADING', payload: false })
        })
        .catch(() => dispatch({ type: 'ERROR', payload: true }))
    }

    const fetch = () => {
      try {
        handler()
      } catch {
        dispatch({ type: 'ERROR', payload: true })
      }
    }

    const refetch = () => {
      dispatch({ type: 'REFETCH' })
      fetch()
    }

    useEffect(() => {
      if (autoFetch) handler()
      return () => dispatch({ type: 'RESET' })
    }, [])

    return { data, isLoading, isError, refetch }
  }

  useMutation = <TB, TR>({ mutationFn, keys }: IQueryMutation<TB, TR>) => {
    const initialState: IInitialState<TR> = {
      data: null,
      isLoading: false,
      isError: false
    }

    const [state, dispatch] = useReducer(
      (s: IInitialState<TR>, a: TDataAction<TR>) => this.reducer(s, a),
      initialState
    )
    const { data, isLoading, isError } = state

    const handler = async (body: TB) => {
      dispatch({ type: 'LOADING', payload: true })

      try {
        await mutationFn(body)
          .then(data => dispatch({ type: 'DATA', payload: data }))
          .catch(() => dispatch({ type: 'ERROR', payload: true }))
      } catch {
        dispatch({ type: 'ERROR', payload: true })
      }
    }

    useEffect(() => {
      if (typeof data !== 'object' && Array.isArray(data)) {
        if (data?.length || isError)
          dispatch({ type: 'LOADING', payload: false })
      } else {
        const result = data ? Object.keys(data).length : 0
        if (result || isError) dispatch({ type: 'LOADING', payload: false })
      }

      return () => dispatch({ type: 'RESET' })
    }, [data, isError])

    return { data, isLoading, isError, handler }
  }
}
