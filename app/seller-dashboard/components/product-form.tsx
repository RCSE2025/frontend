'use client'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormEvent, useState } from 'react'

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  buttonText?: string
  data?: DataType
}

interface DataType {
  title: string
  description: string
  price: number
  category: string
  quantity: number
  brand: string
  sku: string
  estimated_delivery: string
  business_id: number
  rating: number
  review_count: number
  discount: number
}

export const ProductForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  buttonText = 'Добавить',
  data
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Название товара</Label>
          <Input id="title" name="title" placeholder="Введите название товара" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Категория</Label>
          <Select name="category" required>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
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
          <Label htmlFor="price">Цена (₽)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="0"
            required
            defaultValue={data?.price}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Количество</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="0"
            required
            defaultValue={data?.quantity}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Бренд</Label>
          <Input
            id="brand"
            name="brand"
            placeholder="Введите название бренда"
            required
            defaultValue={data?.brand}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">Артикул</Label>
          <Input
            id="sku"
            name="sku"
            placeholder="Введите артикул товара"
            required
            defaultValue={data?.sku}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="files">Медиа товара</Label>
          <Input id="files" name="files" type="file" multiple required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimated_delivery">Срок доставки</Label>
          <Input
            id="estimated_delivery"
            name="estimated_delivery"
            placeholder="Например: 3-5 дней"
            required
            defaultValue={data?.estimated_delivery}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Описание товара</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Введите подробное описание товара"
            rows={5}
            required
            defaultValue={data?.description}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{buttonText}</Button>
      </DialogFooter>
    </form>
  )
}
