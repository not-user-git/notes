import { useState, useEffect } from 'react'

interface IFetchProps<T> {
  fetchFn: () => Promise<T>
  autoFetch?: boolean
  revalidate?: number
}

export const useFetch = <T>({ fetchFn, autoFetch }: IFetchProps<T>) => {
  const [data, setData] = useState<T | null>()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handler = async () =>
    await fetchFn()
      .then(data => {
        setData(data)
        setIsLoading(false)
      })
      .catch(() => setIsError(true))

  const fetch = () => {
    try {
      handler()
    } catch {
      setIsError(true)
    }
  }

  const refetch = () => {
    setData(null)
    setIsError(false)
    setIsLoading(true)

    fetch()
  }

  useEffect(() => {
    if (autoFetch) handler()
    return () => {
      setData(null)
      setIsLoading(true)
      setIsError(false)
    }
  }, [])

  return { data, isLoading, isError, refetch }
}
