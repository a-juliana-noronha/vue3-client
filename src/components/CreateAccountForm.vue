<script setup lang="ts">
import { useForm } from '@/composables'
import services from '@/services'
import { iCreateAccountParams } from '@/types'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref<iCreateAccountParams>({
  name: '',
  email: '',
  password: '',
})

const toast = useToast()
const router = useRouter()

const { submitting, handleSubmit } = useForm({
  service: services.users.create,
  onSuccess: () => {
    toast.add({
      severity: 'success',
      summary: 'Sucess',
      detail: 'Conta criada com sucesso',
      life: 3000,
    })

    router.push({ name: 'login', query: { email: form.value.email } })
  },
  onError: (error: any) => {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error?.response?.data?.errors[0],
      life: 3000,
    })
  },
})
</script>

<template>
  <FormKit
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    form-class="flex flex-column gap-3"
    @submit="handleSubmit"
  >
    <FormKit name="name" label="Nome" type="text">
      <template #input>
        <InputText id="name" v-model="form.name" class="w-full p-3" />
      </template>
    </FormKit>

    <FormKit
      name="email"
      label="Email*"
      type="email"
      validation="required|email"
      :validation-messages="{
        required: 'Email é obrigatório',
        email: 'Informe um e-mail válido',
      }"
    >
      <template #input>
        <InputText id="email" v-model="form.email" class="w-full" />
      </template>
    </FormKit>

    <FormKit
      name="password"
      label="Senha*"
      type="password"
      validation="required"
    >
      <template #input>
        <Password
          id="password"
          v-model="form.password"
          :feedback="false"
          toggle-mask
          class="w-full"
          input-class="w-full p-3"
        />
      </template>
    </FormKit>

    <Button
      type="submit"
      label="Criar Conta"
      icon="pi pi-user-plus"
      class="w-full p-3 text-xl"
      :loading="submitting"
    />

    <router-link
      :to="{ name: 'login' }"
      class="font-medium cursor-pointer text-primary mt-5 block text-center"
      >Login</router-link
    >
  </FormKit>
</template>
