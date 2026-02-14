'use client'

import Link from 'next/link'
import { Folder, File } from 'lucide-react'
import { useFolderContents } from '@/entities/folder'
import { formatSize } from '@/entities/file'
import { Breadcrumbs } from '@/widgets/header'
import { CreateFolderModal } from '@/features/create-folder'
import { DeleteConfirmModal } from '@/features/delete-item'
import { UploadZone } from '@/features/upload-file'
import { Skeleton } from '@/shared/ui/skeleton'

export function FolderPage({ folderId }: { folderId: string }) {
  const { data, isLoading, error } = useFolderContents(folderId)

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <p className="text-destructive font-medium">Ошибка загрузки</p>
          <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { folder, folders, files, breadcrumbs } = data

  return (
    <UploadZone folderId={folderId}>
      {(uploadButton, uploadProgress) => (
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Breadcrumbs trail={breadcrumbs} />
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{folder.name}</h1>
                <p className="text-muted-foreground mt-1">
                  {folders.length} папок, {files.length} файлов
                </p>
              </div>
              <div className="flex gap-2">
                {uploadButton}
                <CreateFolderModal parentId={folderId} />
              </div>
            </div>
          </div>

          {uploadProgress}

          {folders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Папки</h2>
              <div className="grid grid-cols-4 gap-4">
                {folders.map((subfolder) => (
                  <div
                    key={subfolder.id}
                    className="border rounded-lg p-4 hover:bg-accent hover:border-primary transition-colors group relative"
                  >
                    <Link
                      href={`/folders/${subfolder.id}`}
                      className="flex items-start gap-3"
                    >
                      <Folder className="w-10 h-10 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate group-hover:text-primary">
                          {subfolder.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(subfolder.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </Link>
                    <div
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DeleteConfirmModal
                        folderId={subfolder.id}
                        folderName={subfolder.name}
                        parentId={folderId}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Файлы</h2>
              <div className="grid grid-cols-4 gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <File className="w-10 h-10 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate group-hover:text-primary">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatSize(file.size)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {folders.length === 0 && files.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Папка пустая</p>
            </div>
          )}
        </div>
      )}
    </UploadZone>
  )
}
