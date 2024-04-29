<script setup lang="ts">
import BaseDataList from '@/components/Base/BaseDataList.vue'
import BaseDeleteDialog from '@/components/Base/BaseDeleteDialog.vue'
import BaseMultiSelect from '@/components/Base/BaseMultiSelect.vue'
import ReminderFormDialog from '@/components/Reminders/ReminderFormDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import services from '@/services'
import { iFetchOptions, iPartial, iReminder } from '@/types'
import dayjs from 'dayjs'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

dayjs.locale('pt-br')

onBeforeMount(() => {
  const { query } = useRoute()
  if (query.novo) {
    handleNew()
  }
})

const {
  visible: reminderDialogVisible,
  show: showReminderDialog,
  hide: hideReminderDialog,
} = useDialog()

const {
  visible: deleteDialogVisible,
  show: showDeleteDialog,
  hide: hideDeleteDialog,
} = useDialog()

const reminder = ref<iPartial<iReminder> | null>(null)

const filter = ref<any>({
  category_ids: [],
})

const showFilter = ref<boolean>(false)

const filterIcon = computed<string>(() =>
  showFilter.value ? 'pi pi-fw pi-filter-slash' : 'pi pi-fw pi-filter'
)

const toggleFilter = (): void => {
  showFilter.value = !showFilter.value
}

const fetchOptions = computed<iFetchOptions>(() => {
  const options = {
    params: {
      include: 'category',
    },
  }

  if (filter.value.category_ids.length > 0) {
    // @ts-ignore
    options.params.category_ids = filter.value.category_ids.join(',')
  }

  return options
})

const handleFilterUpdate = (): void => {
  fetch(fetchOptions.value)
}

const handleClearFilter = (): void => {
  filter.value.category_ids = []
  handleFilterUpdate()
}

const { loading, data, fetch } = useFetch<iReminder[]>({
  initialValue: [],
  handler: services.reminders.fetchAll,
  options: fetchOptions.value,
  immediate: true,
})

const handleNew = (): void => {
  reminder.value = {
    name: '',
    transaction_type: 'expense',
    amount: 0.0,
    due_day: null,
    category_id: null,
    account_id: null,
    card_id: null,
  }

  showReminderDialog()
}

const handleEdit = (item: iReminder): void => {
  reminder.value = item
  showReminderDialog()
}

const handleSuccess = (): void => {
  fetch()
  handleCancel()
}

const handleDelete = (item: iReminder): void => {
  reminder.value = item
  showDeleteDialog()
}

const handleCancel = (): void => {
  reminder.value = null

  hideReminderDialog()
  hideDeleteDialog()
}
</script>

<template>
  <h3 class="flex justify-content-between align-items-center">
    Lembretes
    <span class="flex justify-content-between align-items-center gap-3">
      <Button rounded :icon="filterIcon" @click="toggleFilter" />
      <Button rounded icon="pi pi-fw pi-plus" @click="handleNew" />
    </span>
  </h3>

  <div class="flex flex-column gap-3">
    <Panel v-if="showFilter" header="Filtro">
      <div class="flex flex-column gap-3">
        <FormKit name="categories" label="Categorias">
          <template #input>
            <div class="flex align-items-center gap-3">
              <BaseMultiSelect
                v-model="filter.category_ids"
                service="categories"
                filter
                class="w-full"
                placeholder="Filtrar por categorias"
                @update:model-value="handleFilterUpdate"
              />
              <i
                v-if="filter.category_ids.length > 0"
                class="pi pi-fw pi-times cursor-pointer"
                @click="handleClearFilter"
              />
            </div>
          </template>
        </FormKit>
      </div>
    </Panel>

    <BaseDataList
      :loading="loading"
      :data="data"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #item="{ item }">
        <div class="text-900 w-full flex flex-column gap-1">
          <div class="font-bold text-xl flex align-items-center gap-3">
            <span> R$ {{ item.amount }} </span>
            <!-- <i
              class="pi pi-fw pi-bell cursor-pointer"
              :class="getStatusColor(item)"
              @click="toggleStatus(item)"
            /> -->
          </div>
          <span
            >{{ item.name }} / <small>{{ item.category?.name }}</small></span
          >

          <div>
            <small class="text-gray-400">{{ item.date }}</small>
            <small v-if="item.due_day" class="text-gray-400">
              Todo dia {{ item.due_day }}</small
            >
          </div>

          <small v-if="item.total_amount" class="text-gray-400">
            Valor total R$
            {{ item.total_amount }}
          </small>
        </div>
      </template>
    </BaseDataList>
  </div>

  <BaseDeleteDialog
    :visible="deleteDialogVisible"
    :item="reminder"
    service="reminders"
    @cancel="handleCancel"
    @success="handleSuccess"
  />

  <ReminderFormDialog
    v-if="reminder"
    :visible="reminderDialogVisible"
    :reminder="reminder"
    @cancel="handleCancel"
    @success="handleSuccess"
  />
</template>
