<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseIconPicker from '@/components/Base/BaseIconPicker.vue'
import { useForm } from '@/composables'
import services from '@/services'
import { iCostCenter, iPartial } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  costCenter: iPartial<iCostCenter>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iCostCenter>>(props.costCenter)

const service = computed<any>(() =>
  form.value.id ? services.costCenters.update : services.costCenters.create
)

const header = computed<string>(() =>
  form.value.id ? 'Editar Centro de Custo' : 'Novo Centro de Custo'
)

const { submitting, handleSubmit } = useForm<iCostCenter>({
  service: service.value,
  notify: 'all',
  message: 'Centro de custo salvo com sucesso',
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
    id="cost-center-form-dialog"
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
      append-to="#cost-center-form-dialog"
      fullscreen
      @cancel="handleCancel"
    >
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

      <FormKit name="description" label="Descrição">
        <template #input>
          <Textarea v-model="form.description" />
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
