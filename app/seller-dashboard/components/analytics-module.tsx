"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/shared/date-picker"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
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
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts"
import { Download } from "lucide-react"

// Моковые данные для графиков
const salesData = [
  { name: "Янв", sales: 4000, revenue: 240000 },
  { name: "Фев", sales: 3000, revenue: 180000 },
  { name: "Мар", sales: 5000, revenue: 300000 },
  { name: "Апр", sales: 2780, revenue: 166800 },
  { name: "Май", sales: 1890, revenue: 113400 },
  { name: "Июн", sales: 2390, revenue: 143400 },
  { name: "Июл", sales: 3490, revenue: 209400 },
]

const categoryData = [
  { name: "Обувь", value: 35 },
  { name: "Одежда", value: 25 },
  { name: "Спортивный инвентарь", value: 30 },
  { name: "Аксессуары", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const topProducts = [
  { id: 1, name: "Спортивные кроссовки", category: "Обувь", sales: 120, revenue: 420000 },
  { id: 2, name: "Футбольный мяч", category: "Спортивный инвентарь", sales: 85, revenue: 170000 },
  { id: 3, name: "Теннисная ракетка", category: "Спортивный инвентарь", sales: 64, revenue: 320000 },
  { id: 4, name: "Спортивный костюм", category: "Одежда", sales: 52, revenue: 260000 },
  { id: 5, name: "Беговые шорты", category: "Одежда", sales: 45, revenue: 90000 },
]

export function AnalyticsModule() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    to: new Date(),
  })
  
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [chartType, setChartType] = useState<string>("sales")
  
  // Функция для экспорта данных в CSV
  const exportToCSV = () => {
    // В реальном приложении здесь был бы код для формирования и скачивания CSV-файла
    alert("Экспорт данных в CSV")
  }
  
  // Функция для экспорта данных в PDF
  const exportToPDF = () => {
    // В реальном приложении здесь был бы код для формирования и скачивания PDF-файла
    alert("Экспорт данных в PDF")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto">
            <p className="text-sm font-medium mb-1">Период</p>
            <DatePicker 
              selection={dateRange} 
              setSelection={setDateRange} 
            >
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
              </Button>
            </DatePicker>
          </div>
          
          <div className="w-full md:w-[200px]">
            <p className="text-sm font-medium mb-1">Категория</p>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Все категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="footwear">Обувь</SelectItem>
                <SelectItem value="clothing">Одежда</SelectItem>
                <SelectItem value="equipment">Спортивный инвентарь</SelectItem>
                <SelectItem value="accessories">Аксессуары</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportToPDF}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт PDF
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">₽1,250,000</CardTitle>
            <CardDescription>Общая выручка</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 font-medium">
              +12.5% по сравнению с прошлым периодом
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">366</CardTitle>
            <CardDescription>Проданных товаров</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 font-medium">
              +8.2% по сравнению с прошлым периодом
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">₽3,415</CardTitle>
            <CardDescription>Средний чек</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 font-medium">
              +4.3% по сравнению с прошлым периодом
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={chartType} onValueChange={setChartType}>
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Продажи</TabsTrigger>
          <TabsTrigger value="revenue">Выручка</TabsTrigger>
          <TabsTrigger value="categories">По категориям</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Динамика продаж</CardTitle>
              <CardDescription>
                Количество проданных товаров по месяцам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" name="Продажи (шт.)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Динамика выручки</CardTitle>
              <CardDescription>
                Выручка по месяцам (в рублях)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} ₽`, "Выручка"]} />
                    <Legend />
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
        </TabsContent>
        
        <TabsContent value="categories" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Продажи по категориям</CardTitle>
              <CardDescription>
                Распределение продаж по категориям товаров
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full max-w-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Доля продаж"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Топ продаваемых товаров</CardTitle>
          <CardDescription>
            Товары с наибольшим количеством продаж за выбранный период
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="text-right">Продажи (шт.)</TableHead>
                <TableHead className="text-right">Выручка (₽)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{product.sales}</TableCell>
                  <TableCell className="text-right">{product.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}