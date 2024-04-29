<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'
import { useFetch } from '@/composables'
import services from '@/services'
import { iFetchOptions, iTransaction, iTransactionType } from '@/types'
import { stringToColor } from '@/utils/stringToColor'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

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
</script>

<template>
  <div class="card">
    <div class="flex justify-content-between align-items-center">
      <h5 class="flex align-items-center justify-content-between gap-3 w-full">
        Despesas
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
          class="flex-1"
          icon="pi pi-percentage"
          :outlined="!isPercentSummaryType"
          @click="toggleSummaryType('percent')"
        />
        <Button
          label="Valor"
          icon="pi pi-dollar"
          class="flex-1"
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
            class="pi pi-fw pi-exclamation-triangle text-primary"
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
              >Limite mensal: R$ {{ category.monthly_limit }}</small
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
                <span v-else> R$ {{ category.amount }} </span>
              </template>
              <template v-else> ∞ </template>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.transaction-summary-card {
  &__percent-value {
    width: 100px;
  }
}
</style>
