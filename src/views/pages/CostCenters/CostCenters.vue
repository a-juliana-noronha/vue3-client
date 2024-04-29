<script setup lang="ts">
import BaseDataList from '@/components/Base/BaseDataList.vue'
import BaseDeleteDialog from '@/components/Base/BaseDeleteDialog.vue'
import CostCenterFormDialog from '@/components/CostCenters/CostCenterFormDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import services from '@/services'
import { iCostCenter, iPartial } from '@/types'
import { ref } from 'vue'

const { visible, show, hide } = useDialog()

const {
  visible: deleteDialogVisible,
  show: showDeleteDialog,
  hide: hideDeleteDialog,
} = useDialog()

const costCenter = ref<iPartial<iCostCenter> | null>(null)

const { loading, data, fetch } = useFetch<iCostCenter[]>({
  initialValue: [],
  handler: services.costCenters.fetchAll,
  options: {
    params: {
      include: 'accounts,cards',
    },
  },
  immediate: true,
})

const handleNew = (): void => {
  costCenter.value = {
    name: '',
    description: '',
    color: '374151',
    icon: '',
  }

  show()
}

const handleEdit = (item: iCostCenter): void => {
  costCenter.value = item
  show()
}

const handleDelete = (item: iCostCenter): void => {
  costCenter.value = item
  showDeleteDialog()
}

const handleCancel = (): void => {
  costCenter.value = null
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
    Centros de Custo
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
        <span class="font-bold">{{ item.name }} </span>
        <small class="text-gray-400 block">
          Contas vinculadas: {{ item.accounts.length }} / Cartões vinculadas:
          {{ item.cards.length }}
        </small>
      </div>
    </template>
  </BaseDataList>

  <BaseDeleteDialog
    :visible="deleteDialogVisible"
    :item="costCenter"
    service="costCenters"
    @cancel="handleCancel"
    @success="handleSuccess"
  />

  <CostCenterFormDialog
    v-if="costCenter"
    :visible="visible"
    :cost-center="costCenter"
    @cancel="handleCancel"
    @success="handleSuccess"
  />
</template>
