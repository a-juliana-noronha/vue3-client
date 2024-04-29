<script setup lang="ts">
import { ref } from 'vue'

type iForgotPassword = {
  email: string
}

const form = ref<iForgotPassword>({
  email: '',
})
</script>

<template>
  <FormKit
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    form-class="flex flex-column gap-3"
  >
    <FormKit
      name="email"
      label="Email"
      type="email"
      validation="required|email"
      :validation-messages="{
        required: 'Email é obrigatório',
        email: 'E-mail inválido',
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

    <Button
      type="submit"
      label="Recuperar Senha"
      icon="pi pi-key"
      class="w-full p-3 text-xl"
    />

    <router-link
      :to="{ name: 'login' }"
      class="font-medium cursor-pointer text-primary mt-5 block text-center"
      >Login</router-link
    >
  </FormKit>
</template>
