import { IAgent, UserStatus } from '@/app/root/requests/types'
import { userHttp as http } from '../common'
import { LoginRequest, ResetPassword, SignupRequest, UpdateUserRequest, User } from './types'

export const signUp = async (request: SignupRequest): Promise<User> => {
  const response = await http.post('/user/register', request)

  localStorage.setItem('access_token', response.data.access_token)
  localStorage.setItem('refresh_token', response.data.refresh_token)

  return response.data
}

export const logIn = async (request: LoginRequest): Promise<User> => {
  const formData = new FormData()

  formData.append('username', request.username)
  formData.append('password', request.password)

  const response = await http.post('/user/token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  localStorage.setItem('access_token', response.data.access_token)
  localStorage.setItem('refresh_token', response.data.refresh_token)

  return response.data
}

export const getUser = async (): Promise<User> => {
  try {
    const response = await http.get('/user/self')

    return response.data
  } catch (e: any) {
    if (e.response.status === 401 && e.response.data.detail === 'Token expired') {
      await refreshToken()

      return await getUser()
    }

    throw e
  }
}

export const deleteUser = async () => {
  await http.delete('/user')
}

export const refreshToken = async () => {
  const formData = new FormData()

  const refresh_token = localStorage.getItem('refresh_token')!

  formData.append('refresh_token', refresh_token)

  const response = await http.post('/user/refresh', formData)

  localStorage.setItem('access_token', response.data.access_token)
  localStorage.setItem('refresh_token', response.data.refresh_token)
}

export const logOut = async () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const sendEmail = async () => {
  await http.post('/user/email/send', null)
}

export const verifyEmail = async (code: string) => {
  await http.post('/user/email/verify?code=' + code, null)
}
export const updateUser = async (user: UpdateUserRequest) => {
  await http.put('/user', user)
}

export const resetPassword = async (request: ResetPassword) => {
  const formData = new FormData()

  formData.append('new_password', request.new_password)

  await http.post('/user/refresh/password')
}

export const sendResetPasswordEmail = async (email: string) => {
  const formData = new FormData()

  formData.append('email', email)

  await http.post('/user/email/send/password', formData)
}
