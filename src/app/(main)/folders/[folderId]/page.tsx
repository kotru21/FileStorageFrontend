import { FolderPage } from '@/views/folder'

export default async function FolderRoute({
  params,
}: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await params
  return <FolderPage folderId={folderId} />
}
