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
  inn: z.number()
})

interface Props {
  onSubmit: (data: any) => void
  className?: string
}

export const RegisterSelfEmployedForm: React.FC<Props> = ({ onSubmit, className }) => {
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

        <Button type="submit" className="bg-theme w-full text-white">
          Сохранить
        </Button>
      </form>
    </Form>
  )
}
