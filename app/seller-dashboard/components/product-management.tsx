'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { API } from '@/shared/api'
import {
  createProduct,
  deleteProduct,
  updateProduct,
  uploadProductFiles
} from '@/shared/api/business-panel/methods'
import { IProduct } from '@/shared/api/business-panel/types'
import { userHttp } from '@/shared/api/common'
import { IProductStatusType } from '@/shared/api/product/types'
import { format } from 'date-fns'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ProductForm } from './product-form'

export function ProductManagement() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [businessIdUser, setBusinessIdUser] = useState<number>(0)

  const fetchBusinessIdUser = useCallback(async () => {
    const response1 = await API.Product.getAllProductsWithStatuses()
    setProducts(response1 as any)

    const response = await userHttp.get('/business/user')
    setBusinessIdUser(response.data[0].id)
  }, [])

  useEffect(() => {
    fetchBusinessIdUser()
  }, [])

  // Функция для фильтрации товаров по статусу
  const filteredProducts = activeTab === 'all' ? products : products.filter((product) => true)

  // Функция для открытия диалога добавления товара
  const openAddDialog = () => {
    setCurrentProduct(null)
    setIsAddDialogOpen(true)
  }

  // Функция для открытия диалога редактирования товара
  const openEditDialog = (product: IProduct) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  // Функция для отправки товара на модерацию
  const sendToModeration = (productId: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, status: 'consideration' as IProductStatusType, updated_at: new Date() }
          : product
      )
    )
  }

  // Функция для удаления товара
  const delProduct = async (productId: number) => {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
      setProducts(products.filter((product) => product.id !== productId))

      await deleteProduct(productId);
    }
  }

  const getPayload = (formData: FormData) => {
    const productData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      category: formData.get('category') as string,
      quantity: Number(formData.get('quantity')),
      brand: formData.get('brand') as string,
      sku: formData.get('sku') as string,
      estimated_delivery: '3-5 дней',
      business_id: businessIdUser,
      rating: 0,
      review_count: 0,
      discount: 0
    }

    return productData
  }

  // Функция для создания нового товара
  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Создаем базовый товар
      const productData = getPayload(formData)

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

  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Создаем базовый товар
      const productData = getPayload(formData)

      const newProduct = await updateProduct({
        ...productData,
        id: currentProduct!.id
      })

      // Загружаем изображения
      // const files = formData.getAll('files') as File[]
      // await uploadProductFiles({
      //   files: files,
      //   productId: newProduct.id
      // })

      setIsEditDialogOpen(false)
      toast.success('Товар успешно изменен')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Ошибка при изменении товара')
    }
  }

  // Функция для получения цвета бейджа статуса
  const getStatusBadgeVariant = (status: IProductStatusType) => {
    switch (status) {
      case 'consideration':
        return 'warning'
      case 'approve':
        return 'success'
      case 'reject':
        return 'destructive'
      default:
        return 'default'
    }
  }

  // Функция для получения текста статуса
  const getStatusText = (status: IProductStatusType) => {
    switch (status) {
      case 'consideration':
        return 'На модерации'
      case 'approve':
        return 'Одобрен'
      case 'reject':
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
                    <Badge variant={getStatusBadgeVariant(product.status! as any) as any}>
                      {getStatusText(product.status as any)}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(product.updated_at, 'dd-MM-yyyy')}</TableCell>
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
                        onClick={() => delProduct(product.id)}
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
              {/* {currentProduct?.status === 'rejected' && (
                <div className="mt-2 p-3 bg-red-50 text-red-800 rounded-md">
                  <strong>Причина отклонения:</strong> {currentProduct.rejectionReason}
                </div>
              )} */}
            </DialogDescription>
          </DialogHeader>

          {currentProduct && (
            <ProductForm
              onSubmit={handleUpdateProduct}
              onCancel={() => setIsEditDialogOpen(false)}
              buttonText="Сохранить изменения"
              data={currentProduct}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
