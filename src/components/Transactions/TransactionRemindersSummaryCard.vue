<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'
import { useFetch } from '@/composables'
import services from '@/services'
import { iFetchOptions, iReminder, iTransactionType } from '@/types'
import dayjs from 'dayjs'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

dayjs.locale('pt-br')

type iProps = {
  transactionType: iTransactionType
}

const props = defineProps<iProps>()

const date = ref<Date>(new Date())
const formattedDate = computed<string>(() =>
  dayjs(date.value).format('MM-YYYY')
)

const handleUpdateDate = (value: Date): void => {
  date.value = value
  fetch(fetchOptions.value)
}

const from = computed<string>(() => {
  const dayjsDate = dayjs(date.value)

  return `${dayjsDate.startOf('month').format('DD')}-${formattedDate.value}`
})

const to = computed<string>(() => {
  const dayjsDate = dayjs(date.value)

  return `${dayjsDate.endOf('month').format('DD')}-${formattedDate.value}`
})

const fetchOptions = computed<iFetchOptions>(() => ({
  params: {
    include: 'category',
    transaction_type: props.transactionType,
    from: from.value,
    to: to.value,
  },
}))

const transactionsPayments = ref({})

const reduceTransactions = (data: iReminder[]) => {
  transactionsPayments.value = data.reduce(
    (acc, transaction) => ({
      ...acc,
      [String(transaction.id)]: transaction.paid,
    }),
    {}
  )

  return data
}

const { loading, data, fetch, isEmpty } = useFetch<any>({
  initialValue: [],
  options: fetchOptions.value,
  handler: services.reminders.summary,
  reduce: reduceTransactions,
  immediate: true,
})

const toast = useToast()

const handleUpdatePaid = async (item: iReminder): Promise<void> => {
  const {
    name,
    amount,
    due_day,
    transaction_type,
    category_id,
    account_id = null,
    card_id = null,
  } = item

  // const day = dayjs(due_day).format('DD')
  const month = dayjs(date.value).format('MM')
  const year = dayjs(date.value).format('YYYY')

  const dateName = dayjs(date.value).format('MMMM[/]YYYY')

  await services.transactions.create({
    amount,
    category_id,
    account_id,
    card_id,
    transaction_type,
    name: `${name} - ${dateName}`,
    date: `${year}-${month}-${due_day}`,
    reminder_id: item.id,
    total_installments: 1,
  })

  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Lançamento realizado com sucesso',
    life: 3000,
  })
}
</script>

<template>
  <div class="card">
    <div class="flex justify-content-between align-items-center mb-5">
      <h5 class="flex align-items-center justify-content-between gap-3 w-full">
        Lembretes
        <Calendar
          :model-value="date"
          show-icon
          date-format="M/yy"
          view="month"
          touch-u-i
          @update:model-value="handleUpdateDate"
        />
      </h5>
    </div>
    <BaseLoading v-if="loading" />
    <div v-else-if="isEmpty">Nenhum registro encontrado</div>
    <ul v-else class="list-none p-0 m-0 flex flex-column gap-2">
      <li
        v-for="transaction in data"
        :key="transaction.id"
        class="text-900 flex gap-1 align-items-center justify-content-between mb-2"
      >
        <div class="flex flex-column gap-1">
          <span class="font-medium">{{ transaction.name }}</span>
          <small class="text-gray-400">{{ transaction.category.name }}</small>
        </div>
        <div class="flex align-items-center gap-3">
          <span
            class="font-medium flex-1 transaction-summary-card__percent-value"
            :style="{ color: transaction.color }"
          >
            R$ {{ transaction.amount }}
            <small class="text-gray-400 block text-right"
              >Todo dia {{ transaction.due_day }}</small
            >
          </span>
          <div>
            <InputSwitch
              v-model="transaction.paid"
              :disabled="transaction.paid"
              @update:model-value="handleUpdatePaid(transaction)"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.transaction-summary-card {
  &__percent-value {
    min-width: 35px;
  }
}
</style>
