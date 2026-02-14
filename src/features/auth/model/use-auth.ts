'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authApi } from '@/features/auth/api/auth-api'
import { useUserStore } from '@/entities/user'

export function useAuth() {
  const router = useRouter()
  const { setUser, logout: logoutStore } = useUserStore()

  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: ({ data }) => {
      localStorage.setItem('accessToken', data.accessToken)
      setUser(data.user)
      toast.success('Добро пожаловать!', {
        description: `Вы вошли как ${data.user.email}`,
      })
      router.push('/folders/root')
    },
    onError: (error: Error) => {
      console.error('Login error:', error)
    },
  })

  const register = useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      authApi.register(email, password, name),
    onSuccess: ({ data }) => {
      localStorage.setItem('accessToken', data.accessToken)
      setUser(data.user)
      toast.success('Регистрация успешна!', {
        description: `Добро пожаловать, ${data.user.name}!`,
      })
      router.push('/folders/root')
    },
    onError: (error: Error) => {
      console.error('Register error:', error)
    },
  })

  const logout = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logoutStore()
      toast.success('Вы вышли из системы')
      router.push('/login')
    },
    onError: (error: Error) => {
      // Даже при ошибке выходим локально
      logoutStore()
      router.push('/login')
      console.error('Logout error:', error)
    },
  })

  return { login, register, logout }
}
