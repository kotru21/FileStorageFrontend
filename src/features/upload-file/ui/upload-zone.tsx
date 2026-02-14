'use client'

import { type ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileIcon, Loader2, CheckCircle2 } from 'lucide-react'
import { formatSize } from '@/entities/file'
import { Button } from '@/shared/ui/button'
import { useUploadQueue } from '../model/use-upload-queue'

type UploadZoneProps = {
  folderId: string
  children: (uploadButton: ReactNode, uploadProgress: ReactNode) => ReactNode
}

export function UploadZone({ folderId, children }: UploadZoneProps) {
  const { uploadingFiles, addFiles, removeFile } = useUploadQueue(folderId)

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: addFiles,
    multiple: true,
    noClick: true,
    noKeyboard: true,
  })

  const uploadButton = (
    <Button onClick={open} variant="outline">
      <Upload className="w-4 h-4 mr-2" />
      Загрузить файлы
    </Button>
  )

  const uploadProgress = uploadingFiles.length > 0 && (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Загрузка файлов</h3>
      <div className="space-y-2">
        {uploadingFiles.map((uploadFile, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <FileIcon className="w-8 h-8 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{uploadFile.file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatSize(uploadFile.file.size)}
              </p>
              {uploadFile.status === 'error' && uploadFile.errorMessage && (
                <p className="text-xs text-destructive mt-1">
                  {uploadFile.errorMessage}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {uploadFile.status === 'uploading' && (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              )}
              {uploadFile.status === 'done' && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {uploadFile.status === 'error' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeFile(uploadFile.file)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div {...getRootProps()} className="relative">
      <input {...getInputProps()} />

      {/* Overlay при перетаскивании */}
      {isDragActive && (
        <div className="fixed inset-0 z-50 bg-primary/10 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="bg-background border-2 border-dashed border-primary rounded-xl p-12 shadow-2xl">
            <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
            <p className="text-2xl font-semibold text-center">
              Отпустите файлы для загрузки
            </p>
          </div>
        </div>
      )}

      {children(uploadButton, uploadProgress)}
    </div>
  )
}
