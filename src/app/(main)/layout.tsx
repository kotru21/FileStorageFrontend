import { MainLayout } from '@/widgets/main-layout'

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
