import { apiClient } from '@/shared/api/client'
import { type FileItem } from '@/entities/file'

export const fileApi = {
  upload: (folderId: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folderId', folderId)
    return apiClient.post<{ files: FileItem[] }>('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  download: (fileId: string) =>
    apiClient.get(`/files/${fileId}/download`, { responseType: 'blob' }),
  delete: (fileId: string) =>
    apiClient.delete(`/files/${fileId}`),
  rename: (fileId: string, name: string) =>
    apiClient.patch(`/files/${fileId}`, { name }),
  move: (fileId: string, folderId: string) =>
    apiClient.patch(`/files/${fileId}`, { folderId }),
}
