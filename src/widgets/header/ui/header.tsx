'use client'

import { LogOut, FolderOpen } from 'lucide-react'
import { useUserStore } from '@/entities/user'
import { useAuth } from '@/features/auth'
import { Button } from '@/shared/ui/button'

export function Header() {
  const { user } = useUserStore()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout.mutate()
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">Daniil Storage</span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {logout.isPending ? 'Выход...' : 'Выйти'}
          </Button>
        </div>
      </div>
    </header>
  )
}
