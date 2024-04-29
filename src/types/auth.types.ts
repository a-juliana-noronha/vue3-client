import { iUser } from '@/types'

export type iAuthState = {
  token: string | null
  me: iUser | null
}

export type iLoginParams = {
  email: string
  password: string
}

export type iLoginResponse = {
  token: string
}

export type iCreateAccountParams = {
  name?: string
  email: string
  password: string
}
