import {createRouter, createWebHashHistory} from 'vue-router'


const routes = [
  {
    path: '/pay/order',
    name: 'H5PayFirst',
    component: () => import('@/components/pay/H5PayFirst.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/insider')) {
    //
  }

  if (to.path.startsWith('/vip')) {
    // 充值的也可以考虑全局控制
    // 跳转到充值页面
  }

  next()
})

export default router
