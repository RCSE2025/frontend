"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShoppingBag, Users, AlertCircle } from "lucide-react"

// Моковые данные для графиков
const salesData = [
  { name: "Пн", sales: 12 },
  { name: "Вт", sales: 18 },
  { name: "Ср", sales: 15 },
  { name: "Чт", sales: 22 },
  { name: "Пт", sales: 28 },
  { name: "Сб", sales: 32 },
  { name: "Вс", sales: 25 },
]

const revenueData = [
  { name: "Пн", revenue: 42000 },
  { name: "Вт", revenue: 63000 },
  { name: "Ср", revenue: 52500 },
  { name: "Чт", revenue: 77000 },
  { name: "Пт", revenue: 98000 },
  { name: "Сб", revenue: 112000 },
  { name: "Вс", revenue: 87500 },
]

// Моковые данные для последних заказов
const recentOrders = [
  { 
    id: "ORD-001", 
    product: "Спортивные кроссовки", 
    customer: "Иванов И.И.", 
    date: "01.03.2025", 
    amount: 3500, 
    status: "completed" 
  },
  { 
    id: "ORD-002", 
    product: "Футбольный мяч", 
    customer: "Петров П.П.", 
    date: "01.03.2025", 
    amount: 2000, 
    status: "processing" 
  },
  { 
    id: "ORD-003", 
    product: "Теннисная ракетка", 
    customer: "Сидоров С.С.", 
    date: "28.02.2025", 
    amount: 5000, 
    status: "completed" 
  },
  { 
    id: "ORD-004", 
    product: "Спортивный костюм", 
    customer: "Козлова А.А.", 
    date: "28.02.2025", 
    amount: 5000, 
    status: "completed" 
  },
  { 
    id: "ORD-005", 
    product: "Беговые шорты", 
    customer: "Николаев Н.Н.", 
    date: "27.02.2025", 
    amount: 2000, 
    status: "completed" 
  }
]

// Моковые данные для товаров на модерации
const pendingProducts = [
  { 
    id: "1", 
    name: "Футбольный мяч", 
    submittedAt: "01.03.2025", 
    status: "pending" 
  },
  { 
    id: "2", 
    name: "Волейбольный мяч", 
    submittedAt: "28.02.2025", 
    status: "pending" 
  }
]

// Моковые данные для отклоненных товаров
const rejectedProducts = [
  { 
    id: "3", 
    name: "Теннисная ракетка", 
    submittedAt: "25.02.2025", 
    status: "rejected",
    reason: "Недостаточно информации о товаре" 
  }
]

export function DashboardOverview() {
  const [timeRange, setTimeRange] = useState<string>("week")
  
  // Функция для получения цвета бейджа статуса заказа
  const getOrderStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed": return "default"
      case "processing": return "secondary"
      case "cancelled": return "destructive"
      default: return "default"
    }
  }
  
  // Функция для получения текста статуса заказа
  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Выполнен"
      case "processing": return "В обработке"
      case "cancelled": return "Отменен"
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выручка сегодня</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽32,500</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+12.5%</span>
              <span className="text-muted-foreground ml-1">по сравнению со вчера</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Продажи сегодня</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+5.2%</span>
              <span className="text-muted-foreground ml-1">по сравнению со вчера</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Новые клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>-2.5%</span>
              <span className="text-muted-foreground ml-1">по сравнению со вчера</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Товары на модерации</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProducts.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Ожидают проверки
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Продажи</CardTitle>
              <Tabs value={timeRange} onValueChange={setTimeRange} className="w-[200px]">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="week">Неделя</TabsTrigger>
                  <TabsTrigger value="month">Месяц</TabsTrigger>
                  <TabsTrigger value="year">Год</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              Количество проданных товаров
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" name="Продажи (шт.)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Выручка</CardTitle>
            <CardDescription>
              Динамика выручки
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} ₽`, "Выручка"]} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#82ca9d" 
                    name="Выручка (₽)" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние заказы</CardTitle>
            <CardDescription>
              Информация о последних заказах
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Товар</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.amount.toLocaleString()} ₽</TableCell>
                    <TableCell>
                      <Badge variant={getOrderStatusBadgeVariant(order.status) as any}>
                        {getOrderStatusText(order.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Товары на модерации</CardTitle>
            <CardDescription>
              Статус ваших товаров
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingProducts.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Ожидают проверки</h3>
                  <div className="space-y-2">
                    {pendingProducts.map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Отправлен: {product.submittedAt}</p>
                        </div>
                        <Badge variant="secondary">На модерации</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {rejectedProducts.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Отклоненные товары</h3>
                  <div className="space-y-2">
                    {rejectedProducts.map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Отправлен: {product.submittedAt}</p>
                          <p className="text-xs text-red-600 mt-1">Причина: {product.reason}</p>
                        </div>
                        <Badge variant="destructive">Отклонен</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {pendingProducts.length === 0 && rejectedProducts.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  Нет товаров на модерации
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}