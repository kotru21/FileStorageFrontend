import { http, HttpResponse, delay } from 'msw'
import { db } from '../data/db'

const BASE = process.env.NEXT_PUBLIC_API_URL + '/api/v1'

export const fileHandlers = [
  // DELETE /files/:id — удалить файл
  http.delete(`${BASE}/files/:id`, async ({ params }) => {
    await delay(200)

    const index = db.files.findIndex((f) => f.id === params.id)
    if (index === -1) {
      return HttpResponse.json(
        { error: { code: 'FILE_NOT_FOUND', message: 'Файл не найден' } },
        { status: 404 },
      )
    }

    db.files.splice(index, 1)
    return HttpResponse.json({ success: true })
  }),

  // PATCH /files/:id — переименовать или переместить файл
  http.patch(`${BASE}/files/:id`, async ({ params, request }) => {
    await delay(200)

    const file = db.files.find((f) => f.id === params.id)
    if (!file) {
      return HttpResponse.json(
        { error: { code: 'FILE_NOT_FOUND', message: 'Файл не найден' } },
        { status: 404 },
      )
    }

    const body = (await request.json()) as {
      name?: string
      folderId?: string
    }

    // Обновляем поля, которые пришли в запросе
    if (body.name !== undefined) {
      file.name = body.name
    }
    if (body.folderId !== undefined) {
      file.folderId = body.folderId
    }
    file.updatedAt = new Date().toISOString()

    return HttpResponse.json(file)
  }),

  // POST /files/upload — загрузка файлов
  http.post(`${BASE}/files/upload`, async ({ request }) => {
    await delay(800)

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folderId = formData.get('folderId') as string

    if (!file) {
      return HttpResponse.json(
        { error: { code: 'NO_FILE', message: 'Файл не передан' } },
        { status: 400 },
      )
    }

    const newFile = {
      id: `file_${crypto.randomUUID().slice(0, 8)}`,
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      folderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    db.files.push(newFile)

    return HttpResponse.json({ files: [newFile] }, { status: 201 })
  }),

  // GET /files/:id/download — скачивание файла
  http.get(`${BASE}/files/:id/download`, async ({ params }) => {
    await delay(400)

    const file = db.files.find((f) => f.id === params.id)
    if (!file) {
      return HttpResponse.json(
        { error: { code: 'FILE_NOT_FOUND', message: 'Файл не найден' } },
        { status: 404 },
      )
    }

    // Создаём fake blob для имитации скачивания
    const blob = new Blob([`Mock content of ${file.name}`], { type: file.mimeType })

    return new HttpResponse(blob, {
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
    })
  }),
]
