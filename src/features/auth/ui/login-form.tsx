'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useAuth } from '../model/use-auth'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    login.mutate({ email, password })
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Вход</h1>
        <p className="text-muted-foreground mt-2">
          Войдите в свой аккаунт для продолжения
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={login.isPending}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Пароль
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={login.isPending}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={login.isPending || !email.trim() || !password.trim()}
        >
          {login.isPending ? 'Вход...' : 'Войти'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Нет аккаунта?{' '}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  )
}
