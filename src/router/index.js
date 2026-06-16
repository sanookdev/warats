import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('../views/WorksView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('../views/BlogsView.vue')
    },
    {
      path: '/blogs/:slug',
      name: 'blog-detail',
      component: () => import('../views/BlogDetailView.vue')
    },
    {
      path: '/admin',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/blog/new',
      name: 'admin-blog-new',
      component: () => import('../views/AdminBlogEditorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/blog/edit/:id',
      name: 'admin-blog-edit',
      component: () => import('../views/AdminBlogEditorView.vue'),
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuth = !!sessionStorage.getItem('portfolio_admin_auth')
    if (!isAuth) {
      next('/admin')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
