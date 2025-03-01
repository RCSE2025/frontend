import { AdminLayout } from '@/components/admin/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminSettingsPage() {
  return (
    <AdminLayout title="Настройки системы">
      <Card>
        <CardHeader>
          <CardTitle>Настройки</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Функциональность настроек системы будет добавлена в следующих обновлениях.
          </p>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
