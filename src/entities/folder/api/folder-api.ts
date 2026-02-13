import { apiClient } from '@/shared/api/client'
import { Folder, FolderContents } from '@/entities/folder'

export const folderApi = {
  getContents: (folderId: string) =>
    apiClient.get<FolderContents>(`/folders/${folderId}`),
  create: (name: string, parentId: string) =>
    apiClient.post<Folder>('/folders', { name, parentId }),
  delete: (folderId: string) =>
    apiClient.delete(`/folders/${folderId}`),
  rename: (folderId: string, name: string) =>
    apiClient.patch(`/folders/${folderId}`, { name }),
  move: (folderId: string, parentId: string) =>
    apiClient.patch(`/folders/${folderId}`, { parentId }),
}
