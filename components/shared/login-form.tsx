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
import { LoginRequest } from '@/shared/api/user/types'
import { cn } from '@/lib/utils'
import { Title } from './title'

const formSchema = z.object({
  username: z.string().email(),
  password: z.string().min(4)
})

interface Props {
  onSubmit: (request: LoginRequest) => void
  onResetPassword: (email: string) => void
  className?: string
}

export const LoginForm: React.FC<Props> = ({ onSubmit, className, onResetPassword }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FormField
          control={form.control}
          name="username"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Пароль</Title>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
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
