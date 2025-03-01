'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/shared/store/useUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UpdateUserRequest, User } from '@/shared/api/user/types'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не менее 2 символов',
  }),
  surname: z.string().min(2, {
    message: 'Фамилия должна содержать не менее 2 символов',
  }),
  patronymic: z.string().optional(),
  email: z.string().email({
    message: 'Введите корректный email',
  }),
  date_of_birth: z.date({
    required_error: 'Пожалуйста, выберите дату рождения',
  }),
})

const PasswordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: 'Пароль должен содержать не менее 8 символов',
  }),
  newPassword: z.string().min(8, {
    message: 'Пароль должен содержать не менее 8 символов',
  }),
  confirmPassword: z.string().min(8, {
    message: 'Пароль должен содержать не менее 8 символов',
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})

export function UserProfile() {
  const { user, patchUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || '',
      surname: user.surname || '',
      patronymic: user.patronymic || '',
      email: user.email || '',
      date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : new Date(),
    },
  })

  const passwordForm = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        surname: user.surname || '',
        patronymic: user.patronymic || '',
        email: user.email || '',
        date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : new Date(),
      })
    }
  }, [user, form])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updateData: UpdateUserRequest = {
        name: values.name,
        surname: values.surname,
        patronymic: values.patronymic || '',
        email: values.email,
        date_of_birth: values.date_of_birth,
      }
      
      await patchUser(updateData)
      
      // Здесь должна быть логика для загрузки аватара, если он был изменен
      if (avatarFile) {
        // Пример: await uploadAvatar(avatarFile)
        console.log('Загрузка аватара:', avatarFile)
      }
      
      toast.success('Профиль успешно обновлен')
      setIsEditing(false)
    } catch (error) {
      toast.error('Ошибка при обновлении профиля')
      console.error(error)
    }
  }

  const onPasswordSubmit = async (values: z.infer<typeof PasswordFormSchema>) => {
    try {
      // Здесь должна быть логика для смены пароля
      // Пример: await changePassword(values.currentPassword, values.newPassword)
      console.log('Смена пароля:', values)
      
      toast.success('Пароль успешно изменен')
      setIsChangingPassword(false)
      passwordForm.reset()
    } catch (error) {
      toast.error('Ошибка при смене пароля')
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Профиль пользователя</CardTitle>
          <CardDescription>
            Управляйте своими персональными данными и настройками аккаунта
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || undefined} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0)}{user.surname?.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <div>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                    Загрузить фото
                  </div>
                  <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarChange}
                  />
                </Label>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Имя</Label>
                  <div className="font-medium">{user.name}</div>
                </div>
                <div>
                  <Label>Фамилия</Label>
                  <div className="font-medium">{user.surname}</div>
                </div>
                <div>
                  <Label>Отчество</Label>
                  <div className="font-medium">{user.patronymic || '—'}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div className="font-medium">{user.email}</div>
                </div>
                <div>
                  <Label>Дата рождения</Label>
                  <div className="font-medium">
                    {user.date_of_birth 
                      ? format(new Date(user.date_of_birth), 'PPP', { locale: ru }) 
                      : '—'}
                  </div>
                </div>
                <div>
                  <Label>Роль</Label>
                  <div className="font-medium">{user.role}</div>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button onClick={() => setIsEditing(true)}>
                  Редактировать профиль
                </Button>
                <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                  Сменить пароль
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите имя" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Фамилия</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите фамилию" {...field} />
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
                        <FormLabel>Отчество</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите отчество" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Дата рождения</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ru })
                                ) : (
                                  <span>Выберите дату</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-4 mt-6">
                  <Button type="submit">Сохранить</Button>
                  <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                    Отмена
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {isChangingPassword && (
            <>
              <Separator className="my-6" />
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <CardTitle className="text-xl mb-4">Смена пароля</CardTitle>
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Текущий пароль</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Введите текущий пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Введите новый пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтверждение пароля</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Подтвердите новый пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-4 mt-6">
                    <Button type="submit">Сменить пароль</Button>
                    <Button variant="outline" type="button" onClick={() => setIsChangingPassword(false)}>
                      Отмена
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}