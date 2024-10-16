<template>
  <div class="container">
    <!-- 顶部区域 -->
    <div class="header">
        <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="progress-container">
            <div class="progress-info">当前进度 100%</div>
            <van-progress class="progress-bar" percentage="100" stroke-width="16" :show-pivot="false" color="#6DDED6"/>
        </div>
    </div>
    
    <!-- 中间内容区域 -->
    <div class="content">
        {{value}} {{ id }}
      <div class="upper-content">
        <h3>最后一题、目前您最想解决的问题（单选）</h3>
      </div>
      <div class="lower-content-container" style="position: relative;"> <!-- 设置相对定位 -->
        <div class="lower-content">
          <div v-for="option in endQuestionList" :key="option.type">
            <van-button class="base-que-button" :class="{'button-que-button-active': selectedOption === option.type}" :value="option.type" type="primary" block round @click="radioUpd(option.type)">
              {{option.content}}
            </van-button>           
          </div>
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
        <van-button class="end-button" @click="pushQuestion" round size="large" >完成</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 导入 axios
export default {
  name: 'QueEndPage',
  data() {
    return {
      endQuestionList:[
        {type:"GXT",content:"高血糖"},
        {type:"GXY",content:"高血压"},
        {type:"GXZ",content:"高血脂"},
        {type:"CD",content:"肠道健康"},
        {type:"TF",content:"痛风"},
        {type:"ZHYM",content:"综合免疫"}
      ],
      selectedOption: null, // 添加状态变量
      value: '',
      id: 0
    }
  },
  methods: {
    radioUpd(value) {
      this.selectedOption = this.selectedOption === value ? null : value; // 切换选中的按钮
      if(this.selectedOption){
          this.value = value;
      }else{
          this.value = '';
      }
    },
    pushQuestion(){
      const baseData = {
        id: this.id,
        value: this.value
      }
      axios.post("https://demo.rtyouth.com/ai/info/yuanmeng/last/type", baseData,
        {method: "post", headers: { "Content-Type": "application/json;charset=UTF-8" }})
      .then(res => {
        if(res && res.data.code === 2000){
          //到成功页
          const pageInfo = {
            id: res.data.data.id,
            appName: res.data.data.appName,
            appType: res.data.data.appType,
            callBackUrl: res.data.data.callBackUrl,
            callBackType: res.data.data.callBackType,
            callBackBody: res.data.data.callBackBody
          }
          this.$router.push({ path: "/success",query: {info: JSON.stringify(pageInfo)}})
        }
      }).catch(err => { console.log(err) })
    },
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },
  },
  created(){
     let info = JSON.parse(this.$route.query.info);
     this.id = info.id;
     this.endQuestionList = info.goodsList;
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

.end-button{
    background-color: #50d2c8 !important;
    color: #FFF !important;
    font-size: 1.2rem !important;
    width: 13rem;
}
</style>