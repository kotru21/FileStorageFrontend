'use client'

import { useState } from 'react'
import { FolderPlus } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { useCreateFolder } from '../model/use-create-folder'

export function CreateFolderModal({ parentId }: { parentId: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const mutation = useCreateFolder(parentId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    mutation.mutate(name, {
      onSuccess: () => {
        setName('')
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FolderPlus className="w-4 h-4 mr-2" />
          Создать папку
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Создать папку</DialogTitle>
            <DialogDescription>
              Введите название новой папки
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Название папки"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              disabled={mutation.isPending}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={mutation.isPending}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={mutation.isPending || !name.trim()}>
              {mutation.isPending ? 'Создание...' : 'Создать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
