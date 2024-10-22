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
        <h2>生活起居</h2>
      </div>
      <div class="base-item-body">
        <div v-if="info">
            <div v-for="item in info.dailyLifeModes" :key="item.type">
                <div class="base-chat">
                    <div class="base-chat-img">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="base-chat-ul">
                        <div class="base-chat-ul-title">
                            {{item.title}}
                        </div>
                        <div class="base-chat-ul-p">
                            {{item.descriptions[0]}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "LifestylePage",
    data() {
        return {
            
        }
    },
    props:{
        info:{
            type: Object,
            default: () => ({}) // 默认值为空对象
        }
    },
    created(){

    }
}
</script>