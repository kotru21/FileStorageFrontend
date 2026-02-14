'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuthToken } from '@/shared/lib/use-auth-token'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const token = useAuthToken()

  useEffect(() => {
    if (token) {
      router.push('/folders/root')
    }
  }, [token, router])

  if (token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}
