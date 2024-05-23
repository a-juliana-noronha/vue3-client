<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseIconPicker from '@/components/Base/BaseIconPicker.vue'
import CardBrandDropdown from '@/components/Cards/CardBrandDropdown.vue'
import InputCurrency from '@/components/InputCurrency.vue'
import { useForm } from '@/composables'
import services from '@/services'
import { iCard, iPartial } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  card: iPartial<iCard>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iCard>>(props.card)

const service = computed<any>(() =>
  form.value.id ? services.cards.update : services.cards.create
)

const header = computed<string>(() =>
  form.value.id ? 'Editar Cartão' : 'Novo Cartão'
)

const { submitting, handleSubmit } = useForm<iCard>({
  service: service.value,
  notify: 'all',
  message: 'Cartão salvo com sucesso',
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
    id="card-form-dialog"
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
      append-to="#card-form-dialog"
      fullscreen
      @cancel="handleCancel"
    >
      <FormKit name="name" label="Nome" validation="required">
        <template #input>
          <InputText v-model="form.name" />
        </template>
      </FormKit>

      <FormKit name="issuer" label="Bandeira">
        <template #input>
          <CardBrandDropdown v-model="form.issuer" />
        </template>
      </FormKit>

      <FormKit name="limit" label="Limite">
        <template #input>
          <InputCurrency v-model="form.limit" />
        </template>
      </FormKit>

      <FormKit
        name="closing_day"
        label="Dia do Fechamento"
        type="number"
        validation="min:1|max:31"
      >
        <template #input>
          <InputNumber v-model="form.closing_day" :min="1" :max="31" />
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

      <FormKit name="is_default">
        <template #input>
          <span class="flex align-items-center gap-3">
            <label class="formkit-label block text-900 text-xl font-medium"
              >Cartão padrão?</label
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
