import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import './base.css'; // 引入全局样式
import router from './router'; // 引入路由

const app = createApp(App);
app.use(Vant); // 全局引入 Vant
app.use(router); // 使用路由
app.mount('#app');
