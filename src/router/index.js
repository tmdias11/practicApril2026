import { createRouter, createWebHistory } from 'vue-router'
import { useLoader } from '../composables/useLoader'
import { getCurrentUser } from '../services/storage'

import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import EditView from '../views/EditView.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import SettingsView from '../views/SettingsView.vue'
import ItemsView from '../views/ItemsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/create', component: CreateView },
  { path: '/edit/:id', component: EditView, props: true },
  { path: '/about', component: AboutView },
  { path: '/settings', component: SettingsView },
  { path: '/catalogue', component: ItemsView },

  { path: '/movie/:id', name: 'movie', component: () => import('../views/MovieView.vue') },

  {
    path: '/admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/auth',
    component: () => import('../views/AuthView.vue'),
    meta: { guestOnly: true }
  },

  {
    path: '/profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },

  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const user = getCurrentUser()

  const isAuth = !!user
  const isAdmin = user?.role === 'admin'

  const { showLoader } = useLoader()
  showLoader()

  if (to.meta.requiresAuth && !isAuth) {
    return '/auth'
  }

  if (to.meta.guestOnly && isAuth) {
    return '/profile'
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return '/'
  }
})

router.afterEach(() => {
  const { hideLoader } = useLoader()

  setTimeout(() => {
    hideLoader()
  }, 300)
})

export default router