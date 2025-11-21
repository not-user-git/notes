import { useState, useEffect } from 'react'

interface IUseQuery<T, A> {
  queryFn: (body: T) => Promise<A>
  revalidate?: number
  delay?: number
}

export const useQuery = <T, A>({ queryFn }: IUseQuery<T, A>) => {
  const [data, setData] = useState<A | null>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const handler = async (body: T) => {
    setIsLoading(true)

    try {
      await queryFn(body)
        .then(data => setData(data))
        .catch(() => setIsError(true))
    } catch {
      setIsError(true)
    }
  }

  useEffect(() => {
    if (typeof data !== 'object' && Array.isArray(data)) {
      if (data?.length || isError) setIsLoading(false)
    } else {
      const result = data ? Object.keys(data).length : 0
      if (result || isError) setIsLoading(false)
    }

    return () => {
      setData(null)
      setIsError(false)
      setIsLoading(false)
    }
  }, [data, isError])

  return { isLoading, isError, data, handler }
}
