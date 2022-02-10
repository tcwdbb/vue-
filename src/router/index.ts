// index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

/**
 * 路由模式一共有三种：
 *    createWebHistory
 *    createWebHashHistory
 *    createMemoryHistory
 * 这里使用的是路由的 hash 模式
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

//路由全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('路由全局前置守卫', to, from)
  next()
})

export default router
