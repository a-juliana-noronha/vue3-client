<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout'
import { useAuthStore } from '@/stores'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { layoutConfig, onMenuToggle } = useLayout()

const outsideClickListener = ref<EventListenerOrEventListenerObject | null>(
  null
)
const topbarMenuActive = ref<boolean>(false)
const router = useRouter()

onMounted(() => {
  bindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

const logoUrl = computed(
  () =>
    `/layout/images/${
      layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'
    }.svg`
)

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}

// const onSettingsClick = () => {
//   topbarMenuActive.value = false
//   router.push('/documentation')
// }

const topbarMenuClasses = computed(() => ({
  'layout-topbar-menu-mobile-active': topbarMenuActive.value,
}))

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    // @ts-ignore
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return

  const sidebarEl = document.querySelector('.layout-topbar-menu')
  const topbarEl = document.querySelector('.layout-topbar-menu-button')

  return !(
    sidebarEl?.isSameNode(event.target) ||
    sidebarEl?.contains(event.target) ||
    topbarEl?.isSameNode(event.target) ||
    topbarEl?.contains(event.target)
  )
}

const handleLogoff = (): void => {
  const { logoff } = useAuthStore()
  logoff()

  router.push({ name: 'login' })
}
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>Controle Financeiro</span>
    </router-link>

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <!-- <button class="p-link layout-topbar-button" @click="onTopBarMenuButton()">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button> -->
      <!-- @ToDo
        <button class="p-link layout-topbar-button" @click="onTopBarMenuButton()">
        <i class="pi pi-user"></i>
        <span>Minha Conta</span>
      </button> -->
      <!-- <button class="p-link layout-topbar-button" @click="onSettingsClick()">
        <i class="pi pi-cog"></i>
        <span>Configurações</span>
      </button> -->
      <button class="p-link layout-topbar-button" @click="handleLogoff">
        <i class="pi pi-sign-out" />
        <span>Sair</span>
      </button>
    </div>
  </div>
</template>
