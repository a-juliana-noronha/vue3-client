<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseDropdown from '@/components/Base/BaseDropdown.vue'
import { useForm } from '@/composables'
import services from '@/services'
import { iPartial, iReminder } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  reminder: iPartial<iReminder>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iReminder>>(props.reminder)

const service = computed<any>(() =>
  form.value.id ? services.transactions.update : services.transactions.create
)

const header = computed<string>(() =>
  form.value.id ? 'Editar Lembrete' : 'Novo Lembrete'
)

const { submitting, handleSubmit } = useForm<iReminder>({
  service: service.value,
  notify: 'all',
  message: 'Lembrete salvo com sucesso',
  onSuccess: (): void => {
    emit('success')
  },
})

const handleCancel = (): void => {
  emit('cancel')
}

const handleAccountUpdate = (): void => {
  form.value.card_id = null
}
</script>

<template>
  <FormKit
    id="reminder-form-dialog"
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    @submit="handleSubmit"
  >
    <BaseDialog
      :visible="visible"
      fullscreen
      :header="header"
      :submitting="submitting"
      append-to="#reminder-form-dialog"
      content-class="flex flex-column gap-3"
      @cancel="handleCancel"
    >
      <FormKit name="account_id" label="Conta">
        <template #input>
          <BaseDropdown
            v-model="form.account_id!"
            service="accounts"
            filter
            show-clear
            placeholder="Selecione uma conta"
            @update:model-value="handleAccountUpdate"
          />
        </template>
      </FormKit>

      <FormKit name="category_id" label="Categoria">
        <template #input>
          <BaseDropdown
            v-model="form.category_id!"
            service="categories"
            filter
            placeholder="Selecione uma categoria"
          />
        </template>
      </FormKit>

      <FormKit name="name" label="Descrição" validation="required">
        <template #input>
          <InputText v-model="form.name" />
        </template>
      </FormKit>

      <FormKit name="amount" label="Valor">
        <template #input>
          <InputNumber
            v-model="form.amount"
            locale="pt-BR"
            mode="currency"
            currency="BRL"
            :min-fraction-digits="2"
          />
        </template>
      </FormKit>

      <FormKit
        name="due_day"
        label="Dia do Vencimento"
        type="number"
        validation="required|min:1|max:31"
        :validation-messages="{ required: 'Dia do vencimento é obrigatório' }"
      >
        <template #input>
          <InputNumber v-model="form.due_day" :min="1" :max="31" />
        </template>
      </FormKit>
    </BaseDialog>
  </FormKit>
</template>
