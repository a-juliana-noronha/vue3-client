<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'
import { useFetch } from '@/composables'
import services from '@/services'
import { iFetchOptions, iTransaction, iTransactionType } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { stringToColor } from '@/utils/stringToColor'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

type iProps = {
  transactionType: iTransactionType
}

const props = defineProps<iProps>()

const date = ref<Date>(new Date())
const formattedDate = computed<string>(() =>
  dayjs(date.value).format('MM-YYYY')
)

const handleUpdateDate = (value: any): void => {
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

const reduceTransactions = (data: iTransaction[]) =>
  data.reduce((acc, transaction) => {
    const id = transaction.category_id ?? 'no_category'
    const name = transaction.category?.name ?? 'Sem Categoria'
    const color = transaction.category?.color
      ? `#${transaction.category?.color}`
      : stringToColor(name)
    const monthly_limit = transaction.category?.monthly_limit ?? 0
    const amount = acc[id]?.amount || 0 || transaction.amount
    const percent = transaction.category?.monthly_limit
      ? (amount * 100) / transaction.category.monthly_limit
      : amount

    return {
      ...acc,
      [id]: {
        id,
        name,
        color,
        monthly_limit,
        amount,
        percent,
      },
    }
  }, {})

const { loading, data, fetch, isEmpty } = useFetch<any>({
  initialValue: [],
  options: fetchOptions.value,
  handler: services.transactions.fetchAll,
  reduce: reduceTransactions,
  immediate: true,
})

const getPercentValue = (item: any): number =>
  item.monthly_limit ? (item.amount * 100) / item.monthly_limit : item.amount

const getPercentBarStyle = (item: any) => ({
  backgroundColor: item.color,
  width: `${getPercentValue(item)}%`,
  height: '10px',
})

type iSummaryType = 'percent' | 'amount'
const summaryType = ref<iSummaryType>('percent')

const isPercentSummaryType = computed<boolean>(
  () => summaryType.value === 'percent'
)

const toggleSummaryType = (value: iSummaryType): void => {
  summaryType.value = value
}

const router = useRouter()
const handleAdd = (): void => {
  router.push({ name: 'expenses', query: { nova: 'despesa' } })
}
</script>

<template>
  <div class="card mb-0">
    <div class="flex justify-content-between align-items-center">
      <h5 class="flex align-items-center justify-content-between gap-3 w-full">
        Mês
        <Calendar
          :model-value="date"
          show-icon
          date-format="M/yy"
          view="month"
          touch-u-i
          @update:model-value="handleUpdateDate"
        />
      </h5>
      <!-- <div>
        <Button
          icon="pi pi-ellipsis-v"
          class="p-button-text p-button-plain p-button-rounded"
          @click="$refs.menu2.toggle($event)"
        />
        <Menu ref="menu2" :popup="true" :model="items"></Menu>
      </div> -->
    </div>
    <BaseLoading v-if="loading" />
    <div v-else-if="isEmpty">Nenhum registro encontrado</div>
    <ul v-else class="list-none p-0 m-0 flex flex-column gap-2">
      <ButtonGroup class="flex mb-3">
        <Button
          label="Percentual"
          class="flex-1 p-2"
          icon="pi pi-percentage"
          :outlined="!isPercentSummaryType"
          @click="toggleSummaryType('percent')"
        />
        <Button
          label="Valor"
          icon="pi pi-dollar"
          class="flex-1 p-2"
          :outlined="isPercentSummaryType"
          @click="toggleSummaryType('amount')"
        />
      </ButtonGroup>
      <li
        v-for="category in data"
        :key="category.id"
        class="flex flex-column gap-2"
      >
        <span class="text-900 font-medium flex gap-1 align-items-center">
          {{ category.name }}

          <i
            v-if="category.percent > 100"
            class="pi pi-fw pi-exclamation-triangle text-orange-500"
          />
        </span>

        <div
          class="flex align-items-center flex-nowrap justify-content-between w-full flex-1 gap-3"
        >
          <div class="flex w-full flex-column gap-1">
            <div
              class="surface-300 border-round overflow-hidden w-full h-1"
              :style="getPercentBarStyle(category)"
            >
              <div :style="getPercentBarStyle(category)" />
            </div>
            <small v-if="category.monthly_limit" class="text-gray-400"
              >Limite mensal:
              {{ formatCurrency(category.monthly_limit) }}</small
            >
          </div>
          <div class="flex align-items-center gap-1">
            <span
              class="font-medium transaction-summary-card__percent-value text-right"
            >
              <template v-if="category.monthly_limit">
                <span v-if="isPercentSummaryType">
                  {{ category.percent }}%</span
                >
                <span v-else> {{ formatCurrency(category.amount) }} </span>
              </template>
              <template v-else> ∞ </template>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <hr class="my-4" />
    <div class="flex w-full justify-content-end">
      <div class="flex align-items-center gap-2 font-bold text-lg">
        Nova Despesa

        <Button icon="pi pi-plus" rounded raised @click="handleAdd" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transaction-summary-card {
  &__percent-value {
    width: 100px;
  }
}
</style>
