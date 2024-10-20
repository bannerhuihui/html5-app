<template>
  <div class="template-container ">
    <img :src="imgUrl" alt="Template Image" class="base-img" />
    <div class="text-overlay">
      <h3 class="title">{{ titleMessage }}</h3>
    </div>
  </div>
  <div class="base-center">
    <van-row class="user-info">
      <van-col span="10">
        <ul class="user-info-left">
          <li>性别：<span>{{ userInfo.gender === '1' ? '男': '女'}}</span></li>
          <li>年龄：<span>{{ userInfo.age }}岁</span></li>
        </ul>
      </van-col>
      <van-col span="14">
        <div class="user-info-right" v-if="userInfo.riskTipsTags" >{{ userInfo.riskTipsTags[0] }}</div>
      </van-col>
    </van-row>
    <div class="user-info-line"></div>
    <van-row class="user-info">
      <van-col span="24">
        <ul class="user-info-left">
            <li>家族史：<span>{{ familyMedicalHistory }}</span></li>
            <li>病历史：<span>{{ pastMedicalHistory }}</span></li>
        </ul>
      </van-col>
    </van-row>
    <div class="base-item">
      <div class="base-item-title">
        <h2>健康综述</h2>
      </div>
      <div class="base-item-body">
        <div class="circle-div">
          <van-circle
            :current-rate="index"
            stroke-width="180"
            color="#54bcbd"
            :text="indexNumber"
          />
        </div>
        <div class="like-p">{{ report.healthReview }}</div>
      </div>
      
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>健康预警</h2>
      </div>
      <div class="base-item-body">
        <div v-for="diseases in diseasesAnalysis" :key="diseases.diseaseCode">
          <div class="base-item-cat">
            <img class="base-item-cat-img" :src="diseases.imageUrl" alt="">
            <ul class="base-item-cat-ul">
              <li>{{ diseases.diseaseName }}</li>
              <li v-if="diseases.description === '已病'" >
                <img src="https://resource.cn-bj.ufileos.com/img/icon-success-temp.jpg" alt="">
              </li>
              <li v-else>
                {{ diseases.description }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>异常指标解读</h2>
      </div>
      <div class="base-item-body">
        <div v-for="(indicatorAnaly,index1) in report.indicatorAnalysis" :key="index1">
          <div class="like-progress">{{ indicatorAnaly.indicatorName === "体质指数" ? "BMI": indicatorAnaly.indicatorName === "收缩压" ? "收缩压(高压)" : indicatorAnaly.indicatorName === "舒张压" ? "舒张压(低压)" : indicatorAnaly.indicatorName }}&nbsp;&nbsp;{{ indicatorAnaly.indicatorValue }}</div>
          <div class="like-p">{{indicatorAnaly.descriptions[0]}}</div>
        </div>
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>主要风险因素</h2>
      </div>
      <div class="base-item-body">
        <div v-for="factor in report.riskFactorAnalysis" :key="factor.riskFactor">
          <div class="fx-cat" >
            <div class="fx-cat-titel"><h2>{{factor.riskFactorName}}</h2></div>
            <div class="fx-cat-icon">
              <div>风险等级</div>
              <div class="fx-cat-icon">
                <van-icon 
                  v-for="index in 5" 
                  :key="index"
                  :name="index <= factor.riskFactorLevel ? 'star' : 'star-o'"
                  color="#951d1d"
                />
              </div>
            </div>
          </div>
          <div class="like-p">
            {{factor.descriptions[0]}}
          </div>
        </div>
      </div>
    </div>
    <div class="end-div"></div>
    <van-button class="base-button" @click="gotoNext" round size="large" >查看健康指导建议</van-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return{
      imgUrl : 'https://resource.cn-bj.ufileos.com/img/template-tes.jpg',
      titleMessage : '远盟健康评估报告',
      userInfo:{
        gender: '',
        age: 0,
        riskTipsTags:[],
        familyMedicalHistory:[],
        pastMedicalHistory:[]
      },
      report:{
        healthIndex: 0,
        healthReview: '',
        diseasesAnalysis: [],
        nutrientStateAnalysis:[],
        indicatorAnalysis:[],
        riskFactorAnalysis:[],
        focusHealthProblems: []
      },
      diseasesAnalysis: [],
      info: null
    }
    
  },
  created(){
    this.info = JSON.parse(this.$route.query.info);
    let queryInfo ={
      id: this.info.id
    }
    axios.post("https://demo.rtyouth.com/page/question/context/id",queryInfo,
      {method: "post", headers: {"Content-Type": "application/json;charset=UTF-8"}
    }).then(res=>{
      if(res){
        let data = res.data.data;
        //第一模块
        let userInfo = JSON.parse(data.userInfo);
        this.userInfo.gender = userInfo.gender;
        this.userInfo.age = userInfo.age;
        this.userInfo.riskTipsTags = userInfo.riskTipsTags;
        this.userInfo.familyMedicalHistory = userInfo.familyMedicalHistory;
        this.userInfo.pastMedicalHistory = userInfo.pastMedicalHistory;

        //第二模块
        let report = JSON.parse(data.report);
        this.report.healthIndex = report.healthIndex;
        this.report.healthReview = report.healthReview;
        this.report.diseasesAnalysis = report.diseasesAnalysis;
        this.report.indicatorAnalysis = report.indicatorAnalysis;
        this.report.riskFactorAnalysis = report.riskFactorAnalysis;
        try{
        this.report.riskFactorAnalysis.sort((a, b) => {
          return b.riskFactorLevel - a.riskFactorLevel; // 升序排序
        });
        }catch(err){
          console.log(err)
        }
        this.report.focusHealthProblems = report.focusHealthProblems;
        this.pieData = [
            {value: parseInt(this.report.healthIndex,10),name: 'A',itemStyle: { color: '#51d2c8' }},
            {value: parseInt((100 - this.report.healthIndex),10),name: 'B',itemStyle: { color: '#FFF' }}
        ]
        //第三模块
        this.diseasesAnalysis = report.diseasesAnalysis;
      }
    })
  },
  computed: {
    familyMedicalHistory(){
      let family = this.userInfo.familyMedicalHistory;
      let str = '';
      if(family.length > 0){
        family.forEach(element => {
          str += element +'，';
        });
        if(str.length >10){
          return str.slice(0,5) + '...';
        }
        return str.slice(0,-1);
      }
      return '无';
      },
    pastMedicalHistory(){
      let past = this.userInfo.pastMedicalHistory;
      let str = '';
      if(past.length > 0){
        past.forEach(element => {
          str += element +'，';
        });
        if(str.length >10){
          return str.slice(0,5) + '...';
        }
        return str.slice(0,-1);
      }
      return '无';
    },
    indexNumber(){
        return this.report.healthIndex.toString()+"分";
    },
    index(){
        return Number(this.report.healthIndex);
    }    
  },
  methods:{
    gotoNext(){
      let queryInfo ={
        id: this.info.id
      }
      this.$router.push({path: "/next", query: {info: JSON.stringify(queryInfo)}});  
    }
  }
}
</script>

<style scoped>
  



  .user-info{
    height: 5rem;
  }
  .user-info-left{
    text-align: left;
    font-weight: bold;
    font-size: 1.3rem;
    margin-left: 1rem;
  }

  .user-info-left li{
    margin-bottom: 1rem;
  }
  .user-info-left span{
    font-size: 1rem;
  }

  .user-info-right{
    text-align: center;
    border: 1px solid silver;
    border-radius: 1rem;
    height: 2rem;
    line-height: 2rem;
    margin-top: 1rem;
    color: silver;
    margin-right: 1rem;
  }  
  .user-info-line{
    height: 1px;
    background-color: silver;
    margin: 0.6rem 1rem;
  }
  .circle-div{
    text-align: center;
    margin-right: 1rem;
  }

  .base-item-cat{
    display: flex;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }
  .base-item-cat-img{
    width: 5rem;
    height: 5rem;
  }
  .base-item-cat-ul{
    font-size: 1.2rem;
    margin-left: 1rem;
  }

  .base-item-cat-ul img{
    width: 1.2rem;
  }

  .base-item-cat-ul li{
    padding-top: 0.5rem;
  }

  .base-item-cat-ul li:first-child{
    font-weight: bold;
  }
  .base-item-cat-ul li:last-child{
    color: orange;
  }

  .like-progress{
    height: 2rem;
    margin-right: 1rem;
    background-color: #54bcbd;
    text-align: center;
    font-size: 1.1rem;
    line-height: 2rem;
    color: #FFF;
    font-weight: bold;
    margin-top: 0.6rem;
  }
  .like-p{
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }

  .fx-cat{
    color: #951d1d;
    border: 2px solid #951d1d;
    margin-right: 1rem;
  }

  .fx-cat-icon{
    display: flex;
  }
  .fx-cat-titel{
    padding-left: 1rem;
    padding-top: 0.5rem;
  }
  .fx-cat-icon div:first-child{
    padding-top: 0.5rem;
    padding-left: 1rem;
    padding-bottom: 0.5rem;
  }

  .fx-cat-icon div:last-child{
    padding-top: 0.6rem;
    padding-left: 1rem;
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