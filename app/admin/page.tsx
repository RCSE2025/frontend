import { AdminLayout } from '@/components/admin/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Панель управления">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Тикеты</CardTitle>
            <CardDescription>Управление тикетами пользователей</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Открытых тикетов</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Пользователи</CardTitle>
            <CardDescription>Управление пользователями</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Зарегистрированных пользователей</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки</CardTitle>
            <CardDescription>Настройки системы</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Управление настройками системы</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
