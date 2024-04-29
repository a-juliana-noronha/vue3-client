import { iStatus, iTimestamps, iUser } from '@/types'

export type iCostCenter = {
  id?: number | null
  name: string
  description?: string | null
  color?: string | null
  icon?: string | null
  initial_amount: number
  status: iStatus
  user: iUser
  user_id: number
} & iTimestamps
