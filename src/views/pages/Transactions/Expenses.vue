<script setup lang="ts">
import BaseDataList from '@/components/Base/BaseDataList.vue'
import BaseDeleteDialog from '@/components/Base/BaseDeleteDialog.vue'
import BaseMultiSelect from '@/components/Base/BaseMultiSelect.vue'
import TransactionFormDialog from '@/components/Transactions/TransactionFormDialog.vue'
import TransactionViewDialog from '@/components/Transactions/TransactionViewDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import services from '@/services'
import { useAuthStore } from '@/stores'
import {
  iFetchOptions,
  iPartial,
  iTransaction,
  iTransactionFilter,
} from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import dayjs from 'dayjs'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

dayjs.locale('pt-br')

onBeforeMount(() => {
  const { query } = useRoute()
  if (query.nova) {
    handleNew()
  }
})

const {
  visible: transactionDialogVisible,
  show: showTransactionDialog,
  hide: hideTransactionDialog,
} = useDialog()

const {
  visible: deleteDialogVisible,
  show: showDeleteDialog,
  hide: hideDeleteDialog,
} = useDialog()

const { me } = useAuthStore()
const transaction = ref<iPartial<iTransaction> | null>(null)
const readonly = ref<boolean>(false)

const currentDate = new Date()
const currentMonth = computed<string>(() => dayjs().format('MMMM'))

const filter = ref<iTransactionFilter>({
  from: dayjs(currentDate).startOf('month').toDate(),
  to: dayjs(currentDate).endOf('month').toDate(),
  category_ids: [],
  has_payment_plan: null,
  description: '',
})
const showFilter = ref<boolean>(false)

const filterIcon = computed<string>(() =>
  showFilter.value ? 'pi pi-fw pi-filter-slash' : 'pi pi-fw pi-filter'
)

const toggleFilter = (): void => {
  showFilter.value = !showFilter.value
}

const handleFilterFromUpdate = (value: any): void => {
  const from = dayjs(value)
  const to = dayjs(filter.value.to)

  if (from.isAfter(to)) {
    // @ts-ignore
    filter.value.to = dayjs(filter.value.to).add(1, 'month').toDate()
  }

  fetch(fetchOptions.value)
}

const handleFilterUpdate = (): void => {
  fetch(fetchOptions.value)
}

const fetchOptions = computed<iFetchOptions>(() => {
  const options = {
    params: {
      include: 'category,payment_plan,card,account',
    },
  }

  if (filter.value.from) {
    // @ts-ignore
    options.params.from = dayjs(filter.value.from).format('YYYY-MM-DD')
  }

  if (filter.value.to) {
    // @ts-ignore
    options.params.to = dayjs(filter.value.to).format('YYYY-MM-DD')
  }

  if (filter.value.category_ids.length > 0) {
    // @ts-ignore
    options.params.category_ids = filter.value.category_ids.join(',')
  }

  return options
})

const { loading, data, fetch } = useFetch<iTransaction[]>({
  initialValue: [],
  handler: services.transactions.fetchAll,
  options: fetchOptions.value,
  immediate: true,
})

const handleNew = (): void => {
  transaction.value = {
    account_id: null,
    category_id: null,
    name: '',
    amount: 0.0,
    date: new Date(),
    total_installments: 1,
    user_id: me?.id,
    transaction_type: 'expense',
  }

  showTransactionDialog()
}

const isReadonly = (item: iTransaction): boolean => !!item.payment_plan_id

const handleEdit = (item: iTransaction): void => {
  transaction.value = item
  readonly.value = false
  showTransactionDialog()
}

const handleView = (item: iTransaction): void => {
  transaction.value = item
  readonly.value = true
  showTransactionDialog()
}

const handleSuccess = (): void => {
  fetch()
  handleCancel()
}

const handleDelete = (item: iTransaction): void => {
  transaction.value = item
  showDeleteDialog()
}

const handleCancel = (): void => {
  transaction.value = null

  hideTransactionDialog()
  hideDeleteDialog()
}

const getItemDate = (item: iTransaction): string =>
  formatDate(item.payment_plan ? item.payment_plan.created_at : item.created_at)

// @ts-ignore
const filteredData = computed<iTransaction[]>(() =>
  filter.value.description
    ? data.value.filter((transaction) =>
        // @ts-ignore
        transaction.name
          .toLowerCase()
          .includes(filter.value.description.toLowerCase())
      )
    : data.value
)
</script>

<template>
  <h3 class="flex justify-content-between align-items-center">
    Despesas {{ currentMonth }}
    <span class="flex justify-content-between align-items-center gap-3">
      <Button rounded :icon="filterIcon" @click="toggleFilter" />
      <Button rounded icon="pi pi-fw pi-plus" @click="handleNew" />
    </span>
  </h3>

  <div class="flex flex-column gap-3">
    <div class="flex gap-3">
      <FormKit name="date" label="De">
        <template #input>
          <Calendar
            v-model="filter.from"
            show-icon
            show-button-bar
            date-format="dd/M/y"
            touch-u-i
            @update:model-value="handleFilterFromUpdate"
          />
        </template>
      </FormKit>
      <FormKit name="date" label="Até">
        <template #input>
          <Calendar
            v-model="filter.to"
            show-icon
            show-button-bar
            date-format="dd/M/y"
            touch-u-i
            @update:model-value="handleFilterUpdate"
          />
        </template>
      </FormKit>
    </div>
    <InputText
      v-model="filter.description"
      placeholder="Digite para pesquisar..."
    />
    <Panel v-if="showFilter" header="Filtro">
      <div class="flex flex-column gap-3">
        <FormKit name="categories" label="Categorias">
          <template #input>
            <BaseMultiSelect
              v-model="filter.category_ids"
              service="categories"
              filter
              class="w-full"
              placeholder="Filtrar por categorias"
              @update:model-value="handleFilterUpdate"
            />
          </template>
        </FormKit>
        <FormKit>
          <template #input>
            <span class="flex align-items-center gap-3">
              <label class="formkit-label block text-900 text-xl font-medium"
                >Despesas parceladas</label
              >
              <InputSwitch
                v-model="filter.has_payment_plan!"
                @update:model-value="handleFilterUpdate"
              />
            </span>
          </template>
        </FormKit>
      </div>
    </Panel>

    <BaseDataList
      :loading="loading"
      :data="filteredData"
      :readonly="isReadonly"
      @edit="handleEdit"
      @view="handleView"
      @delete="handleDelete"
    >
      <template #item="{ item }">
        <div class="text-900 w-full flex flex-column gap-1">
          <div class="font-bold text-xl flex align-items-center gap-3">
            <span>
              {{ formatCurrency(item.amount) }}
              <span
                v-if="item.payment_plan"
                class="inline-flex align-items-center gap-1"
              >
                ({{ item.current_installment }}/{{
                  item.payment_plan.total_installments
                }})

                <i class="text-gray-400 pi pi-fw pi-sync text-sm" />
              </span>
            </span>
          </div>
          <span
            >{{ item.name }} /
            <small>{{ item.category?.name || 'Sem categoria' }}</small></span
          >

          <small class="text-gray-400">
            Criado em: {{ getItemDate(item) }}
          </small>
          <small v-if="item.date" class="text-gray-400 block">
            Competência: {{ formatDate(item.date) }}</small
          >

          <small v-if="item.amount_per_installment" class="text-gray-400">
            Valor total
            {{ formatCurrency(item.amount) }}
          </small>
        </div>
      </template>
    </BaseDataList>
  </div>

  <BaseDeleteDialog
    :visible="deleteDialogVisible"
    :item="transaction"
    service="transactions"
    @cancel="handleCancel"
    @success="handleSuccess"
  />

  <template v-if="transaction">
    <TransactionViewDialog
      v-if="readonly"
      :visible="transactionDialogVisible"
      :transaction="transaction"
      :readonly="readonly"
      @cancel="handleCancel"
      @success="handleSuccess"
    />
    <TransactionFormDialog
      v-else
      :visible="transactionDialogVisible"
      :transaction="transaction"
      @cancel="handleCancel"
      @success="handleSuccess"
    />
  </template>
</template>
