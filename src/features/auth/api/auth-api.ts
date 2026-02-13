import { apiClient } from '@/shared/api/client'

type AuthResponse = {
  user: { id: string; email: string; name: string }
  accessToken: string
  refreshToken: string
}

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    apiClient.post<AuthResponse>('/auth/register', { email, password, name }),
  logout: () =>
    apiClient.post('/auth/logout'),
}
