export enum UserRole {
  SPORTSMAN = 'SPORTSMAN',
  AGENT = 'AGENT',
  ROOT = 'ROOT',
  SELLER = 'SELLER'
}

export interface User {
  id: number
  name: string
  surname: string
  email: string
  patronymic: string
  date_of_birth: Date
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
  new_password: string
  token: string
}
