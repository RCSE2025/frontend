'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserRole } from '@/shared/api/user/types'
import { useUser } from '@/shared/store/useUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, loggedIn, fetchUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchUser()
      } catch (error) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [fetchUser, router])

  useEffect(() => {
    if (loggedIn && user.role !== UserRole.ROOT) {
      router.push('/')
    }
  }, [loggedIn, user, router])

  // if (!loggedIn) {
  //   return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>
  // }

  // if (user.role !== UserRole.ROOT) {
  //   return null // Will redirect in the useEffect
  // }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user.name} {user.surname} (Администратор)
          </span>
          <Button variant="outline" asChild>
            <a href="/">Вернуться на сайт</a>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="flex gap-6">
        <div className="w-64 space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin">Панель управления</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin/tickets">Тикеты</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin/users">Пользователи</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/admin/settings">Настройки</a>
          </Button>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
