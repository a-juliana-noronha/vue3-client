import router from '@/router'
import services from '@/services'
import { useUsersStore } from '@/stores'
import { iAuthState, iLoginParams } from '@/types'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: (): iAuthState => ({
    token: null,
    me: null,
  }),
  actions: {
    async login({ email, password }: iLoginParams): Promise<void> {
      const { token } = await services.auth.login({
        email,
        password,
      })

      this.token = token

      const usersStore = useUsersStore()
      await usersStore.fetchCurrentUser()

      router.push({ name: 'dashboard' })
    },

    logoff(): void {
      this.$reset()
    },
  },
  getters: {
    isAdmin: (state: iAuthState) => state.me?.role === 'admin',
  },
})
