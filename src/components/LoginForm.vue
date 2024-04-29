<script setup lang="ts">
import { useForm } from '@/composables'
import { useAuthStore } from '@/stores/auth'
import { iLoginParams } from '@/types'
import { ref } from 'vue'

type iProps = {
  email?: string
}

const props = withDefaults(defineProps<iProps>(), {
  email: '',
})

const form = ref<iLoginParams>({
  email: props.email,
  password: '',
})

const { login } = useAuthStore()

const { submitting, handleSubmit } = useForm({
  service: login,
  notify: 'error',
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
    <FormKit
      name="email"
      label="Email"
      type="email"
      validation="required|email"
      :validation-messages="{
        required: 'Email é obrigatório',
        email: 'Informe um e-mail válido',
      }"
    >
      <template #input>
        <InputText
          id="email"
          v-model="form.email"
          type="text"
          class="w-full"
          style="padding: 1rem"
        />
      </template>
    </FormKit>

    <FormKit
      name="password"
      label="Senha"
      type="password"
      validation="required"
    >
      <template #label="{ label }">
        <div
          class="flex justify-content-between align-items-center text-900 text-xl font-medium mb-2"
        >
          {{ label }}
          <!-- <router-link
            :to="{ name: 'forgot-password' }"
            class="font-medium cursor-pointer text-base text-primary"
            >Esqueceu a Senha?</router-link
          > -->
        </div>
      </template>
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
      label="Entrar"
      icon="pi pi-sign-in"
      class="w-full p-3 text-xl"
      :loading="submitting"
    />

    <router-link
      :to="{ name: 'create-account' }"
      class="font-medium cursor-pointer text-primary mt-5 block text-center"
      >Criar Conta</router-link
    >
  </FormKit>
</template>
