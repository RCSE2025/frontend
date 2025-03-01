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
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  country: z.string(),
  INN: z.number(),
  KPP: z.number(),
  OGRN: z.number(),
  short_name: z.string(),
  full_name: z.string(),
  owner: z.string()
})

interface Props {
  onSubmit: () => void
  className?: string
}

export const RegisterBusinessForm: React.FC<Props> = ({ onSubmit, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
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
                    <SelectValue placeholder="Российская Федерация" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="РФ">Российская Федерация</SelectItem>
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
          name="INN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">ИНН</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="KPP"
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
          name="OGRN"
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
