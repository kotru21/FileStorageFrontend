import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { folderApi } from '@/entities/folder'

export function useCreateFolder(parentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name: string) => folderApi.create(name, parentId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['folder', parentId] })
      toast.success('Папка создана', {
        description: `Папка "${response.data.name}" успешно создана`,
      })
    },
    onError: (error: Error) => {
      // Глобальный interceptor уже показал toast, но логируем для отладки
      console.error('Failed to create folder:', error)
    },
  })
}
