<template>
  <div class="success-div">
    <img :src="successUrl" alt="">
    <div class="success-button-div">
        <van-button class="base-button" @click="gotoTemplate" round size="large" >查看报告</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessVue',
  data() {
    return {
      successUrl : 'https://resource.cn-bj.ufileos.com/img/success.jpg',
      id: this.$route.query.id || 98
    }
  },
  created(){
    //获取参数的值
    console.log(this.id)
    
  },
  methods: {
    gotoTemplate(){
        //根据id获取对应的报告内容
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
  }
  .success-div{
    height: 100vh;
    background-color: #FFF;
  }
  .success-button-div{
    margin: 5rem;
  }
</style>