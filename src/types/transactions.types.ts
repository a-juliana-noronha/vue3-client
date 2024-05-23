import {
  iAccount,
  iCard,
  iCategory,
  iGoal,
  iStatus,
  iTimestamps,
  iUser,
} from '@/types'

export type iTransactionType = 'expense' | 'revenue'

export type iTransaction = {
  id?: number | null
  name: string
  transaction_type: iTransactionType
  amount: number
  date: string | Date
  total_installments: number
  current_installment: number | null
  status: iStatus
  user: iUser
  user_id: number
  goal?: iGoal | null
  goal_id?: number | null
  account?: iAccount | null
  account_id?: number | null
  category?: iCategory | null
  category_id?: number | null
  card?: iCard | null
  card_id?: number | null
  payment_plan?: any | null
  payment_plan_id?: number | null
} & iTimestamps

export type iTransactionFilter = {
  from: string | Date | null
  to: string | Date | null
  category_ids: number[]
  has_payment_plan: boolean | null
  description: string
}
