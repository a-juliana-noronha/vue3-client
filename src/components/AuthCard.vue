<script setup lang="ts">
type iProps = {
  title?: string
  subtitle?: string
}

defineProps<iProps>()
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden px-4"
  >
    <div
      class="flex flex-column align-items-center justify-content-center w-full"
    >
      <div class="auth-card-wrapper w-full">
        <div class="w-full surface-card py-8 px-5 sm:px-8 auth-card-inner">
          <div
            class="text-center mb-5 flex flex-column align-items-center gap-3"
          >
            <!-- <img src="/layout/images/logo-animated.gif" alt="A Juliana Noronha Logo" class="auth-card-logo" width="50" /> -->
            <div class="text-900 text-3xl font-medium">{{ title }}</div>
            <span class="text-600 font-medium">{{ subtitle }}</span>
          </div>

          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-card {
  &-wrapper {
    border-radius: 56px;
    padding: 0.3rem;
    background: linear-gradient(
      180deg,
      var(--primary-color) 10%,
      rgba(33, 150, 243, 0) 30%
    );
    max-width: 600px;
  }

  &-inner {
    border-radius: 56px;
  }

  &-logo {
    border-radius: 100%;
  }
}
</style>
