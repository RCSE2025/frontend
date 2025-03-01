export enum UserRole {
  USER = 'user',
  SUPPORT = 'support',
  ROOT = 'admin',
  SELLER = 'business',
  SELF_EMPLOYED = 'self-employed'
}

export interface User {
  id: number
  name: string
  surname: string
  email: string
  patronymic: string
  date_of_birth: Date
  is_pasport_verified: boolean
  role: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface SignupRequest {
  name: string
  surname: string
  patronymic: string
  email: string
  password: string
  date_of_birth: Date
}

export interface UpdateUserRequest {
  name: string
  surname: string
  patronymic: string
  email: string
  date_of_birth: Date
}

export interface ResetPassword {
  password: string
  token: string
}
