<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseIconPicker from '@/components/Base/BaseIconPicker.vue'
import { useForm } from '@/composables'
import services from '@/services'
import { iGoal, iPartial } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  goal: iPartial<iGoal>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iGoal>>(props.goal)

const service = computed<any>(() =>
  form.value.id ? services.goals.update : services.goals.create
)

const header = computed<string>(() =>
  form.value.id ? 'Editar Meta' : 'Nova Meta'
)

const { submitting, handleSubmit } = useForm<iGoal>({
  service: service.value,
  notify: 'all',
  message: 'Meta salva com sucesso',
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
    id="goal-form-dialog"
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    @submit="handleSubmit"
  >
    <BaseDialog
      :visible="visible"
      :header="header"
      :submitting="submitting"
      append-to="#goal-form-dialog"
      content-class="flex flex-column gap-3"
      fullscreen
      @cancel="handleCancel"
    >
      <FormKit name="name" label="Nome" validation="required">
        <template #input>
          <InputText v-model="form.name" type="text" />
        </template>
      </FormKit>

      <FormKit name="amount" label="Valor Total">
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

      <FormKit name="due_date" label="Prazo">
        <template #input>
          <Calendar v-model="form.due_date" show-icon show-button-bar />
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
