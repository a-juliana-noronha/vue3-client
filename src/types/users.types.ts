import { iStatus } from '@/types'

export type iRole = 'admin' | 'user'

export type iUser = {
  id?: number
  name: string
  email: string
  phone?: string | null
  role: iRole
  status: iStatus
}
