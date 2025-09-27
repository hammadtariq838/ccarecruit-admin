import { useEffect, useRef } from 'react'

export const useInterval = <T extends () => void>(
  callback: T,
  delay: number
) => {
  const savedCallback = useRef<T | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
