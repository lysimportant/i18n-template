import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
      children: [
        {
          path: "/home/user",
          component: () => import("@/views/user/user.vue"),
          name: "user",
          meta: {}
        },
        {
          path: "/home/article",
          component: () => import("@/views/article/article.vue"),
          name: "article",
          meta: {}
        },
        {
          path: "/home/product",
          component: () => import("@/views/product/product.vue"),
          name: "product",
          meta: {}
        },
        {
          path: "/home/file",
          component: () => import("@/views/file/file.vue"),
          name: "file",
          meta: {}
        },
        {
          path: "/home/operate-article",
          component: () => import("@/views/operate-article/operate-article.vue"),
          name: "operate-article",
          meta: {}
        },
        {
          path: "/home/operate-product",
          component: () => import("@/views/operate-product/operate-product.vue"),
          name: "operate-product",
          meta: {}
        }
      ]
    }
  ]
})

export default router
