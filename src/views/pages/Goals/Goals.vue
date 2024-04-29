<script setup lang="ts">
import BaseDataList from '@/components/Base/BaseDataList.vue'
import GoalFormDialog from '@/components/Goals/GoalFormDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import services from '@/services'
import { useAuthStore } from '@/stores'
import { iGoal, iPartial } from '@/types'
import { ref } from 'vue'

const { visible, show, hide } = useDialog()

const { me } = useAuthStore()
const goal = ref<iPartial<iGoal> | null>(null)

const { loading, data, fetch } = useFetch<iGoal>({
  initialValue: [],
  handler: services.goals.fetchAll,

  immediate: true,
})

const handleNew = (): void => {
  goal.value = {
    name: '',
    icon: '',
    color: '374151',
    due_date: '',
    amount: 0.0,
  }

  show()
}

const handleEdit = (item: iGoal): void => {
  goal.value = item
  show()
}

const handleCancel = (): void => {
  goal.value = null
  hide()
}

const handleSuccess = (): void => {
  fetch()
  handleCancel()
}
</script>

<template>
  <h3 class="flex justify-content-between align-items-center">
    Metas
    <Button rounded icon="pi pi-fw pi-plus" @click="handleNew" />
  </h3>

  <BaseDataList :loading="loading" :data="data" @edit="handleEdit">
    <template #item="{ item }">
      <div class="text-900 w-full flex flex-column gap-1">
        <span class="font-bold">{{ item.name }} </span>

        <div>
          <small class="text-gray-400">
            Valor total: R$ {{ item.amount }}</small
          >
        </div>

        <div v-if="item.due_date">
          <small class="text-gray-400"> Prazo: {{ item.due_date }}</small>
        </div>
      </div>
    </template></BaseDataList
  >
  <GoalFormDialog
    v-if="goal"
    :visible="visible"
    :goal="goal"
    @cancel="handleCancel"
    @success="handleSuccess"
  />
</template>
