import {createRouter, createWebHashHistory} from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/HelloWorld')
  },{
    path: '/question',
    name: 'QuestionPage',
    component: () => import('@/components/que/QuestionVue')
  },{
    path: '/que',
    name: 'QuePage',
    component: () => import('@/components/que/Que')
  },{
    path: '/success',
    name: 'SuccessPage',
    component: () => import('@/components/que/SuccessVue')
  },{
    path: '/template',
    name: 'TemplatePage',
    component: () => import('@/components/template/TemplateVue')
  },{
    path: '/next',
    name: 'NextPage',
    component: () => import('@/components/template/NextVue')
  },{
    path: '/queEnd',
    name: 'QueEndPage',
    component: () => import('@/components/que/QueEnd')
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
