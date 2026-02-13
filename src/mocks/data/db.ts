export type MockDB = {
  users: Array<{ id: string; email: string; name: string; password: string }>
  folders: Array<{
    id: string
    name: string
    parentId: string | null
    createdAt: string
    updatedAt: string
  }>
  files: Array<{
    id: string
    name: string
    mimeType: string
    size: number
    folderId: string
    createdAt: string
    updatedAt: string
  }>
  tokens: Map<string, string>
}

export const db: MockDB = {
  users: [
    {
      id: 'user_1',
      email: 'test@example.com',
      name: 'Test User',
      password: '123456',
    },
  ],
  folders: [
    {
      id: 'root',
      name: 'Мои файлы',
      parentId: null,
      createdAt: '2025-01-01T10:00:00.000Z',
      updatedAt: '2025-01-01T10:00:00.000Z',
    },
    {
      id: 'fld_photos',
      name: 'Фотографии',
      parentId: 'root',
      createdAt: '2025-01-02T12:00:00.000Z',
      updatedAt: '2025-01-02T12:00:00.000Z',
    },
    {
      id: 'fld_docs',
      name: 'Документы',
      parentId: 'root',
      createdAt: '2025-01-03T09:00:00.000Z',
      updatedAt: '2025-01-03T09:00:00.000Z',
    },
    {
      id: 'fld_music',
      name: 'Музыка',
      parentId: 'root',
      createdAt: '2025-01-04T15:00:00.000Z',
      updatedAt: '2025-01-04T15:00:00.000Z',
    },
  ],
  files: [
    {
      id: 'file_1',
      name: 'README.md',
      mimeType: 'text/markdown',
      size: 2048,
      folderId: 'root',
      createdAt: '2025-01-05T08:00:00.000Z',
      updatedAt: '2025-01-05T08:00:00.000Z',
    },
    {
      id: 'file_2',
      name: 'photo-vacation.jpg',
      mimeType: 'image/jpeg',
      size: 3_500_000,
      folderId: 'fld_photos',
      createdAt: '2025-01-06T14:00:00.000Z',
      updatedAt: '2025-01-06T14:00:00.000Z',
    },
    {
      id: 'file_3',
      name: 'report.pdf',
      mimeType: 'application/pdf',
      size: 1_200_000,
      folderId: 'fld_docs',
      createdAt: '2025-01-07T11:00:00.000Z',
      updatedAt: '2025-01-07T11:00:00.000Z',
    },
    {
      id: 'file_4',
      name: 'notes.txt',
      mimeType: 'text/plain',
      size: 512,
      folderId: 'root',
      createdAt: '2025-01-08T16:00:00.000Z',
      updatedAt: '2025-01-08T16:00:00.000Z',
    },
    {
      id: 'file_5',
      name: 'presentation.pptx',
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      size: 5_800_000,
      folderId: 'fld_docs',
      createdAt: '2025-01-09T10:00:00.000Z',
      updatedAt: '2025-01-09T10:00:00.000Z',
    },
    {
      id: 'file_6',
      name: 'track.mp3',
      mimeType: 'audio/mpeg',
      size: 4_200_000,
      folderId: 'fld_music',
      createdAt: '2025-01-10T13:00:00.000Z',
      updatedAt: '2025-01-10T13:00:00.000Z',
    },
  ],
  tokens: new Map(),
}
