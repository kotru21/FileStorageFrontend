import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useUploadFile } from './use-upload'

export type UploadingFile = {
  file: File
  status: 'uploading' | 'done' | 'error'
  errorMessage?: string
}

export function useUploadQueue(folderId: string) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const mutation = useUploadFile(folderId)

  const addFiles = useCallback(
    async (files: File[]) => {
      const newFiles: UploadingFile[] = files.map((file) => ({
        file,
        status: 'uploading' as const,
      }))
      setUploadingFiles((prev) => [...prev, ...newFiles])

      let successCount = 0
      let errorCount = 0

      for (const uploadFile of newFiles) {
        try {
          await mutation.mutateAsync(uploadFile.file)
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.file === uploadFile.file ? { ...f, status: 'done' as const } : f
            )
          )
          successCount++
        } catch (error) {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.file === uploadFile.file
                ? {
                    ...f,
                    status: 'error' as const,
                    errorMessage:
                      error instanceof Error ? error.message : 'Ошибка загрузки',
                  }
                : f
            )
          )
          errorCount++
        }
      }

      //  итоговый toast после загрузки всех файлов
      if (errorCount === 0) {
        toast.success('Файлы загружены', {
          description: `Загружено файлов: ${successCount}`,
        })
      } else if (successCount > 0) {
        toast.warning('Загрузка завершена с ошибками', {
          description: `Загружено: ${successCount}, Ошибок: ${errorCount}`,
        })
      }
    },
    [mutation]
  )

  const removeFile = useCallback((file: File) => {
    setUploadingFiles((prev) => prev.filter((f) => f.file !== file))
  }, [])

  return {
    uploadingFiles,
    addFiles,
    removeFile,
  }
}
