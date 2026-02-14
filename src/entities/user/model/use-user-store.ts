import { create } from 'zustand'
import { type User } from './types'

type UserStore = {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    localStorage.removeItem('accessToken')
    set({ user: null, isAuthenticated: false })
  },
}))
