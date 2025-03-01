'use client'

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
import { cn } from '@/lib/utils'
import { z } from '@/lib/zod'
import { LoginRequest } from '@/shared/api/user/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { Title } from './title'

const formSchema = z
  .object({
    username: z.string().email(),
    password: z.string().min(4),
    confirm: z.boolean()
  })
  .refine((data) => data.confirm, {
    message: 'Согласитесь с правилами площадки',
    path: ['confirm']
  })

interface Props {
  onSubmit: (request: LoginRequest) => void
  onResetPassword: (email: string) => void
  className?: string
}

export const LoginForm: React.FC<Props> = ({ onSubmit, className, onResetPassword }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: false
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Электронная почта</Title>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title size="xs">Пароль</Title>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(e) => {
                      form.setValue('confirm', e as boolean)
                      console.log(field)
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Соглашаюсь с правилами пользования торговой площадкой и возврата
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-theme w-full text-white">
          Войти
        </Button>
        <Button
          type="button"
          onClick={() => onResetPassword(form.getValues().username)}
          className="w-full !mt-4"
        >
          Восстановить пароль
        </Button>
      </form>
    </Form>
  )
}
