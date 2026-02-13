import { useQuery } from '@tanstack/react-query'
import { folderApi } from '@/entities/folder/api/folder-api'

export function useFolderContents(folderId: string) {
  return useQuery({
    queryKey: ['folder', folderId],
    queryFn: () => folderApi.getContents(folderId).then((res) => res.data),
    enabled: !!folderId,
  })
}
