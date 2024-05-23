<script setup lang="ts">
import BaseDataList from '@/components/Base/BaseDataList.vue'
import BaseDeleteDialog from '@/components/Base/BaseDeleteDialog.vue'
import CategoryFormDialog from '@/components/Categories/CategoryFormDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import services from '@/services'
import { iCategory, iPartial } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { ref } from 'vue'

const { visible, show, hide } = useDialog()

const {
  visible: deleteDialogVisible,
  show: showDeleteDialog,
  hide: hideDeleteDialog,
} = useDialog()

const category = ref<iPartial<iCategory> | null>(null)

const { loading, data, fetch } = useFetch<iCategory>({
  initialValue: [],
  handler: services.categories.fetchAll,

  immediate: true,
})

const handleNew = (): void => {
  category.value = {
    name: '',
    description: '',
    icon: '',
    color: '374151',
    monthly_limit: 0.0,
  }

  show()
}

const handleEdit = (item: iCategory): void => {
  category.value = item
  show()
}

const handleDelete = (item: iAccount): void => {
  category.value = item
  showDeleteDialog()
}

const handleCancel = (): void => {
  category.value = null
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
    Categorias
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

        <div v-if="item.monthly_limit">
          <small class="text-gray-400">
            Limite mensal: {{ formatCurrency(item.monthly_limit) }}</small
          >
        </div>
      </div>
    </template>
  </BaseDataList>

  <BaseDeleteDialog
    :visible="deleteDialogVisible"
    :item="category"
    service="categories"
    @cancel="handleCancel"
    @success="handleSuccess"
  />

  <CategoryFormDialog
    v-if="category"
    :visible="visible"
    :category="category"
    @cancel="handleCancel"
    @success="handleSuccess"
  />
</template>
