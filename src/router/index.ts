// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/sponsors',
        name: 'Sponsors',
        component: () => import('@/views/Sponsors.vue'),
      },
      {
        path: '/home',
        name: 'UserHome',
        component: () => import('@/views/profile/UserHome.vue'),
      },
      {
        path: '/home/edit',
        name: 'EditProfile',
        component: () => import('@/views/profile/EditProfile.vue'),
      },
      {
        path: '/download',
        name: 'Download',
        component: () => import('@/views/Download.vue'),
      },
      {
        path: '/feature',
        name: 'Feature',
        component: () => import('@/views/Feature.vue'),
      },
      {
        path: '/feature/undo',
        name: 'Undo',
        component: () => import('@/views/feature/Undo.vue'),
      },
      {
        path: '/feature/rvc',
        name: 'RVC',
        component: () => import('@/views/feature/RVC.vue'),
      },
      {
        path: '/feature/debugger',
        name: 'Debugger',
        component: () => import('@/views/feature/Debugger.vue'),
      },
      {
        path: '/user/:uid(\\d+)',
        name: 'UserProfile',
        component: () => import('@/views/profile/OtherUser.vue'),
      },
      {
        path: '/admin/users',
        name: 'AdminUserList',
        component: () => import('@/views/admin/UserList.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404 NotFound',
        component: () => import('@/views/error/NotFound.vue'),
        meta: {title: "reden.title.404"},
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {

    if (to.name && to.path != "/") {

        document.title = `${to.name.toString()} | Reden`;
      }else {
        document.title = "REDEN ~ for the Redstone open source community."
    }
     if (from)
  next();
});

export default router;
