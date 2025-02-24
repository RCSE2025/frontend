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
import { SignupRequest } from '@/shared/api/user/types'
import { cn } from '@/lib/utils'
import { Title } from './title'
import { ru } from 'date-fns/locale'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { format } from 'date-fns'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const roles = {
  SPORTSMAN: 'Спортсмен',
  AGENT: 'Представитель'
}

const formSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    surname: z.string(),
    patronymic: z.string(),
    date_of_birth: z.date(),
    role: z.enum(Object.keys(roles) as [keyof typeof roles]),
    password: z.string().min(4),
    confirm: z.string().min(4)
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm']
  })

interface Props {
  onSubmit: (request: SignupRequest) => void
  className?: string
}

export const SignUpForm: React.FC<Props> = ({ onSubmit, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date_of_birth: new Date(),
      role: 'SPORTSMAN'
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Фамилия</Title>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Имя</Title>
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
          name="patronymic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Отчество</Title>
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
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Дата рождения</Title>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger className="w-full">
                    <Input value={format(field.value, 'dd-MM-yyyy')} readOnly></Input>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Повторите пароль</Title>
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Title>Роль</Title>
              </FormLabel>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                {Object.entries(roles).map(([key, value], index) => (
                  <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                    <FormControl>
                      <RadioGroupItem value={key} />
                    </FormControl>
                    <FormLabel className="font-normal">{value}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-theme w-full text-white">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  )
}
