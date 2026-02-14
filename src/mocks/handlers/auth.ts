import { http, HttpResponse, delay } from 'msw'
import { db, persistUsers } from '../data/db'

const BASE = process.env.NEXT_PUBLIC_API_URL + '/api/v1'

export const authHandlers = [
  // POST /auth/register — регистрация нового пользователя
  http.post(`${BASE}/auth/register`, async ({ request }) => {
    await delay(300)

    const body = (await request.json()) as {
      email: string
      password: string
      name: string
    }

    // Проверяем, не занят ли email
    const existing = db.users.find((u) => u.email === body.email)
    if (existing) {
      return HttpResponse.json(
        { message: 'Email уже зарегистрирован' },
        { status: 409 },
      )
    }

    // Создаём пользователя
    const newUser = {
      id: `user_${crypto.randomUUID().slice(0, 8)}`,
      email: body.email,
      name: body.name,
      password: body.password,
    }
    db.users.push(newUser)
    persistUsers() // Сохраняем в localStorage

    // Генерируем токен и сохраняем в Map
    const accessToken = `token_${crypto.randomUUID()}`
    const refreshToken = `refresh_${crypto.randomUUID()}`
    db.tokens.set(accessToken, newUser.id)

    return HttpResponse.json(
      {
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
        accessToken,
        refreshToken,
      },
      { status: 201 },
    )
  }),

  // POST /auth/login — вход по email + password
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    await delay(300)

    const body = (await request.json()) as {
      email: string
      password: string
    }

    const user = db.users.find(
      (u) => u.email === body.email && u.password === body.password,
    )

    if (!user) {
      return HttpResponse.json(
        { message: 'Неверный email или пароль' },
        { status: 401 },
      )
    }

    const accessToken = `token_${crypto.randomUUID()}`
    const refreshToken = `refresh_${crypto.randomUUID()}`
    db.tokens.set(accessToken, user.id)

    return HttpResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
    })
  }),

  // POST /auth/logout — выход
  http.post(`${BASE}/auth/logout`, async ({ request }) => {
    await delay(100)

    const authHeader = request.headers.get('Authorization')
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      db.tokens.delete(token)
    }

    return HttpResponse.json({ success: true })
  }),
]
