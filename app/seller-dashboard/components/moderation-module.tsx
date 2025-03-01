"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"

// Типы для товаров в модерации
type ModerationStatus = "pending" | "approved" | "rejected"

interface ModerationProduct {
  id: string
  name: string
  category: string
  submittedAt: Date
  updatedAt: Date
  status: ModerationStatus
  rejectionReason?: string
  moderatorComments?: string
}

// Моковые данные для демонстрации
const mockModerationProducts: ModerationProduct[] = [
  {
    id: "1",
    name: "Спортивные кроссовки",
    category: "Обувь",
    submittedAt: new Date("2025-02-15"),
    updatedAt: new Date("2025-02-17"),
    status: "approved"
  },
  {
    id: "2",
    name: "Футбольный мяч",
    category: "Спортивный инвентарь",
    submittedAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-02-20"),
    status: "pending"
  },
  {
    id: "3",
    name: "Теннисная ракетка",
    category: "Спортивный инвентарь",
    submittedAt: new Date("2025-02-25"),
    updatedAt: new Date("2025-02-26"),
    status: "rejected",
    rejectionReason: "Недостаточно информации о товаре",
    moderatorComments: "Пожалуйста, добавьте более подробное описание товара и укажите все технические характеристики. Также необходимо загрузить фотографии товара в лучшем качестве."
  },
  {
    id: "4",
    name: "Спортивный костюм",
    category: "Одежда",
    submittedAt: new Date("2025-02-28"),
    updatedAt: new Date("2025-03-01"),
    status: "rejected",
    rejectionReason: "Нарушение правил площадки",
    moderatorComments: "Товар содержит запрещенные элементы. Пожалуйста, ознакомьтесь с правилами размещения товаров на площадке."
  }
]

export function ModerationModule() {
  const [products, setProducts] = useState<ModerationProduct[]>(mockModerationProducts)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedProduct, setSelectedProduct] = useState<ModerationProduct | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  
  // Функция для фильтрации товаров по статусу
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.status === activeTab)
  
  // Функция для открытия диалога с деталями модерации
  const openDetailsDialog = (product: ModerationProduct) => {
    setSelectedProduct(product)
    setIsDetailsDialogOpen(true)
  }
  
  // Функция для получения цвета бейджа статуса
  const getStatusBadgeVariant = (status: ModerationStatus) => {
    switch (status) {
      case "pending": return "warning"
      case "approved": return "success"
      case "rejected": return "destructive"
      default: return "default"
    }
  }
  
  // Функция для получения текста статуса
  const getStatusText = (status: ModerationStatus) => {
    switch (status) {
      case "pending": return "На модерации"
      case "approved": return "Одобрен"
      case "rejected": return "Отклонен"
      default: return status
    }
  }
  
  // Функция для получения иконки статуса
  const getStatusIcon = (status: ModerationStatus) => {
    switch (status) {
      case "pending": return <Clock className="h-5 w-5 text-yellow-500" />
      case "approved": return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected": return <XCircle className="h-5 w-5 text-red-500" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="pending">На модерации</TabsTrigger>
            <TabsTrigger value="approved">Одобренные</TabsTrigger>
            <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Отправлен</TableHead>
              <TableHead>Обновлен</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Нет товаров для отображения
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.submittedAt.toLocaleDateString()}</TableCell>
                  <TableCell>{product.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(product.status) as any}>
                      {getStatusText(product.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openDetailsDialog(product)}
                    >
                      Подробнее
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Диалог с деталями модерации */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedProduct && (
                <>
                  {getStatusIcon(selectedProduct.status)}
                  <span>
                    {selectedProduct.name} - {getStatusText(selectedProduct.status)}
                  </span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Информация о статусе модерации товара
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Категория</p>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Отправлен на модерацию</p>
                  <p>{selectedProduct.submittedAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Последнее обновление</p>
                  <p>{selectedProduct.updatedAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Статус</p>
                  <Badge variant={getStatusBadgeVariant(selectedProduct.status) as any}>
                    {getStatusText(selectedProduct.status)}
                  </Badge>
                </div>
              </div>
              
              {selectedProduct.status === "pending" && (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Товар на модерации</AlertTitle>
                  <AlertDescription>
                    Ваш товар находится на рассмотрении. Обычно процесс модерации занимает до 24 часов.
                  </AlertDescription>
                </Alert>
              )}
              
              {selectedProduct.status === "approved" && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Товар одобрен</AlertTitle>
                  <AlertDescription>
                    Ваш товар успешно прошел модерацию и опубликован на площадке.
                  </AlertDescription>
                </Alert>
              )}
              
              {selectedProduct.status === "rejected" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Товар отклонен</AlertTitle>
                  <AlertDescription>
                    <p className="font-medium">Причина: {selectedProduct.rejectionReason}</p>
                    {selectedProduct.moderatorComments && (
                      <div className="mt-2">
                        <p className="font-medium">Комментарий модератора:</p>
                        <p className="mt-1">{selectedProduct.moderatorComments}</p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <DialogFooter>
            {selectedProduct?.status === "rejected" && (
              <Button variant="default">
                Исправить и отправить повторно
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}