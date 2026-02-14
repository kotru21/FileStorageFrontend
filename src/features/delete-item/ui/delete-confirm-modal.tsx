'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { useDeleteFolder } from '../model/use-delete'

type DeleteConfirmModalProps = {
  folderId: string
  folderName: string
  parentId: string
}

export function DeleteConfirmModal({
  folderId,
  folderName,
  parentId,
}: DeleteConfirmModalProps) {
  const mutation = useDeleteFolder(folderId, parentId, folderName)

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить папку?</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить папку <strong>{folderName}</strong>?
            Все файлы внутри будут удалены. Это действие нельзя отменить.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={mutation.isPending}>
              Отмена
            </Button>
          </DialogTrigger>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Удаление...' : 'Удалить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
