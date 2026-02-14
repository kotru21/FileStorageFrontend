import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { folderApi } from '@/entities/folder'

export function useDeleteFolder(folderId: string, parentId: string, folderName?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => folderApi.delete(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folder', parentId] })
      toast.success('Папка удалена', {
        description: folderName ? `Папка "${folderName}" удалена` : 'Папка успешно удалена',
      })
    },
    onError: (error: Error) => {
      console.error('Failed to delete folder:', error)
    },
  })
}
