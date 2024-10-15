<template>
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
        <van-icon name="fire-o" size="1.7rem" color="#ee0a24" /><span v-if="info" style="color: #ee0a24; font-size: 1.2rem;">&nbsp;&nbsp;{{info.energyIntake}}</span>
      </div>
      <div class="base-item-body">
        <div class="like-p" v-if="info">{{ info.healthReview }}</div>
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>三餐配比</h2>
      </div>
      <div class="base-item-body">
        <div ref="pieChart" style="width: 100%; height: 400px;" ></div>
        <div v-if="info">
            <div class="like-p" v-for="mealDea in info.mealDescriptions" :key="mealDea.mealType">
                <div v-if="mealDea.mealType === 'MEAL' "> {{ mealDea.description }} </div>
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
            time: null
        }
    },
    mounted(){
        this.time = setTimeout(() => {
            this.executeAfterDelay();
        }, 1000);
    },
    methods: {
        executeAfterDelay(){
            let data = this.info.mealRatios;
            for (let index = 0; index < data.length; index++) {
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
    
</style>