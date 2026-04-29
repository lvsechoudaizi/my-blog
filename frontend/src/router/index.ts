import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PostsView from '../views/PostsView.vue'
import SettingsView from '../views/SettingsView.vue'
import { getPersistedUserProfile } from '../utils/auth-storage'
import { hasAnyPermission } from '../utils/permission'
import { getToken } from '../utils/token'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'posts',
          name: 'posts',
          component: PostsView,
          meta: { requiresAuth: true, permissions: ['blog:read'] },
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
          meta: { requiresAuth: true, permissions: ['system:admin'] },
        },
      ],
    },
    {
      path: '/403',
      name: 'forbidden',
      component: ForbiddenView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to) => {
  const token = getToken()

  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && token) {
    return { name: 'home' }
  }

  const requiredPermissions = (to.meta.permissions as string[] | undefined) ?? []
  if (token && requiredPermissions.length) {
    const profile = getPersistedUserProfile()
    const userPermissions = profile?.permissions ?? []
    if (!hasAnyPermission(userPermissions, requiredPermissions)) {
      return { name: 'forbidden' }
    }
  }

  return true
})

export default router
