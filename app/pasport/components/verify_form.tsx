'use client'

import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { z } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const formSchema = z.object({
  date: z.date(),
  series: z.string(),
  number: z.string()
})

interface Props {
  onSubmit: (request: any) => void
  className?: string
}

export const PasportForm: React.FC<Props> = ({ onSubmit, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date()
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => {
          console.error(err)
          console.log(form.getValues())
        })}
        className={cn('space-y-8', className)}
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Дата выдачи</Title>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger className="w-full">
                    <Input value={format(field.value, 'dd-MM-yyyy')} readOnly></Input>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1960}
                      toDate={new Date()}
                      onSelect={(date) => field.onChange(date)}
                      selected={field.value}
                      locale={ru}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="series"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Серия</Title>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="string" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Номер</Title>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="string" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-theme w-full text-white">
          Подтвердить
        </Button>
      </form>
    </Form>
  )
}
