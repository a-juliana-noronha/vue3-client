<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseDropdown from '@/components/Base/BaseDropdown.vue'
import BaseIconPicker from '@/components/Base/BaseIconPicker.vue'
import CostCenterDropdown from '@/components/CostCenters/CostCenterDropdown.vue'
import { useForm } from '@/composables'
import { accountTypes } from '@/constants'
import services from '@/services'
import { iAccount, iPartial } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  account: iPartial<iAccount>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iAccount>>(props.account)

const service = computed<any>(() =>
  form.value.id ? services.accounts.update : services.accounts.create
)

const header = computed<string>(() =>
  form.value.id ? 'Editar Conta' : 'Nova Conta'
)

const { submitting, handleSubmit } = useForm<iAccount>({
  service: service.value,
  notify: 'all',
  message: 'Conta salva com sucesso',
  onSuccess: (): void => {
    emit('success')
  },
})

const handleCancel = (): void => {
  emit('cancel')
}
</script>

<template>
  <FormKit
    id="account-form-dialog"
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    form-class="flex flex-column gap-4"
    @submit="handleSubmit"
  >
    <BaseDialog
      :visible="visible"
      :header="header"
      :submitting="submitting"
      content-class="flex flex-column gap-3"
      append-to="#account-form-dialog"
      fullscreen
      @cancel="handleCancel"
    >
      <FormKit name="account_type" label="Tipo">
        <template #input>
          <BaseDropdown
            v-model="form.account_type!"
            :options="accountTypes"
            placeholder="Selecione um tipo de conta"
          />
        </template>
      </FormKit>

      <FormKit name="cost_center_id" label="Centro de Custo">
        <template #input>
          <CostCenterDropdown v-model="form.cost_center_id" />
        </template>
      </FormKit>

      <FormKit
        name="name"
        label="Nome*"
        validation="required"
        :validation-messages="{
          required: 'Nome é obrigatório',
        }"
      >
        <template #input>
          <InputText v-model="form.name" type="text" />
        </template>
      </FormKit>

      <FormKit name="is_default">
        <template #input>
          <span class="flex align-items-center gap-3">
            <label class="formkit-label block text-900 text-xl font-medium"
              >Conta padrão?</label
            >
            <InputSwitch v-model="form.is_default!" />
          </span>
        </template>
      </FormKit>

      <div class="p-fluid grid">
        <FormKit name="icon" label="Ícone" outer-class="col-6">
          <template #input>
            <BaseIconPicker v-model="form.icon" :color="form.color!" />
          </template>
        </FormKit>
        <FormKit name="color" label="Cor" outer-class="col-6">
          <template #input>
            <ColorPicker v-model="form.color" class="w-full lg:w-auto" />
          </template>
        </FormKit>
      </div>
    </BaseDialog>
  </FormKit>
</template>
