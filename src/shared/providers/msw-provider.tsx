'use client'

import { useEffect, useState } from 'react'
import { API_MOCKING } from '@/shared/config/env'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(!API_MOCKING)

  useEffect(() => {
    if (!API_MOCKING) return

    async function initMSW() {
      const { worker } = await import('@/mocks/browser')
      await worker.start({
        onUnhandledRequest: 'bypass',
      })
      setIsReady(true)
    }

    initMSW()
  }, [])

  if (!isReady) {
    return <div>Инициализация моков...</div>
  }

  return <>{children}</>
}
