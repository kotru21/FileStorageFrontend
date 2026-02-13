import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authApi } from '@/features/auth/api/auth-api'

export function useAuth() {
  const router = useRouter()

  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: ({ data }) => {
      localStorage.setItem('accessToken', data.accessToken)
      router.push('/folders/root')
    },
  })

  const register = useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      authApi.register(email, password, name),
    onSuccess: ({ data }) => {
      localStorage.setItem('accessToken', data.accessToken)
      router.push('/folders/root')
    },
  })

  return { login, register }
}
