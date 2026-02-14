'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useAuth } from '../model/use-auth'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) return

    register.mutate({ email, password, name })
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Регистрация</h1>
        <p className="text-muted-foreground mt-2">
          Создайте аккаунт для использования файлового хранилища
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Имя
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Иван Иванов"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={register.isPending}
            required
          />
        </div>

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
            disabled={register.isPending}
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
            disabled={register.isPending}
            required
            minLength={6}
          />
          <p className="text-xs text-muted-foreground">
            Минимум 6 символов
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={register.isPending || !name.trim() || !email.trim() || !password.trim()}
        >
          {register.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Войти
        </Link>
      </p>
    </div>
  )
}
