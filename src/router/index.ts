import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useUsersStore } from '@/stores';
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const { token } = useAuthStore()

  if(token) {
    const { fetchCurrentUser } = useUsersStore()
    await fetchCurrentUser()

    if(to.meta.public) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else if (to.meta.public) {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router;
