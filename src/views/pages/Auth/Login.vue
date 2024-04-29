<script setup lang="ts">
import AuthCard from '@/components/AuthCard.vue'
import LoginForm from '@/components/LoginForm.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const { query } = useRoute()
const email = ref<string>(query.email)
</script>

<template>
  <AuthCard title="Seja bem-vindo!" subtitle="Faça login para continuar">
    <LoginForm :email="email" />
  </AuthCard>
  <Toast />
</template>
