import { useEffect, useState } from 'react'

export function useApiCollection(url) {
  const [state, setState] = useState({
    items: [],
    count: 0,
    status: 'loading',
    error: '',
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setState((current) => ({ ...current, status: 'loading', error: '' }))

      try {
        const response = await fetch(url, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        const items = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload?.data)
              ? payload.data
              : null

        if (!items) {
          throw new Error('The API returned an unsupported response.')
        }

        setState({
          items,
          count: typeof payload?.count === 'number' ? payload.count : items.length,
          status: 'ready',
          error: '',
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({
            items: [],
            count: 0,
            status: 'error',
            error: error.message || 'Could not load this collection.',
          })
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [url, attempt])

  return {
    ...state,
    retry: () => setAttempt((current) => current + 1),
  }
}