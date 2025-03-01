"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Типы для товаров
type ProductStatus = "draft" | "pending" | "approved" | "rejected"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  characteristics: Record<string, string>
  status: ProductStatus
  rejectionReason?: string
  createdAt: Date
  updatedAt: Date
}

// Моковые данные для демонстрации
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Спортивные кроссовки",
    description: "Удобные кроссовки для бега и тренировок",
    price: 3500,
    category: "Обувь",
    images: ["/images/product1.jpg"],
    characteristics: {
      "Размер": "42",
      "Цвет": "Черный",
      "Материал": "Синтетика"
    },
    status: "approved",
    createdAt: new Date("2025-02-15"),
    updatedAt: new Date("2025-02-15")
  },
  {
    id: "2",
    name: "Футбольный мяч",
    description: "Профессиональный футбольный мяч",
    price: 2000,
    category: "Спортивный инвентарь",
    images: ["/images/product2.jpg"],
    characteristics: {
      "Размер": "5",
      "Цвет": "Белый/Черный",
      "Материал": "Искусственная кожа"
    },
    status: "pending",
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-02-20")
  },
  {
    id: "3",
    name: "Теннисная ракетка",
    description: "Ракетка для большого тенниса",
    price: 5000,
    category: "Спортивный инвентарь",
    images: ["/images/product3.jpg"],
    characteristics: {
      "Вес": "300г",
      "Материал": "Графит",
      "Баланс": "Средний"
    },
    status: "rejected",
    rejectionReason: "Недостаточно информации о товаре",
    createdAt: new Date("2025-02-25"),
    updatedAt: new Date("2025-02-26")
  }
]

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  
  // Функция для фильтрации товаров по статусу
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.status === activeTab)
  
  // Функция для открытия диалога добавления товара
  const openAddDialog = () => {
    setCurrentProduct(null)
    setIsAddDialogOpen(true)
  }
  
  // Функция для открытия диалога редактирования товара
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }
  
  // Функция для отправки товара на модерацию
  const sendToModeration = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, status: "pending" as ProductStatus, updatedAt: new Date() } 
        : product
    ))
  }
  
  // Функция для удаления товара
  const deleteProduct = (productId: string) => {
    if (confirm("Вы уверены, что хотите удалить этот товар?")) {
      setProducts(products.filter(product => product.id !== productId))
    }
  }
  
  // Функция для получения цвета бейджа статуса
  const getStatusBadgeVariant = (status: ProductStatus) => {
    switch (status) {
      case "draft": return "secondary"
      case "pending": return "warning"
      case "approved": return "success"
      case "rejected": return "destructive"
      default: return "default"
    }
  }
  
  // Функция для получения текста статуса
  const getStatusText = (status: ProductStatus) => {
    switch (status) {
      case "draft": return "Черновик"
      case "pending": return "На модерации"
      case "approved": return "Одобрен"
      case "rejected": return "Отклонен"
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="draft">Черновики</TabsTrigger>
            <TabsTrigger value="pending">На модерации</TabsTrigger>
            <TabsTrigger value="approved">Одобренные</TabsTrigger>
            <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button onClick={openAddDialog}>Добавить товар</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Обновлен</TableHead>
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
                  <TableCell>{product.price} ₽</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(product.status) as any}>
                      {getStatusText(product.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(product)}
                      >
                        Редактировать
                      </Button>
                      
                      {product.status === "draft" && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => sendToModeration(product.id)}
                        >
                          На модерацию
                        </Button>
                      )}
                      
                      {product.status === "rejected" && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => sendToModeration(product.id)}
                        >
                          Отправить снова
                        </Button>
                      )}
                      
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => deleteProduct(product.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Диалог добавления товара */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Добавить новый товар</DialogTitle>
            <DialogDescription>
              Заполните информацию о товаре. После сохранения товар будет создан как черновик.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название товара</Label>
              <Input id="name" placeholder="Введите название товара" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clothing">Одежда</SelectItem>
                  <SelectItem value="footwear">Обувь</SelectItem>
                  <SelectItem value="equipment">Спортивный инвентарь</SelectItem>
                  <SelectItem value="accessories">Аксессуары</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Цена (₽)</Label>
              <Input id="price" type="number" placeholder="0" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Изображение товара</Label>
              <Input id="image" type="file" accept="image/*" multiple />
            </div>
            
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Описание товара</Label>
              <Textarea 
                id="description" 
                placeholder="Введите подробное описание товара" 
                rows={5} 
              />
            </div>
            
            <div className="col-span-2">
              <h3 className="text-lg font-medium mb-2">Характеристики товара</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="char-name-1">Название характеристики</Label>
                  <Input id="char-name-1" placeholder="Например: Размер" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="char-value-1">Значение</Label>
                  <Input id="char-value-1" placeholder="Например: XL" />
                </div>
              </div>
              <Button variant="outline" className="mt-2">
                Добавить характеристику
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Сохранить как черновик
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог редактирования товара */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogDescription>
              Внесите изменения в информацию о товаре.
              {currentProduct?.status === "rejected" && (
                <div className="mt-2 p-3 bg-red-50 text-red-800 rounded-md">
                  <strong>Причина отклонения:</strong> {currentProduct.rejectionReason}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {currentProduct && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Название товара</Label>
                <Input 
                  id="edit-name" 
                  defaultValue={currentProduct.name} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Категория</Label>
                <Select defaultValue={currentProduct.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Одежда">Одежда</SelectItem>
                    <SelectItem value="Обувь">Обувь</SelectItem>
                    <SelectItem value="Спортивный инвентарь">Спортивный инвентарь</SelectItem>
                    <SelectItem value="Аксессуары">Аксессуары</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-price">Цена (₽)</Label>
                <Input 
                  id="edit-price" 
                  type="number" 
                  defaultValue={currentProduct.price.toString()} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-image">Изображения товара</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentProduct.images.map((image, index) => (
                    <div key={index} className="relative w-16 h-16 border rounded">
                      <div className="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer">
                        ✕
                      </div>
                    </div>
                  ))}
                </div>
                <Input id="edit-image" type="file" accept="image/*" multiple />
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Описание товара</Label>
                <Textarea 
                  id="edit-description" 
                  defaultValue={currentProduct.description} 
                  rows={5} 
                />
              </div>
              
              <div className="col-span-2">
                <h3 className="text-lg font-medium mb-2">Характеристики товара</h3>
                {Object.entries(currentProduct.characteristics).map(([key, value], index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-char-name-${index}`}>Название характеристики</Label>
                      <Input id={`edit-char-name-${index}`} defaultValue={key} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-char-value-${index}`}>Значение</Label>
                      <Input id={`edit-char-value-${index}`} defaultValue={value} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="mt-2">
                  Добавить характеристику
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}