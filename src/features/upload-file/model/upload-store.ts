import { create } from 'zustand'

type UploadItem = {
  id: string
  fileName: string
  progress: number
  status: 'uploading' | 'done' | 'error'
}

type UploadStore = {
  uploads: UploadItem[]
  addUpload: (item: UploadItem) => void
  updateUpload: (id: string, data: Partial<UploadItem>) => void
  removeUpload: (id: string) => void
}

export const useUploadStore = create<UploadStore>((set) => ({
  uploads: [],
  addUpload: (item) =>
    set((state) => ({ uploads: [...state.uploads, item] })),
  updateUpload: (id, data) =>
    set((state) => ({
      uploads: state.uploads.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),
  removeUpload: (id) =>
    set((state) => ({
      uploads: state.uploads.filter((u) => u.id !== id),
    })),
}))
