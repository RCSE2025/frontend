'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from '@/lib/zod'
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
import { RegionalAgentCreateRequest } from '@/shared/api/agents/types'
import { cn } from '@/lib/utils'
import { Title } from '@/components/shared/title'
import React from 'react'
import { ComboBox } from '@/components/ui/combo-box'
import { regionsMappedNames } from '@/shared/utils/regions'

const formSchema = z.object({
  email: z.string().email(),
  title: z.string(),
  description: z.string(),
  address: z.string(),
  telegram: z.string(),
  vk: z.string(),
  federal_subject: z.string(),
  phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, 'Неправильный номер телефона')
})

interface Props {
  onSubmit: (request: RegionalAgentCreateRequest) => void
  className?: string
}

export const RegisterAgentForm: React.FC<Props> = ({ onSubmit, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Название</Title>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Описание</Title>
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
          name="federal_subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Субъект РФ</Title>
              </FormLabel>
              <FormControl>
                <ComboBox
                  options={regionsMappedNames}
                  defaultValue={field.value}
                  onValueChange={(value) => {
                    field.onChange(value.value)
                  }}
                  className="w-full"
                  buttonClassName="w-full"
                />
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
                <Title>Адрес</Title>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Электронная почта</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Телефон</Title>
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
          name="telegram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Telegram</Title>
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
          name="vk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>VK</Title>
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
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
