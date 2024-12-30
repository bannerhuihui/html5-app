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
        <h2>运动原则</h2>
      </div>
      <div class="base-item-body">
        <div v-if="info">
          <div v-for="item in info.exercisePrinciples" :key="item.type">
            <div class="base-chat">
              <div class="base-chat-img">
                <img :src="item.imageUrl" alt="" />
              </div>
              <div class="base-chat-ul">
                <div class="base-chat-ul-title">
                  {{ item.title }}
                </div>
                <div class="base-chat-ul-p">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="base-item">
      <div class="base-item-title">
        <h2>运动注意事项</h2>
      </div>
      <div class="base-item-body" v-if="info">
        <ul class="base-ul">
          <li v-for="(itemLi, index) in info.exerciseAttentions" :key="index">
            {{ itemLi }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ExercisePage",
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
      default: () => ({}), // 默认值为空对象
    },
  },
  created() {},
};
</script>