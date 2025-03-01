'use client'

import { useState, useEffect } from 'react'
import { useOrder } from '@/shared/store/useOrder'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Order, OrderStatus } from '@/shared/api/order/types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon, ChevronDown, ChevronUp, FilterIcon, SearchIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

// Функция для форматирования статуса заказа
const formatOrderStatus = (status: OrderStatus) => {
  const statusMap: Record<OrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' }> = {
    [OrderStatus.PENDING]: { label: 'Ожидает обработки', variant: 'secondary' },
    [OrderStatus.PROCESSING]: { label: 'В обработке', variant: 'default' },
    [OrderStatus.SHIPPED]: { label: 'Отправлен', variant: 'success' },
    [OrderStatus.DELIVERED]: { label: 'Доставлен', variant: 'success' },
    [OrderStatus.CANCELLED]: { label: 'Отменен', variant: 'destructive' }
  }
  
  return statusMap[status] || { label: status, variant: 'default' }
}

// Компонент для отображения детальной информации о заказе
function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Заказ #{order.id}</h3>
          <p className="text-sm text-muted-foreground">
            {format(new Date(order.createdAt), 'PPP', { locale: ru })}
          </p>
        </div>
        <Badge variant={formatOrderStatus(order.status).variant as any}>
          {formatOrderStatus(order.status).label}
        </Badge>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-medium mb-2">Товары</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Товар</TableHead>
              <TableHead className="text-right">Цена</TableHead>
              <TableHead className="text-right">Кол-во</TableHead>
              <TableHead className="text-right">Сумма</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.productName} 
                      className="h-10 w-10 rounded object-cover"
                    />
                    <span>{item.productName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.price.toLocaleString()} ₽</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{(item.price * item.quantity).toLocaleString()} ₽</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Итого:</TableCell>
              <TableCell className="text-right font-bold">{order.totalAmount.toLocaleString()} ₽</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Информация о доставке</h4>
          <p className="text-sm">{order.shippingAddress}</p>
          {order.trackingNumber && (
            <p className="text-sm mt-2">
              <span className="font-medium">Номер отслеживания:</span> {order.trackingNumber}
            </p>
          )}
        </div>
        <div>
          <h4 className="font-medium mb-2">Способ оплаты</h4>
          <p className="text-sm">{order.paymentMethod}</p>
        </div>
      </div>
      
      {order.status === OrderStatus.PENDING && (
        <div className="flex justify-end">
          <Button variant="destructive">Отменить заказ</Button>
        </div>
      )}
    </div>
  )
}

export function OrderHistory() {
  const { orders, loading, error, fetchOrders, sortOrdersByDate, sortOrdersByAmount, filterOrdersByStatus, filterOrdersByDateRange, filterOrdersByAmountRange, resetFilters } = useOrder()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: 'date' | 'amount', direction: 'asc' | 'desc' } | null>(null)
  const [filterStatus, setFilterStatus] = useState<OrderStatus | ''>('')
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [minAmount, setMinAmount] = useState<string>('')
  const [maxAmount, setMaxAmount] = useState<string>('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleSort = (key: 'date' | 'amount') => {
    let direction: 'asc' | 'desc' = 'desc'
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    
    setSortConfig({ key, direction })
    
    if (key === 'date') {
      sortOrdersByDate(direction === 'asc')
    } else if (key === 'amount') {
      sortOrdersByAmount(direction === 'asc')
    }
  }

  const handleStatusFilter = (status: OrderStatus | '') => {
    setFilterStatus(status)
    if (status === '') {
      resetFilters()
    } else {
      filterOrdersByStatus(status as OrderStatus)
    }
  }

  const handleDateFilter = () => {
    if (startDate || endDate) {
      filterOrdersByDateRange(
        startDate ? startDate.toISOString() : null,
        endDate ? endDate.toISOString() : null
      )
    } else {
      resetFilters()
    }
  }

  const handleAmountFilter = () => {
    const min = minAmount ? parseFloat(minAmount) : null
    const max = maxAmount ? parseFloat(maxAmount) : null
    
    if (min !== null || max !== null) {
      filterOrdersByAmountRange(min, max)
    } else {
      resetFilters()
    }
  }

  const handleResetFilters = () => {
    setFilterStatus('')
    setStartDate(undefined)
    setEndDate(undefined)
    setMinAmount('')
    setMaxAmount('')
    setSortConfig(null)
    resetFilters()
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const getSortIcon = (key: 'date' | 'amount') => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>История покупок</CardTitle>
              <CardDescription>
                Просмотр и управление вашими заказами
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FilterIcon className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isFilterOpen && (
            <div className="mb-6 p-4 border rounded-md">
              <h3 className="font-medium mb-4">Фильтры и сортировка</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status-filter">Статус заказа</Label>
                  <Select value={filterStatus} onValueChange={(value) => handleStatusFilter(value as OrderStatus | '')}>
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="Все статусы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все статусы</SelectItem>
                      {Object.values(OrderStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {formatOrderStatus(status).label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Период</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "P", { locale: ru }) : <span>От</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "P", { locale: ru }) : <span>До</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={handleDateFilter}>
                    Применить
                  </Button>
                </div>
                
                <div>
                  <Label>Сумма заказа</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="От"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="До"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={handleAmountFilter}>
                    Применить
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm" onClick={handleResetFilters}>
                  Сбросить все фильтры
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(false)}>
                  Скрыть фильтры
                </Button>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-4">Загрузка заказов...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">Ошибка при загрузке заказов: {error}</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">У вас пока нет заказов</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№ заказа</TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('date')}
                    >
                      <span>Дата</span>
                      {getSortIcon('date')}
                    </button>
                  </TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('amount')}
                    >
                      <span>Сумма</span>
                      {getSortIcon('amount')}
                    </button>
                  </TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleOrderClick(order)}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{format(new Date(order.createdAt), 'dd.MM.yyyy', { locale: ru })}</TableCell>
                    <TableCell>
                      <Badge variant={formatOrderStatus(order.status).variant as any}>
                        {formatOrderStatus(order.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.totalAmount.toLocaleString()} ₽</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Подробнее
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Детали заказа</DialogTitle>
            <DialogDescription>
              Полная информация о вашем заказе
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && <OrderDetails order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}