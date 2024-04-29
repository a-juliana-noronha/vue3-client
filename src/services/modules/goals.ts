import build from '@/services/build'
import { iGoal } from '@/types'

export default build<iGoal>({
  baseUrl: '/goals',
})
