'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { createProduct, uploadProductFiles } from '@/shared/api/business-panel/methods'
import { IProduct } from '@/shared/api/business-panel/types'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { ProductForm } from './product-form'

// Типы для товаров
type ProductStatus = 'pending' | 'approved' | 'rejected'

interface Product extends Omit<IProduct, 'created_at' | 'updated_at'> {
  status: ProductStatus
  rejectionReason?: string
  created_at: Date
  updated_at: Date
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState<string>('all')

  // Функция для фильтрации товаров по статусу
  const filteredProducts =
    activeTab === 'all' ? products : products.filter((product) => product.status === activeTab)

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
  const sendToModeration = (productId: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, status: 'pending' as ProductStatus, updated_at: new Date() }
          : product
      )
    )
  }

  // Функция для удаления товара
  const deleteProduct = (productId: number) => {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
      setProducts(products.filter((product) => product.id !== productId))
    }
  }

  // Функция для создания нового товара
  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Создаем базовый товар
      const productData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        category: formData.get('category') as string,
        quantity: Number(formData.get('quantity')),
        brand: formData.get('brand') as string,
        sku: formData.get('sku') as string,
        estimated_delivery: '3-5 дней',
        business_id: 1, // Здесь должен быть реальный business_id
        rating: 0,
        review_count: 0,
        discount: 0
      }

      const newProduct = await createProduct(productData)

      // Загружаем изображения
      const files = formData.getAll('files') as File[]
      await uploadProductFiles({
        files: files,
        productId: newProduct.id
      })

      setIsAddDialogOpen(false)
      toast.success('Товар успешно создан')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Ошибка при создании товара')
    }
  }

  // Функция для получения цвета бейджа статуса
  const getStatusBadgeVariant = (status: ProductStatus) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'destructive'
      default:
        return 'default'
    }
  }

  // Функция для получения текста статуса
  const getStatusText = (status: ProductStatus) => {
    switch (status) {
      case 'pending':
        return 'На модерации'
      case 'approved':
        return 'Одобрен'
      case 'rejected':
        return 'Отклонен'
      default:
        return status
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
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price} ₽</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(product.status) as any}>
                      {getStatusText(product.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.updated_at.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                        Редактировать
                      </Button>

                      {product.status === 'rejected' && (
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

          <ProductForm onSubmit={handleCreateProduct} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования товара */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogDescription>
              Внесите изменения в информацию о товаре.
              {currentProduct?.status === 'rejected' && (
                <div className="mt-2 p-3 bg-red-50 text-red-800 rounded-md">
                  <strong>Причина отклонения:</strong> {currentProduct.rejectionReason}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {currentProduct && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Название товара</Label>
                <Input id="edit-title" defaultValue={currentProduct.title} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Категория</Label>
                <Select defaultValue={currentProduct.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SPORTS">Спорт</SelectItem>
                    <SelectItem value="ELECTRONICS">Электроника</SelectItem>
                    <SelectItem value="HOME">Дом</SelectItem>
                    <SelectItem value="FASHION">Мода</SelectItem>
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

              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Количество</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  defaultValue={currentProduct.quantity.toString()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-brand">Бренд</Label>
                <Input id="edit-brand" defaultValue={currentProduct.brand} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-sku">Артикул</Label>
                <Input id="edit-sku" defaultValue={currentProduct.sku} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-estimated-delivery">Срок доставки</Label>
                <Input
                  id="edit-estimated-delivery"
                  defaultValue={currentProduct.estimated_delivery}
                />
              </div>

              <div className="col-span-2">
                <h3 className="text-lg font-medium mb-2">Спецификации товара</h3>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="space-y-2">
                    <Label>Название</Label>
                    <Input defaultValue={currentProduct.specifications.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Значение</Label>
                    <Input defaultValue={currentProduct.specifications.value} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
