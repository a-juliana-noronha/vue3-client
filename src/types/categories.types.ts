import { iStatus, iTimestamps, iUser } from '@/types'

export type iCategory = {
  id?: number | null
  name: string | null
  description?: string | null
  icon?: string | null
  color?: string | null
  monthly_limit?: number | null
  status: iStatus
  user_id: number
  user: iUser
} & iTimestamps
