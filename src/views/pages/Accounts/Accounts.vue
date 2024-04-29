<script setup lang="ts">
import AccountFormDialog from '@/components/Accounts/AccountFormDialog.vue'
import BaseDataList from '@/components/Base/BaseDataList.vue'
import BaseDeleteDialog from '@/components/Base/BaseDeleteDialog.vue'
import { useFetch } from '@/composables'
import useDialog from '@/composables/useDialog'
import { accountTypes } from '@/constants'
import services from '@/services'
import { iAccount, iPartial } from '@/types'
import { ref } from 'vue'

const { visible, show, hide } = useDialog()

const {
  visible: deleteDialogVisible,
  show: showDeleteDialog,
  hide: hideDeleteDialog,
} = useDialog()

const account = ref<iPartial<iAccount> | null>(null)

const { loading, data, fetch } = useFetch<iAccount[]>({
  initialValue: [],
  handler: services.accounts.fetchAll,
  options: {
    params: {
      include: 'cost_center',
    },
  },
  immediate: true,
})

const handleNew = (): void => {
  account.value = {
    name: '',
    account_type: 'checking',
    color: '374151',
    icon: '',
    initial_amount: 0.0,
  }

  show()
}

const handleEdit = (item: iAccount): void => {
  account.value = item
  show()
}

const handleDelete = (item: iAccount): void => {
  account.value = item
  showDeleteDialog()
}

const handleCancel = (): void => {
  account.value = null
  hide()
  hideDeleteDialog()
}

const handleSuccess = (): void => {
  fetch()
  handleCancel()
}

const formatAccountType = (item: iAccount): string =>
  accountTypes.find(({ id }) => id === item.account_type)?.name!
</script>

<template>
  <h3 class="flex justify-content-between align-items-center">
    Contas
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
        <span class="font-bold">
          {{ item.name }}
          <i
            v-if="item.is_default"
            class="pi pi-fw pi-check-circle text-primary"
          />
        </span>

        <small v-if="item.account_type" class="text-gray-400 block">
          {{ formatAccountType(item) }}</small
        >
        <small v-if="item.cost_center" class="text-gray-400 block">
          Centro de Custo: {{ item.cost_center.name }}
        </small>
      </div>
    </template>
  </BaseDataList>

  <BaseDeleteDialog
    :visible="deleteDialogVisible"
    :item="account"
    service="accounts"
    @cancel="handleCancel"
    @success="handleSuccess"
  />

  <AccountFormDialog
    v-if="account"
    :visible="visible"
    :account="account"
    @cancel="handleCancel"
    @success="handleSuccess"
  />
</template>
