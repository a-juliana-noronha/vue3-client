export const routes = [
  {
    path: '/',
    component: () => import('@/layout/AppLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/despesas',
        name: 'expenses',
        component: () => import('@/views/pages/Transactions/Expenses.vue'),
      },
      {
        path: '/lembretes',
        name: 'reminders',
        component: () => import('@/views/pages/Reminders/Reminders.vue'),
      },
      {
        path: '/categorias',
        name: 'categories',
        component: () => import('@/views/pages/Categories/Categories.vue'),
      },
      {
        path: '/contas',
        name: 'accounts',
        component: () => import('@/views/pages/Accounts/Accounts.vue'),
      },
      {
        path: '/centros-de-custo',
        name: 'cost-centers',
        component: () => import('@/views/pages/CostCenters/CostCenters.vue'),
      },
      {
        path: '/usuarios',
        name: 'users',
        component: () => import('@/views/pages/Users/Users.vue'),
      },
      {
        path: '/cartoes',
        name: 'cards',
        component: () => import('@/views/pages/Cards/Cards.vue'),
      },
      {
        path: '/novo-cartao',
        name: 'cards.create',
        component: () => import('@/views/pages/Cards/CardCreate.vue'),
      },
      // {
      //   path: '/metas',
      //   name: 'goals',
      //   component: () => import('@/views/pages/Goals/Goals.vue'),
      // },
    ],
  },
  {
    path: '/pages/notfound',
    name: 'notfound',
    component: () => import('@/views/pages/NotFound.vue'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Auth/Login.vue'),
    meta: {
      public: true,
      auth: true,
    },
  },
  {
    path: '/criar-conta',
    name: 'create-account',
    component: () => import('@/views/pages/Auth/CreateAccount.vue'),
    meta: {
      public: true,
      auth: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/pages/Auth/ForgotPassword.vue'),
    meta: {
      public: true,
    },
  },
]
