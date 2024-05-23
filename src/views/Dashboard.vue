<script setup lang="ts">
// import GoalsSummaryCard from '@/components/Goals/GoalsSummaryCard.vue'
import TransactionRemindersSummaryCard from '@/components/Transactions/TransactionRemindersSummaryCard.vue'
import TransactionSummaryCard from '@/components/Transactions/TransactionSummaryCard.vue'
import { useLayout } from '@/layout/composables/layout'
import { ref, watch } from 'vue'

// import { useRouter } from 'vue-router'

const { isDarkTheme } = useLayout()

// const products = ref(null)
// const lineData = reactive({
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'First Dataset',
//       data: [65, 59, 80, 81, 56, 55, 40],
//       fill: false,
//       backgroundColor: '#2f4860',
//       borderColor: '#2f4860',
//       tension: 0.4,
//     },
//     {
//       label: 'Second Dataset',
//       data: [28, 48, 40, 19, 86, 27, 90],
//       fill: false,
//       backgroundColor: '#00bb7e',
//       borderColor: '#00bb7e',
//       tension: 0.4,
//     },
//   ],
// })

const lineOptions = ref<any>(null)
// const productService = new ProductService()

// onMounted(() => {
//   productService.getProductsSmall().then((data) => (products.value = data))
// })

// const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

const applyLightTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  }
}

const applyDarkTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)',
        },
      },
      y: {
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)',
        },
      },
    },
  }
}

watch(
  isDarkTheme,
  (val) => {
    val ? applyDarkTheme() : applyLightTheme()
  },
  { immediate: true }
)

// const router = useRouter()

// const handleNewReminder = (): void => {
//   router.push({ name: 'reminders', query: { novo: 'lembrete' } })
// }
</script>

<template>
  <h3 class="flex justify-content-between align-items-center">
    Resumo das Despesas
  </h3>
  <div class="grid">
    <div class="col-12 xl:col-6 flex flex-column gap-3">
      <!-- <Button
        icon="pi pi-plus"
        class="w-full"
        label="Criar Nova Despesa"
        raised
        @click="handleNewExpense"
      /> -->
      <TransactionSummaryCard transaction-type="expense" />
      <!-- <Button
        icon="pi pi-plus"
        class="w-full"
        label="Criar Novo Lembrete"
        raised
        @click="handleNewReminder"
      /> -->
      <TransactionRemindersSummaryCard transaction-type="expense" />
    </div>
    <!-- <div class="col-12 xl:col-6 flex flex-column gap-3">
      <Button
        icon="pi pi-dollar"
        class="w-full"
        label="Nova Meta"
        @click="handleNewExpense"
      />
      <GoalsSummaryCard />
    </div> -->
  </div>
</template>
