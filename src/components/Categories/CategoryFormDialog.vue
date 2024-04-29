<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseIconPicker from '@/components/Base/BaseIconPicker.vue'
import { useForm } from '@/composables'
import services from '@/services'
import { iCategory, iPartial } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  category: iPartial<iCategory>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iCategory>>(props.category)

const service = computed<any>(() =>
  form.value.id ? services.categories.update : services.categories.create
)

const header = computed<string>(() =>
  form.value.id ? 'Editar Categoria' : 'Nova Categoria'
)

const { submitting, handleSubmit } = useForm<iCategory>({
  service: service.value,
  notify: 'all',
  message: 'Categoria salva com sucesso',
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
    id="category-form-dialog"
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
      append-to="#category-form-dialog"
      content-class="flex flex-column gap-3"
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

      <FormKit name="monthly_limit" label="Limite Mensal">
        <template #input>
          <InputNumber
            v-model="form.monthly_limit"
            locale="pt-BR"
            mode="currency"
            currency="BRL"
            :min-fraction-digits="2"
          />
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
