import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fileApi } from '@/entities/file'

export function useUploadFile(folderId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => fileApi.upload(folderId, file),
    onSuccess: () => {
      // Инвалидируем запрос содержимого папки, чтобы список файлов обновился
      queryClient.invalidateQueries({ queryKey: ['folder', folderId] })
    },
  })
}
