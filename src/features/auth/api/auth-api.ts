import { apiClient } from '@/shared/api/client'
import { type AuthResponse } from '@/entities/user'

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    apiClient.post<AuthResponse>('/auth/register', { email, password, name }),
  logout: () =>
    apiClient.post('/auth/logout'),
}
