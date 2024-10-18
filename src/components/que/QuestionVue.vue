<template>
  <div>
    <van-image
      src="https://resource.cn-bj.ufileos.com/img/yuanmeng_main.jpg"
    />
    <div class="que-title">请输入您的个人信息</div>
    <div class="que-line"></div>
    <van-form class="main-content"  @submit="handleSubmit">
      <van-cell-group class="que-input-group" inset>
        <van-field 
          ref="birthdayField" 
          class="van-field-input light-input" 
          label-align="right" 
          v-model="birthday"  
          label="出生日期："   
          placeholder="" 
          readonly>
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field class="van-field-input" label-align="right" autosize  label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别："  placeholder="" v-model="currentGender" readonly>
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field ref="heightField" class="van-field-input" label-align="right" v-model="height" type="number" :min="minHeight" :max="maxHeight"  label="身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高："  placeholder="170">
          <template #button>
            <span >厘米(CM)</span>
            <a class="upd-a" href="#" @click.prevent="focusHeight">修改</a>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field ref="weightField" class="van-field-input" autosize label-align="right" v-model="weight" type="number" :min="minWeight" :max="maxWeight" label="体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重："  placeholder="61.5">
          <template #button>
            <span >千克&nbsp;(KG)</span>
            <a class="upd-a" href="#" @click.prevent="focusWeight">修改</a>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group class="que-input-group" inset>
        <van-field ref="waistField" class="van-field-input" autosize label-align="right" type="number" v-model="waist" :min="minWaist" :max="maxWaist"  label="腰&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;围："  placeholder="61.5">
          <template #button>
            <span>厘米(CM)</span>
            <a class="upd-a" href="#" @click.prevent="focusWaist">修改</a>
          </template>
        </van-field>
      </van-cell-group>
      <span class="waist-note">说明：腰围80cm相当于2尺4</span>
      <van-button round class="que-form-button" type="primary" native-type="submit">
        确认提交
      </van-button>
    </van-form>
    
    <ErrorPage v-if="showError" :errType="errType" :times="times" />
    
  </div>
  
</template>

<script>
import axios from 'axios'; // 导入 axios
import ErrorPage from './ErrorVue.vue'
export default {
  name: 'QuestionPage',
  components:{
    ErrorPage
  },
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
      errType: 1,
      times: '',
      showError: false
    }
  },
  created(){
    //获取参数的值
    if(this.$route.query){
        this.queId = this.$route.query.arg;
        this.appName = this.$route.query.appName; // 获取 appName 参数
        this.appType = this.$route.query.appType; // 获取 appType 参数
    }
    let checkUrl = "https://demo.rtyouth.com/page/goto/"+this.appName+"/"+this.appType+"?arg="+this.queId;
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
              arg: message.data.queId,
              id : message.data.id
            }
            this.$router.push({path: "/success", query: {info: JSON.stringify(lastData)}})
          }else if(message.code === 4007){ //活动还未开始
            this.errType = 2;
            this.times = message.data.beginTime;
            console.log(message)
            console.log(this.times)
            this.showError = true;
          }else if(message.code === 4005){ //活动已结束
            this.errType = 3;
            this.times = message.data.endTime; 
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
      let nextUrl = "https://demo.rtyouth.com/ai/info/yuanmeng/next";
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
    },
    focusHeight() {
      this.$refs.heightField.focus(); // 聚焦到身高输入框
    },
    focusWeight() {
      this.$refs.weightField.focus(); // 聚焦到体重输入框
    },
    focusWaist() {
      this.$refs.waistField.focus(); // 聚焦到腰围输入框
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
  font-size: 0.78rem;
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
    width: 70%;
    height: 50%;
    background-color: #fff;
  }
  .error_message_image{
    margin-top: 3rem;
    width: 4rem;
    height: 4rem;
  }
  .relative-error{
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .relative-line{
    height: 1px;
    background-color: #EDEDED;
    margin:3rem;
  }

  .relative-message{
    color: black;
    font-weight: bold;
  }

  .relative-message div:last-child{
    padding-bottom: 2rem;
  }

  .relative-button{
    width: 10rem;
    background-color: #50d2c8;
    color: #FFF;
    font-weight: bold;
  }
  .upd-a{
    color: red;
    padding-left: 0.5rem;
  }

  .light-input {
    color: rgba(0, 0, 0, 0.5); /* 设置为浅色，调整透明度 */
  }
</style>

