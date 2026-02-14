import axios from 'axios'
import { toast } from 'sonner'
import { API_URL } from '@/shared/config/env'

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// обрабатка ошибок для всех запросов, которые не имеют своего onError
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // ошибка произошла на клиенте
    if (typeof window === 'undefined') {
      return Promise.reject(error)
    }

    // Network error
    if (!error.response) {
      toast.error('Ошибка сети', {
        description: 'Проверьте подключение к интернету',
      })
      return Promise.reject(error)
    }

    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    switch (status) {
      case 401:
        // Unauthorized
        localStorage.removeItem('accessToken')
        if (window.location.pathname !== '/login') {
          toast.error('Сессия истекла', {
            description: 'Пожалуйста, войдите снова',
          })
          window.location.href = '/login'
        }
        break

      case 403:
        toast.error('Доступ запрещён', {
          description: 'У вас нет прав для выполнения этого действия',
        })
        break

      case 404:
        // 404 обрабатываем в конкретных местах, не показываем глобальный toast
        break

      case 500:
      case 502:
      case 503:
        toast.error('Ошибка сервера', {
          description: 'Попробуйте позже',
        })
        break

      default:
        // Для остальных ошибок  сообщение от сервера
        if (status >= 400 && status < 500) {
          toast.error('Ошибка', {
            description: message,
          })
        }
    }

    return Promise.reject(error)
  }
)
