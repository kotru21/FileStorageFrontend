

```markdown
# CLAUDE.md — Гайдлайны проекта

## Проект

Файловое хранилище. Фронтенд на Next.js (App Router).
Пользователь может загружать, скачивать, перемещать, удалять файлы и папки.

## Стек

- Next.js 16 (App Router)
- TypeScript (strict mode)
- React 19
- Tailwind CSS 4
- shadcn/ui — UI-компоненты
- Lucide React — иконки
- TanStack Query — серверный стейт
- Zustand — клиентский стейт (модалки, выделение, UI)
- Axios — HTTP-клиент
- React Dropzone — drag & drop загрузка
- next-themes — тёмная тема
- MSW (Mock Service Worker) — мок API на время разработки

## Архитектура — Feature-Sliced Design

```
src/
├── app/                              ← Next.js App Router (только роутинг и providers)
│   ├── (auth)/
│   │   ├── login/page.tsx            ← рендерит <LoginPage />
│   │   └── register/page.tsx         ← рендерит <RegisterPage />
│   ├── (main)/
│   │   ├── layout.tsx                ← рендерит <MainLayout />
│   │   ├── page.tsx                  ← редирект на /folders/root
│   │   └── folders/
│   │       └── [folderId]/
│   │           └── page.tsx          ← рендерит <FolderPage />
│   ├── layout.tsx                    ← <Providers />
│   └── globals.css
│
├── pages/                            ← FSD: композиция страниц
│   ├── login/
│   │   ├── ui/
│   │   │   └── login-page.tsx
│   │   └── index.ts
│   ├── register/
│   │   ├── ui/
│   │   │   └── register-page.tsx
│   │   └── index.ts
│   └── folder/
│       ├── ui/
│       │   └── folder-page.tsx       ← собирает виджеты и фичи
│       └── index.ts
│
├── widgets/                          ← крупные составные блоки
│   ├── sidebar/
│   │   ├── ui/
│   │   │   └── sidebar.tsx
│   │   └── index.ts
│   ├── header/
│   │   ├── ui/
│   │   │   ├── header.tsx
│   │   │   └── breadcrumbs.tsx
│   │   └── index.ts
│   ├── file-grid/
│   │   ├── ui/
│   │   │   ├── file-grid.tsx
│   │   │   └── file-list.tsx
│   │   └── index.ts
│   ├── upload-progress/
│   │   ├── ui/
│   │   │   └── upload-progress.tsx
│   │   └── index.ts
│   └── main-layout/
│       ├── ui/
│       │   └── main-layout.tsx
│       └── index.ts
│
├── features/                         ← действия пользователя
│   ├── auth/
│   │   ├── ui/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── model/
│   │   │   └── use-auth.ts
│   │   ├── api/
│   │   │   └── auth-api.ts
│   │   └── index.ts
│   ├── upload-file/
│   │   ├── ui/
│   │   │   └── upload-zone.tsx
│   │   ├── model/
│   │   │   ├── use-upload.ts
│   │   │   └── upload-store.ts
│   │   └── index.ts
│   ├── create-folder/
│   │   ├── ui/
│   │   │   └── create-folder-modal.tsx
│   │   ├── model/
│   │   │   └── use-create-folder.ts
│   │   └── index.ts
│   ├── rename-item/
│   │   ├── ui/
│   │   │   └── rename-modal.tsx
│   │   ├── model/
│   │   │   └── use-rename.ts
│   │   └── index.ts
│   ├── move-item/
│   │   ├── ui/
│   │   │   └── move-modal.tsx
│   │   ├── model/
│   │   │   └── use-move.ts
│   │   └── index.ts
│   ├── delete-item/
│   │   ├── ui/
│   │   │   └── delete-confirm-modal.tsx
│   │   ├── model/
│   │   │   └── use-delete.ts
│   │   └── index.ts
│   ├── download-file/
│   │   ├── model/
│   │   │   └── use-download.ts
│   │   └── index.ts
│   └── context-menu/
│       ├── ui/
│       │   └── item-context-menu.tsx
│       └── index.ts
│
├── entities/                         ← бизнес-сущности
│   ├── file/
│   │   ├── ui/
│   │   │   └── file-card.tsx
│   │   ├── model/
│   │   │   └── types.ts
│   │   ├── api/
│   │   │   └── file-api.ts
│   │   ├── lib/
│   │   │   └── format-size.ts
│   │   └── index.ts
│   ├── folder/
│   │   ├── ui/
│   │   │   └── folder-card.tsx
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── use-folder-contents.ts
│   │   ├── api/
│   │   │   └── folder-api.ts
│   │   └── index.ts
│   └── user/
│       ├── model/
│       │   └── types.ts
│       └── index.ts
│
├── shared/                           ← общее
│   ├── api/
│   │   └── client.ts                 ← axios instance + interceptors
│   ├── ui/                           ← shadcn/ui компоненты
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── skeleton.tsx
│   │   └── sonner.tsx
│   ├── lib/
│   │   └── utils.ts                  ← cn() и прочее
│   ├── config/
│   │   └── env.ts                    ← NEXT_PUBLIC_API_URL и т.д.
│   └── providers/
│       └── providers.tsx             ← QueryClient, ThemeProvider
│
└── mocks/                            ← MSW моки
    ├── handlers/
    │   ├── auth.ts
    │   ├── files.ts
    │   └── folders.ts
    ├── data/
    │   └── db.ts                     ← in-memory хранилище
    ├── browser.ts                    ← setupWorker
    └── index.ts                      ← init функция
```

## FSD правила

### Импорты — только сверху вниз

```
app → pages → widgets → features → entities → shared
```

- shared НЕ импортирует из entities
- entities НЕ импортирует из features
- features НЕ импортирует из widgets
- widgets НЕ импортирует из pages
- Слои одного уровня НЕ импортируют друг друга
  (исключение: features могут использовать entities)

### Public API

Каждый слайс экспортирует только через index.ts:

```ts
// features/create-folder/index.ts
export { CreateFolderModal } from './ui/create-folder-modal'
export { useCreateFolder } from './model/use-create-folder'
```

```ts
// Импорт — только из index.ts
import { CreateFolderModal } from '@/features/create-folder'

// НЕЛЬЗЯ:
import { CreateFolderModal } from '@/features/create-folder/ui/create-folder-modal'
```

### Алиасы путей (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Mock API (MSW)

### Принцип

MSW перехватывает HTTP-запросы на уровне Service Worker.
Код приложения не знает о моках — axios делает обычные запросы,
MSW их перехватывает и возвращает моковые данные.
Когда бэкенд будет готов — просто убираем MSW.

### Включение

```ts
// shared/config/env.ts
export const API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === 'true'
```

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_MOCKING=true
```

### Инициализация

```ts
// mocks/index.ts
export async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}
```

```ts
// mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

```tsx
// shared/providers/providers.tsx
'use client'

import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { API_MOCKING } from '@/shared/config/env'

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!API_MOCKING)

  useEffect(() => {
    if (API_MOCKING) {
      initMocks().then(() => setReady(true))
    }
  }, [])

  if (!ready) return null

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### In-memory база

```ts
// mocks/data/db.ts
// Хранит данные в памяти, сбрасывается при перезагрузке

import { FileItem, Folder, User } from '@/entities/...'

type MockDB = {
  users: User[]
  folders: Folder[]
  files: FileItem[]
  tokens: Map<string, string>  // token → userId
}

export const db: MockDB = {
  users: [],
  folders: [
    {
      id: 'root',
      name: 'Мои файлы',
      parentId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  files: [],
  tokens: new Map(),
}

// Заполни тестовыми данными: 3-4 папки, 5-6 файлов разных типов
```

### Хендлеры

```ts
// mocks/handlers/folders.ts
import { http, HttpResponse, delay } from 'msw'

const BASE = process.env.NEXT_PUBLIC_API_URL + '/api/v1'

export const folderHandlers = [
  // GET /folders/:id
  http.get(`${BASE}/folders/:id`, async ({ params }) => {
    await delay(300) // имитация сети
    const folder = db.folders.find(f => f.id === params.id)
    if (!folder) return HttpResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Папка не найдена' } },
      { status: 404 }
    )
    const folders = db.folders.filter(f => f.parentId === params.id)
    const files = db.files.filter(f => f.folderId === params.id)
    return HttpResponse.json({ folder, folders, files })
  }),

  // POST /folders
  http.post(`${BASE}/folders`, async ({ request }) => {
    await delay(200)
    const body = await request.json()
    const newFolder = {
      id: `fld_${crypto.randomUUID().slice(0, 8)}`,
      name: body.name,
      parentId: body.parentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    db.folders.push(newFolder)
    return HttpResponse.json(newFolder, { status: 201 })
  }),

  // ... PATCH, DELETE аналогично
]
```

```ts
// mocks/handlers/index.ts
export const handlers = [
  ...authHandlers,
  ...folderHandlers,
  ...fileHandlers,
]
```

### Моки загрузки файлов

```ts
// mocks/handlers/files.ts
http.post(`${BASE}/files/upload`, async ({ request }) => {
  await delay(500)
  const formData = await request.formData()
  const file = formData.get('file') as File
  const folderId = formData.get('folderId') as string

  const newFile = {
    id: `file_${crypto.randomUUID().slice(0, 8)}`,
    name: file.name,
    mimeType: file.type,
    size: file.size,
    folderId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  db.files.push(newFile)

  return HttpResponse.json({ files: [newFile] }, { status: 201 })
}),
```

## Типы

```ts
// entities/user/model/types.ts
export type User = {
  id: string
  email: string
  name: string
}

// entities/file/model/types.ts
export type FileItem = {
  id: string
  name: string
  mimeType: string
  size: number
  folderId: string
  createdAt: string
  updatedAt: string
}

// entities/folder/model/types.ts
export type Folder = {
  id: string
  name: string
  parentId: string | null
  createdAt: string
  updatedAt: string
}

export type FolderContents = {
  folder: Folder
  folders: Folder[]
  files: FileItem[]
}

// features/auth/model/types.ts
export type AuthResponse = {
  user: User
  accessToken: string
  refreshToken: string
}
```

## Правила кода

### Общие
- TypeScript strict, без `any`
- Компоненты — named export, function components
- Файлы — kebab-case
- Один компонент — один файл
- Не делай преждевременных оптимизаций

### Компоненты
- shadcn/ui для всех базовых UI элементов
- Иконки — только lucide-react
- Loading → Skeleton, действия → disabled + spinner
- Empty state когда папка пустая

### TanStack Query
- Хуки запросов — в model/ соответствующего слайса
- Ключи: ["folder", folderId], ["file", fileId]
- После мутаций — invalidate ["folder", currentFolderId]
- Optimistic updates для rename и delete

### Zustand
- Только UI-стейт: модалки, view mode, выделение
- Серверные данные — только в TanStack Query

### Навигация
- Клик по папке → router.push(`/folders/${folderId}`)
- Breadcrumbs в header

## Когда отключить моки

Когда бэкенд готов:

1. В `.env.local` поставить `NEXT_PUBLIC_API_MOCKING=false`
2. Указать реальный URL в `NEXT_PUBLIC_API_URL`
3. Всё. Код приложения менять не нужно.
```

---

## Промпты для Claude Code

```
1. "Инициализируй Next.js 16 проект с TypeScript, Tailwind CSS 4.
    Установи зависимости из CLAUDE.md.
    Настрой shadcn/ui.
    Создай структуру папок по FSD."

2. "Создай типы в entities/*/model/types.ts.
    Создай axios клиент в shared/api/client.ts.
    Создай API функции в entities/file/api, entities/folder/api
    и features/auth/api."

3. "Настрой MSW: создай mocks/ с in-memory DB,
    хендлерами для auth, folders, files.
    Заполни тестовыми данными.
    Подключи в providers."

4. "Создай features/auth — формы логина и регистрации.
    Создай pages/login и pages/register.
    Подключи в app/(auth)/."

5. "Создай widgets/sidebar, widgets/header, widgets/main-layout.
    Подключи в app/(main)/layout.tsx."

6. "Создай entities/folder/ui/folder-card,
    entities/file/ui/file-card,
    widgets/file-grid.
    Создай pages/folder и подключи в app/(main)/folders/[folderId]."

7. "Создай features/create-folder с модалкой и мутацией."

8. "Создай features/upload-file с drag & drop зоной
    и widgets/upload-progress."

9. "Создай features/rename-item, delete-item, download-file.
    Создай features/context-menu — правый клик по файлу/папке."

10. "Добавь переключение grid/list view и тёмную тему."
```