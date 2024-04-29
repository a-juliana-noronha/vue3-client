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
      {
        path: '/metas',
        name: 'goals',
        component: () => import('@/views/pages/Goals/Goals.vue'),
      },
      {
        path: '/nova-meta',
        name: 'goals.create',
        component: () => import('@/views/pages/Goals/GoalCreate.vue'),
      },
      {
        path: '/groups',
        name: 'groups',
        component: () => import('@/views/Groups.vue'),
      },
      {
        path: '/teams/:group_id?',
        name: 'teams',
        component: () => import('@/views/pages/Teams.vue'),
      },
      {
        path: '/players/:group_id?',
        name: 'players',
        component: () => import('@/views/pages/Players.vue'),
      },
      {
        path: '/uikit/formlayout',
        name: 'formlayout',
        component: () => import('@/views/uikit/FormLayout.vue'),
      },
      {
        path: '/uikit/input',
        name: 'input',
        component: () => import('@/views/uikit/Input.vue'),
      },
      {
        path: '/uikit/floatlabel',
        name: 'floatlabel',
        component: () => import('@/views/uikit/FloatLabel.vue'),
      },
      {
        path: '/uikit/invalidstate',
        name: 'invalidstate',
        component: () => import('@/views/uikit/InvalidState.vue'),
      },
      {
        path: '/uikit/button',
        name: 'button',
        component: () => import('@/views/uikit/Button.vue'),
      },
      {
        path: '/uikit/table',
        name: 'table',
        component: () => import('@/views/uikit/Table.vue'),
      },
      {
        path: '/uikit/list',
        name: 'list',
        component: () => import('@/views/uikit/List.vue'),
      },
      {
        path: '/uikit/tree',
        name: 'tree',
        component: () => import('@/views/uikit/Tree.vue'),
      },
      {
        path: '/uikit/panel',
        name: 'panel',
        component: () => import('@/views/uikit/Panels.vue'),
      },

      {
        path: '/uikit/overlay',
        name: 'overlay',
        component: () => import('@/views/uikit/Overlay.vue'),
      },
      {
        path: '/uikit/media',
        name: 'media',
        component: () => import('@/views/uikit/Media.vue'),
      },
      {
        path: '/uikit/menu',
        component: () => import('@/views/uikit/Menu.vue'),
        children: [
          {
            path: '/uikit/menu',
            component: () => import('@/views/uikit/menu/PersonalDemo.vue'),
          },
          {
            path: '/uikit/menu/seat',
            component: () => import('@/views/uikit/menu/SeatDemo.vue'),
          },
          {
            path: '/uikit/menu/payment',
            component: () => import('@/views/uikit/menu/PaymentDemo.vue'),
          },
          {
            path: '/uikit/menu/confirmation',
            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue'),
          },
        ],
      },
      {
        path: '/uikit/message',
        name: 'message',
        component: () => import('@/views/uikit/Messages.vue'),
      },
      {
        path: '/uikit/file',
        name: 'file',
        component: () => import('@/views/uikit/File.vue'),
      },
      {
        path: '/uikit/charts',
        name: 'charts',
        component: () => import('@/views/uikit/Chart.vue'),
      },
      {
        path: '/uikit/misc',
        name: 'misc',
        component: () => import('@/views/uikit/Misc.vue'),
      },
      {
        path: '/blocks',
        name: 'blocks',
        component: () => import('@/views/utilities/Blocks.vue'),
      },
      {
        path: '/utilities/icons',
        name: 'icons',
        component: () => import('@/views/utilities/Icons.vue'),
      },
      {
        path: '/pages/timeline',
        name: 'timeline',
        component: () => import('@/views/pages/Timeline.vue'),
      },
      {
        path: '/pages/empty',
        name: 'empty',
        component: () => import('@/views/pages/Empty.vue'),
      },
      {
        path: '/pages/crud',
        name: 'crud',
        component: () => import('@/views/pages/Crud.vue'),
      },
      {
        path: '/documentation',
        name: 'documentation',
        component: () => import('@/views/utilities/Documentation.vue'),
      },
    ],
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('@/views/pages/Landing.vue'),
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
  {
    path: '/auth/access',
    name: 'accessDenied',
    component: () => import('@/views/pages/Auth/Access.vue'),
  },
  {
    path: '/auth/error',
    name: 'error',
    component: () => import('@/views/pages/Auth/Error.vue'),
  },
]
