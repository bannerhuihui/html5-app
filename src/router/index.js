import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/Home.vue';
import AboutPage from '../components/About.vue';
import QuestionPage from '../components/que/QuestionVue.vue'; // 更新路径
import QuePage from '../components/que/Que.vue'; // 导入新的组件
import SuccessPage from '../components/que/SuccessVue.vue'; // 导入新的组件
import TemplatePage from '../components/template/TemplateVue.vue'
import NextPage from '../components/template/NextVue.vue'
import QueEndPage from '../components/que/QueEnd.vue'
const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/question', component: QuestionPage },
  { path: '/que', component: QuePage }, // 新增路由
  { path: '/success', component: SuccessPage }, // 新增路由
  { path: '/template', component: TemplatePage },
  { path: '/next', component: NextPage },
  { path: '/queEnd', component: QueEndPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // 每次页面跳转时，滚动位置设置到顶部
  }
});

export default router;