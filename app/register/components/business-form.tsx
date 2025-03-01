'use client'

import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { z } from '@/lib/zod'
import { getBusinessInfo } from '@/shared/api/business/methods'
import { CreateBusiness } from '@/shared/api/business/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  country: z.string(),
  inn: z.number(),
  kpp: z.number(),
  ogrn: z.number(),
  short_name: z.string(),
  full_name: z.string(),
  owner: z.string(),
  address: z.string()
})

interface Props {
  onSubmit: (data: CreateBusiness) => void
  className?: string
}

export const RegisterBusinessForm: React.FC<Props> = ({ onSubmit, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: 'Российская Федерация'
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title className="text-slate-400" size="xs">
                  Страна регистрации
                </Title>
              </FormLabel>
              <FormControl>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="РФ">{field.value}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">ИНН</Title>
              </FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()

                      getBusinessInfo(field.value).then((data) => {
                        if (data) {
                          const info = data.data

                          form.setValue('short_name', info.name.short_with_opf)
                          form.setValue('full_name', info.name.full_with_opf)
                          form.setValue('owner', info.management?.name || '')
                          form.setValue('ogrn', Number(info.ogrn))
                          form.setValue('kpp', Number(info.kpp))
                          form.setValue('address', info.address.value)
                        }
                      })
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value

                    form.setValue('inn', Number(value))
                  }}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kpp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">КПП</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ogrn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">ОГРН</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Краткое наименование продавца</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Полное наименование продавца</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Адрес регистрации</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">ФИО руководителя</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-theme w-full text-white">
          Сохранить
        </Button>
      </form>
    </Form>
  )
}
