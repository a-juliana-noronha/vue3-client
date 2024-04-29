import {
  iAccount,
  iCard,
  iCategory,
  iStatus,
  iTimestamps,
  iTransactionType,
  iUser,
} from '@/types'

export type iReminder = {
  id?: number | null
  name: string
  transaction_type: iTransactionType
  amount: number
  due_day: number | null
  paid?: boolean | null
  status: iStatus
  user: iUser
  user_id: number
  category?: iCategory | null
  category_id?: number | null
  account?: iAccount | null
  account_id?: number | null
  card?: iCard | null
  card_id?: number | null
} & iTimestamps
