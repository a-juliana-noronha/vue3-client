import { iCostCenter, iStatus, iTimestamps, iUser } from '@/types'

export type iAccountType = 'checking' | 'saving'

export type iAccount = {
  id?: number | null
  name: string
  account_type: iAccountType
  color?: string | null
  icon?: string | null
  initial_amount: number
  is_default: boolean | null
  status: iStatus
  user: iUser
  user_id: number
  cost_center?: iCostCenter | null
  cost_center_id?: number | null
} & iTimestamps
