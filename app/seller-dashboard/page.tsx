import { redirect } from 'next/navigation'
import { SellerDashboard } from './components/seller-dashboard'

export default function SellerDashboardPage() {
  // В реальном приложении здесь должна быть проверка авторизации и роли пользователя
  // Если пользователь не авторизован или не является продавцом, перенаправляем на страницу входа
  // const isAuthenticated = false
  // const isSellerRole = false
  // if (!isAuthenticated || !isSellerRole) {
  //   redirect('/login')
  // }

  return <SellerDashboard />
}