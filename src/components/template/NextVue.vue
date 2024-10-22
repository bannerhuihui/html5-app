<template>
  <div>
  <div class="template-container ">
    <img :src="imgUrl" alt="Template Image" class="base-img" />
    <div class="text-overlay">
      <h3 class="title">{{ titleMessage }}</h3>
    </div>
  </div>
  <div class="base-center">
    <van-tabs color="#F37B1E" >
      <van-tab title-style="color: #e99d42; font-size:1rem;" title="饮食建议">
      <DietaryPage :info="dietGuide" /> <!-- 传递参数 -->
    </van-tab>
    <van-tab title-style="color: #e99d42;font-size:1rem;" title="运动建议">
      <ExercisePage :info="exerciseGuide" /> <!-- 传递参数 -->
    </van-tab>
    <van-tab title-style="color: #e99d42;font-size:1rem;" title="生活建议">
      <LifestylePage :info="dailyLifeGuide" /> <!-- 传递参数 -->
    </van-tab>
    <van-tab title-style="color: #e99d42;font-size:1rem;" title="营养方案">
      <NutritionPage :info="medicalGuide" /> <!-- 传递参数 -->
    </van-tab>
    </van-tabs>
  </div>
  <div class="end-div"></div>
  <van-button class="base-button" @click="gotoTemplate" round size="large" >查看健康评估报告</van-button>
  </div>
</template>

<script>
import axios from 'axios'; // 导入 axios
import DietaryPage from './DietaryAdvice.vue'; // 导入饮食建议模板
import ExercisePage from './ExerciseAdvice.vue'; // 导入饮食建议模板
import LifestylePage from './LifestyleAdvice.vue'; // 导入饮食建议模板
import NutritionPage from './NutritionPlan.vue'; // 导入饮食建议模板
export default {
  name: 'NextPage',
  data() {
    return {
      imgUrl : 'https://resource.cn-bj.ufileos.com/img/template-tes.jpg',
      titleMessage : '远盟健康指导报告',
      dietGuide: null,
      exerciseGuide: null,
      dailyLifeGuide: null,
      medicalGuide: null,
      info : null
    }
  },
  components:{
    DietaryPage,
    ExercisePage,
    LifestylePage,
    NutritionPage
  },
  created() {
    this.info = JSON.parse(this.$route.query.info);
    axios.post("https://ym.rtyouth.com/page/question/context/id",this.info,
      {method: "post", headers: {"Content-Type": "application/json;charset=UTF-8"}
    }).then(res=>{
      if(res){
        let healthGuide = JSON.parse(res.data.data.guide);
        let goodsListResult = JSON.parse(res.data.data.goodsList);
        this.dietGuide = healthGuide.dietGuide;
        this.exerciseGuide = healthGuide.exerciseGuide;
        this.dailyLifeGuide = healthGuide.dailyLifeGuide;
        this.medicalGuide = goodsListResult.data;
      }
    });
  },
  methods:{
    gotoTemplate(){
      this.$router.push({path: "/template", query: {info: JSON.stringify(this.info)}})  
    }
  }

}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #FFF;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10; /* 确保在最上层 */
}

.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.progress-info {
  font-size: 1rem; /* 设置进度信息的文字大小 */
  margin-bottom: 0.5rem; /* 进度信息和进度条之间的间距 */
}

.progress-bar {
  width: 86vw; /* 设置进度条宽度为 80vw */
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column; /* 垂直排列上下部分 */
  padding: 2rem;
  text-align: center;
  margin-top: 100px; /* 留出顶部区域的空间 */
  margin-bottom: 100px; /* 留出底部区域的空间 */
  overflow-y: hidden; /* 允许内容溢出时滚 */
}

.lower-content-container {
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 允许内容溢出时滚动 */
  position: absolute
}

.shadow-effect {
  position: absolute; /* 绝对定位 */
  bottom: 0; /* 固定在底部 */
  left: 0;
  right: 0;
  height: 30px; /* 阴影的高度 */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%); /* 更明显的渐变效果 */
  pointer-events: none; /* 使阴影不影响点击事件 */
}

.que-input-group {
  margin: 1rem;
  border-radius: 1.5rem;
}

.van-field-input {
  background-color: #F6F6F6;
  font-size: 1rem;
  font-weight: bold;
  color: black;
}

.upper-content {
  padding: 1rem; /* 可选：设置内边距 */
  text-align: left;
}

.lower-content {
  padding: 1rem; /* 可选：设置内边距 */
}

.type-5-6-span {
  color: red;
}

.skip-a-a {
  text-decoration: underline; /* 添加下划线 */
  color: #0083FE; /* 可选：设置链接颜色 */
}

.base-que-button {
  background-color: #F6F6F6;
  color: #000;
  border: none;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  height: 3.5rem;
}

.button-que-button-active {
  background-color: #50d2c8;
}

.footer {
  position: fixed;
  bottom: 10px; /* 调整底部距离 */
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem; /* 减少上下内边距 */
  background-color: #FFF; /* 可选：设置背景颜色 */
}

.previous-button {
  background-color: #FFF;
  color: #50d2c8; /* 文字颜色 */
  border: 1px solid #50d2c8; /* 边框颜色 */
  margin-right: 0.5rem;
  margin-left: 2rem;
}

.next-button {
  margin-left: 0.5rem;
  margin-right: 2rem;
}

  .base-button{
    width: 85vw;
    position: fixed; /* 固定定位 */
    bottom: 1rem; /* 距离底部20px */
    left: 50%; /* 水平居中 */
    transform: translateX(-50%); /* 使按钮居中 */
    border: none; /* 去掉边框 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 添加阴影 */
    z-index: 1000; /* 确保按钮在其他内容之上 */
  }
</style>