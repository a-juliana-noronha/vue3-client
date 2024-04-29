import { iStatus, iTimestamps } from '@/types'

export type iGoal = {
  id?: number | null
  name: string
  color?: string | null
  icon?: string | null
  amount: number
  due_date: string | number | null
  status: iStatus
  user_id: number
} & iTimestamps
