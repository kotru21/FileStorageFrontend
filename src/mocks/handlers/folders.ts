import { http, HttpResponse, delay } from 'msw'
import { db } from '../data/db'

const BASE = process.env.NEXT_PUBLIC_API_URL + '/api/v1'

export const folderHandlers = [
  // GET /folders/:id
  http.get(`${BASE}/folders/:id`, async ({ params }) => {
    await delay(300)
    const folder = db.folders.find((folder)=> folder.id === params.id)
    if (!folder) {
      return HttpResponse.json({error: {code: 'FOLDER_NOT_FOUND', message: 'Папка не найдена'}}, {status: 404})
    }

    const folders = db.folders.filter((f) => f.parentId === params.id)
    const files = db.files.filter((f) => f.folderId === params.id)

    return HttpResponse.json({ folder, folders, files })
  }),

  // POST /folders
  http.post(`${BASE}/folders`, async ({ request }) => {
    await delay(200)
    const body = (await request.json()) as 
    {
        name: string;
        parentId: string;
    }
    const newFolder = { id: `fld_${crypto.randomUUID().slice(0,8)}`, name: body.name, parentId: body.parentId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    db.folders.push(newFolder)
    return HttpResponse.json(newFolder, {status: 201})  
}),

  // DELETE /folders/:id
  http.delete(`${BASE}/folders/:id`, async ({ params }) => {
    await delay(200)

    const index = db.folders.findIndex((f) => f.id === params.id)
    if (index === -1) {
      return HttpResponse.json(
        { error: { code: 'FOLDER_NOT_FOUND', message: 'Папка не найдена' } },
        { status: 404 },
      )
    }

    db.folders.splice(index, 1)
    db.files = db.files.filter((f) => f.folderId !== params.id)

    return HttpResponse.json({ success: true })
  }),
]