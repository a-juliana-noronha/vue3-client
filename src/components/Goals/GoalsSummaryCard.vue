<script setup lang="ts">
// import BaseLoading from '@/components/Base/BaseLoading.vue'
// import { useFetch } from '@/composables'
// import services from '@/services'
// import { iFetchOptions } from '@/types'
// import { stringToColor } from '@/utils/stringToColor'
// import dayjs from 'dayjs'
// import { computed, ref } from 'vue'

// const date = ref<Date>(new Date())
// const formattedDate = computed<string>(() =>
//   dayjs(date.value).format('MM-YYYY')
// )

// const handleUpdateDate = (value: Date): void => {
//   date.value = value
//   fetch(fetchOptions.value)
// }

// const from = computed<string>(() => {
//   const dayjsDate = dayjs(date.value)

//   return `${dayjsDate.startOf('month').format('DD')}-${formattedDate.value}`
// })

// const to = computed<string>(() => {
//   const dayjsDate = dayjs(date.value)

//   return `${dayjsDate.endOf('month').format('DD')}-${formattedDate.value}`
// })

// const fetchOptions = computed<iFetchOptions>(() => ({
//   params: {
//     include: 'transactions',
//     from: from.value,
//     to: to.value,
//   },
// }))

// const reduceTransactions = (data: iGoal[]) =>
//   data.reduce((acc, goal) => {
//     const id = goal.id ?? 'no_category'
//     const name = transaction.category?.name ?? 'Sem Categoria'
//     const color = `#${transaction.category?.color}` ?? stringToColor(String(id))
//     const monthly_limit = transaction.category?.monthly_limit ?? 0
//     const amount =
//       (acc[id]?.amount || 0) + transaction.amount_per_installment ||
//       transaction.amount
//     const percent = transaction.category?.monthly_limit
//       ? (amount * 100) / transaction.category.monthly_limit
//       : amount

//     return {
//       ...acc,
//       [id]: {
//         id,
//         name,
//         color,
//         monthly_limit,
//         amount,
//         percent,
//       },
//     }
//   }, {})

// const { loading, data, fetch, isEmpty } = useFetch<any>({
//   initialValue: [],
//   options: fetchOptions.value,
//   handler: services.goals.fetchAll,
//   reduce: reduceTransactions,
//   immediate: true,
// })

// const getPercentValue = (item: any): number =>
//   item.monthly_limit ? (item.amount * 100) / item.monthly_limit : item.amount

// const getPercentBarStyle = (item: any) => ({
//   backgroundColor: item.color,
//   width: `${getPercentValue(item)}%`,
//   height: '10px',
// })
</script>

<template>
  <div class="card">
    <div class="flex justify-content-between align-items-center mb-5">
      <h5 class="flex align-items-center justify-content-between gap-3 w-full">
        <!-- Metas
        <Calendar
          :model-value="date"
          show-icon
          date-format="M/yy"
          view="month"
          touch-u-i
          @update:model-value="handleUpdateDate"
        /> -->
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
    <!-- <BaseLoading v-if="loading" />
    <div v-else-if="isEmpty">Nenhum registro encontrado</div>-->
    <!-- <ul v-else class="list-none p-0 m-0 flex flex-column gap-2">
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
          class="flex align-items-center justify-content-between w-full flex-1 gap-3"
        >
          <div
            class="surface-300 border-round overflow-hidden w-full h-1"
            :style="getPercentBarStyle(category)"
          >
            <div class="h-full" :style="getPercentBarStyle(category)" />
          </div>
          <div class="flex align-items-center gap-1">
            <span
              class="font-medium flex-1 transaction-summary-card__percent-value"
              :style="{ color: category.color }"
            >
              {{ category.percent }}%
            </span>
          </div>
        </div>
      </li>
    </ul> -->
  </div>
</template>

<style lang="scss" scoped>
.transaction-summary-card {
  &__percent-value {
    min-width: 35px;
  }
}
</style>
