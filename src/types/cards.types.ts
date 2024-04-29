import { iAccount, iStatus, iTimestamps, iUser } from '@/types'

export type iCard = {
  id?: number | null
  name: string
  issuer: string
  icon?: string | null
  color?: string | null
  limit: number
  closing_day: number | null
  due_day: number | null
  is_default: boolean | null
  status: iStatus
  user: iUser
  user_id: number
  account?: iAccount | null
  account_id?: number | null
} & iTimestamps
