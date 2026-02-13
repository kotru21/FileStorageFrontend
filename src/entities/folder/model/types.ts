import { FileItem } from '@/entities/file'

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
