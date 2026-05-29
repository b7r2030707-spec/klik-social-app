import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error('فشل تسجيل الدخول')
      const data = await response.json()
      set({ user: data.user, token: data.token, isLoading: false })
      localStorage.setItem('token', data.token)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })
      if (!response.ok) throw new Error('فشل التسجيل')
      const data = await response.json()
      set({ user: data.user, token: data.token, isLoading: false })
      localStorage.setItem('token', data.token)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem('token')
  },
  setUser: (user: User) => set({ user }),
  clearError: () => set({ error: null }),
}))
