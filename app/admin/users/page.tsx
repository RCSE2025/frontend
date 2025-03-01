import { AdminLayout } from '@/components/admin/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminUsersPage() {
  return (
    <AdminLayout title="Управление пользователями">
      <Card>
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Функциональность управления пользователями будет добавлена в следующих обновлениях.
          </p>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
