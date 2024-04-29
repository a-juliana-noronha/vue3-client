<script setup lang="ts">
import BaseDataList from '@/components/Base/BaseDataList.vue'
import UserFormDialog from '@/components/Users/UserFormDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import services from '@/services'
import { iPartial, iUser } from '@/types'
import { ref } from 'vue'

const { visible, show, hide } = useDialog()

const user = ref<iPartial<iUser> | null>(null)

const { loading, data, fetch } = useFetch<iUser>({
  initialValue: [],
  handler: services.users.fetchAll,

  immediate: true,
})

const handleNew = (): void => {
  user.value = {
    name: '',
    email: '',
    phone: '',
    role: 'user',
  }

  show()
}

const handleEdit = (item: iUser): void => {
  user.value = item
  show()
}

const handleCancel = (): void => {
  user.value = null
  hide()
}

const handleSuccess = (): void => {
  fetch()
  handleCancel()
}
</script>

<template>
  <h3 class="flex justify-content-between align-items-center">
    Usuários
    <Button rounded icon="pi pi-fw pi-plus" @click="handleNew" />
  </h3>

  <BaseDataList :loading="loading" :data="data" @edit="handleEdit" />
  <UserFormDialog
    v-if="user"
    :visible="visible"
    :user="user"
    @cancel="handleCancel"
    @success="handleSuccess"
  />
</template>
