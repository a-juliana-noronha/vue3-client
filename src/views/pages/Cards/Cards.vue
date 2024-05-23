<script setup lang="ts">
import BaseDataList from '@/components/Base/BaseDataList.vue'
import BaseDeleteDialog from '@/components/Base/BaseDeleteDialog.vue'
import CardFormDialog from '@/components/Cards/CardFormDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import services from '@/services'
import { iCard, iPartial } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { ref } from 'vue'

const { visible, show, hide } = useDialog()

const {
  visible: deleteDialogVisible,
  show: showDeleteDialog,
  hide: hideDeleteDialog,
} = useDialog()

const card = ref<iPartial<iCard> | null>(null)

const { loading, data, fetch } = useFetch<iCard[]>({
  initialValue: [],
  handler: services.cards.fetchAll,
  options: {
    params: {
      include: 'cost_center',
    },
  },
  immediate: true,
})

const handleNew = (): void => {
  card.value = {
    name: '',
    icon: '',
    color: '374151',
    issuer: '',
    limit: 0.0,
  }

  show()
}

const handleEdit = (item: iCard): void => {
  card.value = item
  show()
}

const handleDelete = (item: iCard): void => {
  card.value = item
  showDeleteDialog()
}

const handleCancel = (): void => {
  card.value = null
  hide()
  hideDeleteDialog()
}

const handleSuccess = (): void => {
  fetch()
  handleCancel()
}
</script>

<template>
  <h3 class="flex justify-content-between align-items-center">
    Cartões
    <Button rounded icon="pi pi-fw pi-plus" @click="handleNew" />
  </h3>

  <BaseDataList
    :loading="loading"
    :data="data"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <template #item="{ item }">
      <div class="text-900 w-full flex flex-column gap-1">
        <span class="font-bold"
          >{{ item.name }}
          <i
            v-if="item.is_default"
            class="pi pi-fw pi-check-circle text-primary"
        /></span>

        <div v-if="item.limit">
          <small class="text-gray-400">
            Limite: {{ formatCurrency(item.limit) }}</small
          >
        </div>

        <div v-if="item.due_day">
          <small class="text-gray-400">
            Vencimento: todo dia {{ item.due_day }}</small
          >
        </div>
        <small v-if="item.cost_center" class="text-gray-400 block">
          Centro de Custo: {{ item.cost_center.name }}
        </small>
      </div>
    </template>
  </BaseDataList>

  <BaseDeleteDialog
    :visible="deleteDialogVisible"
    :item="card"
    service="cards"
    @cancel="handleCancel"
    @success="handleSuccess"
  />

  <CardFormDialog
    v-if="card"
    :visible="visible"
    :card="card"
    @cancel="handleCancel"
    @success="handleSuccess"
  />
</template>
