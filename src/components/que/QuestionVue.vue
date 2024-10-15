<template>
  <div>
    <van-image
      src="https://resource.cn-bj.ufileos.com/img/yuanmeng_main.jpg"
    />
    <div class="que-title">请输入您的个人信息</div>
    <div class="que-line"></div>
    <van-form class="main-content"  @submit="handleSubmit">
      <van-cell-group class="que-input-group" inset>
        <van-field class="van-field-input" label-align="right" v-model="birthday"  label="出生日期：" :disabled="true"  placeholder="">
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field class="van-field-input" label-align="right"  :disabled="true"  label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别："  placeholder="" v-model="currentGender">
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field class="van-field-input" label-align="right" v-model="height" type="number" :min="minHeight" :max="maxHeight"  label="身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高："  placeholder="170">
          <template #button>
            <span>厘米(CM)</span>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field class="van-field-input" label-align="right" v-model="weight" type="number" :min="minWeight" :max="maxWeight" label="体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重："  placeholder="61.5">
          <template #button>
            <span>千克&nbsp;(KG)</span>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field class="van-field-input" label-align="right" type="number" v-model="waist" :min="minWaist" :max="maxWaist"  label="腰&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;围："  placeholder="61.5">
          <template #button>
            <span>厘米(CM)</span>
          </template>
        </van-field>
      </van-cell-group>
      <span class="waist-note">说明：腰围80cm相当于2尺4</span>
      <van-button round class="que-form-button" type="primary" native-type="submit">
        确认提交
      </van-button>
    </van-form>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block" >
          <img src="https://resource.cn-bj.ufileos.com/img/error-img-title.jpg" alt="错误信息" class="error_message_image">  
        </div>
        <div class="relative-error">
          温馨提示
        </div>
      </div>
    </van-overlay>
  </div>
  
</template>

<script>
import axios from 'axios'; // 导入 axios

export default {
  name: 'QuestionPage',
  data() {
    return {
      birthday: '1991-08-07',
      gender: '男',
      height: 0,
      maxHeight: 300,
      minHeight: 30,
      waist: 0,
      maxWaist: 200,
      minWaist: 25,
      weight: 0,
      maxWeight: 200,
      minWeight: 40,
      queId: '',
      appName: '',
      appType: '',
      id: 0,
      queNo: 1,
      showError: false,
      errType: 0,
      times: '',
      show: true
    }
  },
  created(){
    //获取参数的值
    if(this.$route.query){
        this.queId = this.$route.query.arg;
        this.appName = this.$route.query.appName; // 获取 appName 参数
        this.appType = this.$route.query.appType; // 获取 appType 参数
    }
    let checkUrl = "https://ym.rtyouth.com/page/goto/"+this.appName+"/"+this.appType+"?arg="+this.queId;
    //判断问卷是不是可用
    axios.get(checkUrl,
      {method: "get", headers: {"Content-Type": "application/json;charset=UTF-8"}
    }).then(res=>{
      if(res){
        let message = res.data;
        if(message){
          if(message.code === 2000){
            let user = message.data;
            if(user){
              this.birthday = user.birthday;
              this.gender = user.gender;
              this.height = user.height;
              this.waist = user.waist;
              this.weight = user.weight;
              this.id = user.id;
            }
          }else if(message.code === 4006){
            let lastData = {
              appName: message.data.appName,
              appType: message.data.appType,
              arg: message.data.queId
            }
            this.$router.push({path: "/success", query: {info: JSON.stringify(lastData)}})
          }else if(message.code === 4007){ //活动还未开始
            this.errType = 2;
            this.times = message.code.beginTime;
            this.showError = true;
          }else if(message.code === 4005){ //活动已结束
            this.errType = 3;
            this.times = message.code.endTime; 
            this.showError = true;
          }else if(message.code === 4004){ // 未找到
            this.errType = 4;
            this.times = ""
            this.showError = true;
          }
        }
      }
    })
  },
  computed:{
    currentGender(){
        return this.gender === '1' ? "男":"女";
    }
  },
  methods: {
    handleSubmit() {
      let firstData = {
        queNo : this.queNo,
        id : this.id,
        data : {
          birthday : this.birthday,
          gender: this.gender,
          height: this.height,
          waist: this.waist,
          weight: this.weight
        }
      }
      let nextUrl = "https://ym.rtyouth.com/ai/info/yuanmeng/next";
      //执行问题提交操作
      axios.post(nextUrl,firstData,
        {method: "post", headers: {"Content-Type": "application/json;charset=UTF-8"}
      }).then(res=>{
        if(res){
          let message =  res.data;
          if(message){
            if(message.code === 2000){
              let lastData = message.data;
              lastData.appName = this.appName;
              lastData.appType = this.appType;
              lastData.queId = this.queId;
              this.$router.push({path: "/que", query: {info: JSON.stringify(lastData)}})
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.que-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.custom-label-self {

  font-size: 1.2rem; /* 自定义字体大小 */
  color: red !important; /* 自定义颜色 */
  padding-right: 0.5rem; /* 自定义右边距 */
}

.que-line {
  width: 5rem;
  height: 0.2rem;
  background-color: #50d2c8;
  margin: 0 auto; /* 水平居中 */
}

.waist-note {
  text-align: left; /* 左对齐 */
  display: block; /* 确保是块级元素 */
  margin-top: 0.5rem; /* 添加一些上边距 */
  margin-left: 1.2rem;
}

.que-input-group{
  margin: 1rem;
  border-radius: 1.5rem;
}
.van-field-input{
  background-color: #E9DCDC;
  font-size: 1rem;
  font-weight: bold;
  color: black;
}
.que-form-button{
  margin: 4rem;
  color: #FFF;
  background-color: #50d2c8;
  border: none;
  width: 10rem;
  font-weight: bold;
  height: 3rem;
  font-size: 1.3rem;
}
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 80%;
    height: 70%;
    background-color: #fff;
  }
  .error_message_image{
    margin-top: 3rem;
    width: 4rem;
    height: 4rem;
  }
  .relative-error{
    color: black;
  }

</style>