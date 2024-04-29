<script setup>
import AuthCard from '@/components/AuthCard.vue'
import CreateAccountForm from '@/components/CreateAccountForm.vue'
</script>

<template>
  <AuthCard title="Seja bem-vindo!" subtitle="Cria sua conta agora">
    <CreateAccountForm />
  </AuthCard>
  <Toast />
</template>
