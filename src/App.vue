<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /* 设置字体族 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
  /* 优化字体平滑 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* 文本居中 */
  text-align: center;
  
  /* 设置文本颜色 */
  color: #2c3e50;
  
  /* 设置顶部外边距 */
  margin-top: 0;

  background-color: #FFF;

  min-height: 100vh;
}
  .base-img{
    width: 100%;
    height: 16rem;
  }

  .base-center{
    margin: 2rem;
  }

  .base-item{
    background-color: #EFEFEF;
    border-radius: 0.7rem;
    margin: 1rem 0;
    text-align: left;
  }


  .base-item-title{
    margin-left: 1rem;
    padding-top: 0.6rem;
  }

  .base-item-body{
    margin-left: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }
  .base-button{
    background-color: #50d2c8 !important;
    color: #FFF !important;
    font-size: 1.2rem !important;
  }

  .base-chat{
    margin-right: 1rem;
    display: flex;
  }

  .base-chat-img{
    padding-top: 1rem;
    width: 3rem;
    height: 3rem;
  }

  .base-chat-img img{
    width: 3rem;
    height: 3rem;
  }

  .base-chat-ul{
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .base-ul {
    list-style-type: disc;
    color: #000;
    padding-left: 1rem;
    padding-bottom: 0.6rem;
  }

  .base-chat-ul-title{
    padding-top: 0.6rem;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .base-chat-ul-p{
    padding-top: 0.6rem;
    font-size: 0.9rem;
    color: #2c3e50;
    padding-bottom: 0.6rem;
  }



  .template-container {
    position: relative; /* 使子元素可以绝对定位 */
    overflow: hidden; /* 隐藏溢出内容 */
    height: 16rem;
  }
  .end-div{
    height: 5rem;
  }

    .text-overlay {
    position: absolute; /* 绝对定位 */
    bottom: 1rem; /* 距离图片底部的距离 */
    left: 50%; /* 水平居中 */
    transform: translateX(-50%); /* 使元素水平居中 */
    color: green; /* 文字颜色 */
    text-align: center; /* 文本居中 */
    z-index: 1; /* 确保文字在图片上方 */
    color: #FFF;
  }
  :root {
    --van-circle-text-color: #54bcbd;
  }
 


</style>
