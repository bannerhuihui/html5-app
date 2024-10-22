<template>
    <div>
        <div class="base-item">
      <div class="base-item-title">
        <h2>目标</h2>
      </div>
      <div class="base-item-body">
        <div class="like-p" v-if="info">{{ info.healthReview }}</div>
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <van-icon name="fire-o" size="1.7rem" color="#ee0a24" />&nbsp;&nbsp;<span >基础代谢</span><span v-if="info" style="color: #ee0a24; font-size: 1.2rem;">{{info.energyIntake}}</span>大卡
      </div>
      <div class="base-item-body">
        <div class="like-p" v-if="info">{{ info.energyDescription }}</div>
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>三餐配比</h2>
      </div>
      <div class="base-item-body">
        <div v-if="info">
            <div class="three-meals-item" v-for="(mealDea,index) in info.mealRatios" :key="index">
                <div class="three-meals-item-first">
                    <div class="three-meals-item-first-content">
                        <span class="three-meals-item-first-span-1">{{ getOneDayType(mealDea.mealType) }}</span>
                        <span class="three-meals-item-first-span-2">能量占全天{{ mealDea.energyPercentLower }}~{{ mealDea.energyPercentUpper }}%</span>
                    </div>
                    <div class="three-meals-item-second">{{ mealDea.description }}</div>
                </div>
                <div v-if="index !== info.mealRatios.length -1 " class="three-meals-item-line"></div>
            </div>
            
        </div>
        <div v-if="isShowMap" ref="pieChart" style="width: 100%; height: 400px;" ></div>
        <div v-if="info">
            <div class="like-p" v-for="mealDea in info.mealDescriptions" :key="mealDea.mealType">
                <div style="padding-bottom: 0.4rem; padding-top:1rem" v-if="mealDea.mealType === 'MEAL' "> {{ mealDea.description }} </div>
                <div v-if="mealDea.mealType === 'MEAL_EXTRA' "> {{ mealDea.description }} </div>
            </div>
        </div>
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>平衡膳食</h2>
      </div>
      <div class="base-item-body">
        <div v-if="info">
            <div v-for="item in info.balancedDiets" :key="item.foodCategory">
                <div class="base-chat">
                    <div class="base-chat-img">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="base-chat-ul">
                        <div class="base-chat-ul-title">
                            {{item.foodCategoryName}}&nbsp;&nbsp;{{item.count}}{{item.unit}}
                        </div>
                        <div class="base-chat-ul-p">
                            {{item.description}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <li class="ul-message" >推荐平均每天摄入12种以上食物，每周25种以上。</li>        
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>饮食禁忌</h2>
      </div>
      <div class="base-item-body" v-if="info">
        <ul class="base-ul">
            <li v-for="(itemLi,index) in info.dietPrinciples" :key="index">
                {{itemLi}}
            </li>
        </ul>
      </div>
    </div>
    </div>
    
</template>
<script>
import * as echarts from 'echarts';
export default {
    name: "DietaryPage",
    props:{
        info:{
            type: Object,
            default: () => ({}) // 默认值为空对象
        }
    },
    data() {
        return {
            pieData: [], // 假设这是你的数据结构
            chartInstance: null, // 用于存储 ECharts 实例
            time: null,
            isShowMap: false
        }
    },
    mounted(){
        this.$nextTick(() => {
            setTimeout(() => {this.executeAfterDelay()}, 1000);
        })

        
    },
    methods: {
        getOneDayType(value){
            let name = '';
            switch(value){
                case 'BREAKFAST':
                    name = "早餐";
                    break;
                case 'BREAKFAST_EXTRA':
                    name = "早加餐";
                    break;
                case 'LUNCH':
                    name = "午餐";
                    break;
                case 'LUNCH_EXTRA':
                    name = "午加餐";
                    break;
                case 'SUPPER':
                    name = "晚餐";
                    break;
                case 'SUPPER_EXTRA':
                    name = "晚加餐";
                    break;
            }
            return name;
        },
        executeAfterDelay(){
            let data = this.info?.mealRatios;
            for (let index = 0; index < data?.length; index++) {
                const element = data[index];
                let name = '';
                switch(element.mealType){
                    case 'BREAKFAST':
                        name = "早餐";
                        break;
                    case 'BREAKFAST_EXTRA':
                        name = "早加餐";
                        break;
                    case 'LUNCH':
                        name = "午餐";
                        break;
                    case 'LUNCH_EXTRA':
                        name = "午加餐";
                        break;
                    case 'SUPPER':
                        name = "晚餐";
                        break;
                    case 'SUPPER_EXTRA':
                        name = "晚加餐";
                        break;
                }
                let newData = {
                    value: element.energyPercentUpper,
                    name: name+element.energyPercentUpper+'%'
                }
                this.pieData.push(newData);
            }
            this.initChart(this.pieData);
        },
        gotoFirst(){
            clearTimeout(this.timer); // 清除定时器
            this.timer = null; // 重置定时器 ID
            this.$router.push({path: "/yuanmeng/template"})
        },
        initChart(data) {
            const chartDom = this.$refs.pieChart;
            if (!chartDom) return
            const myChart = echarts.init(chartDom);
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal', // 设置为横排
                    bottom: '0%', // 将 legend 置底
                    left: 'center' // 水平居中
                },
                series: [{
                    name: '建议比例',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }  
                }]
            }
            myChart.setOption(option);
        }
    }


    
}
</script>

<style scoped>
    .ul-message{
        color: black;
        font-size: 0.9rem;
        padding-top: 1rem;
        padding-block: 0.5rem;
    }

    .three-meals-item{
        margin: 0.5rem;
        margin-right: 1.5rem;
    }

    .three-meals-item-first-span-1{
        font-size: 1.4rem;
        font-weight: bold;
    }

    .three-meals-item-first-content{
        display: flex; /* 使用 Flexbox 布局 */
        justify-content: space-between; /* 左右对齐 */
        align-items: center; /* 垂直居中对齐 */
    }

    .three-meals-item-first-span-2{
        text-align: right; /* 右对齐 */
        font-size: 0.8rem;
        color: #2E5837;
    }

    .three-meals-item-second{
        font-size: 1rem;
        line-height: 1.5rem;
        margin-top: 0.4rem;
        color: black;
    }

    .three-meals-item-line{
        margin-top: 1rem;
        height: 1px;
        background-color: black;
    }

    
</style>
