import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import type { Folder } from '@/entities/folder'

export function Breadcrumbs({ trail }: { trail: Folder[] }) {
  if (trail.length === 0) return null

  return (
    <nav className="flex items-center gap-2 text-sm">
      {trail.map((folder, index) => {
        const isLast = index === trail.length - 1

        return (
          <div key={folder.id} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}

            {isLast ? (
              <span className="font-medium text-foreground flex items-center gap-1">
                {index === 0 && <Home className="w-4 h-4" />}
                {folder.name}
              </span>
            ) : (
              <Link
                href={`/folders/${folder.id}`}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="w-4 h-4" />}
                {folder.name}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
