'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { API_MOCKING } from '@/shared/config/env'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(!API_MOCKING)

  useEffect(() => {
    if (!API_MOCKING) return

    async function initMSW() {
      const { worker } = await import('@/mocks/browser')

      // Ждём полной инициализации Service Worker
      await worker.start({
        onUnhandledRequest: 'warn', // Показываем предупреждения в консоли
        quiet: false, // Показываем логи MSW
      })

      // eslint-disable-next-line no-console -- MSW startup diagnostics
      console.log('[MSW] Worker started successfully')
      setIsReady(true)
    }

    initMSW().catch((error) => {
      console.error('[MSW] Failed to start:', error)
      setIsReady(true) // Всё равно продолжаем, чтобы не блокировать UI
    })
  }, [])

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Инициализация API моков...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
