<script setup lang="ts">
import { useForm } from '@/composables'
import services from '@/services'
import { iCard, iPartial } from '@/types'
import { computed, ref } from 'vue'

const form = ref<iPartial<iCard>>({
  name: '',
  issuer: '',
  icon: '',
  color: '',
  limit: 0.0,
  closing_date: null,
  due_date: null,

  account_id: null,
})

const service = computed<any>(() =>
  form.value.id ? services.cards.update : services.cards.create
)

const { submitting, handleSubmit } = useForm<iCard>({
  service: service.value,
  notify: 'error',
})
</script>

<template>
  <FormKit
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    form-class="flex flex-column gap-4"
    @submit="handleSubmit"
  >
    <FormKit name="name" label="Nome" validation="required">
      <template #input>
        <InputText v-model="form.name" />
      </template>
    </FormKit>

    <FormKit name="issuer" label="Bandeira">
      <template #input>
        <InputText v-model="form.issuer" />
      </template>
    </FormKit>

    <FormKit name="limit" label="Limite">
      <template #input>
        <InputNumber
          v-model="form.limit"
          locale="pt-BR"
          mode="currency"
          currency="BRL"
          :min-fraction-digits="2"
        />
      </template>
    </FormKit>

    <FormKit name="closing_date" label="Data de Fechamento">
      <template #input>
        <Calendar v-model="form.closing_date" show-icon show-button-bar />
      </template>
    </FormKit>

    <FormKit name="due_date" label="Data de Vencimento">
      <template #input>
        <Calendar v-model="form.due_date" show-icon show-button-bar />
      </template>
    </FormKit>

    <FormKit name="icon" label="Ícone">
      <template #input>
        <InputText v-model="form.icon" type="text" />
      </template>
    </FormKit>

    <FormKit name="color" label="Cor">
      <template #input>
        <ColorPicker v-model="form.color" class="w-full lg:w-auto" />
      </template>
    </FormKit>

    <Button type="submit" label="Salvar Conta" :loading="submitting" />
  </FormKit>
</template>
