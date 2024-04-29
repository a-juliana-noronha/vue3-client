import { defineStore } from 'pinia';
import services from '@/services';

// import { USER_ROLES } from '@/constants/users';

export const useUsersStore = defineStore('user', {
  persist: true,
  state: () => ({
    currentUser: null
  }),
  actions: {
    async fetchCurrentUser() {
      const me = await services.users.me();
      this.currentUser = me;
    },
  },
  // getters: {
  //   isAdmin: (state) => state.currentUser?.role === USER_ROLES.ADMIN
  // }
});
