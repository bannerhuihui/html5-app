<template>
  <van-overlay :show="isClosed" @click="show = false">
    <div class="wrapper" @click.stop>
      <div class="block">
        <img
          src="https://resource.cn-bj.ufileos.com/img/error-img-title.jpg"
          alt="错误信息"
          class="error_message_image"
        />
        <div class="relative-error">温馨提示</div>
        <div class="relative-line"></div>
        <div class="relative-message" v-if="errType === 1">
          <div>暂未查询到历史营养素评估报告，</div>
          <div>如有问题请联系服务人员</div>
        </div>
        <div class="relative-message" v-if="errType === 2">
          <div>您的评估问答暂未开放</div>
          <div>请您耐心等待</div>
          <div>评估开始时间</div>
          <div>{{ times }}</div>
        </div>
        <div class="relative-message" v-if="errType === 3">
          <div>您的评估问答已失效</div>
          <div>请联系服务人员重新获取问答</div>
          <div>评估结束时间</div>
          <div>{{ times }}</div>
        </div>
        <div class="relative-message" v-if="errType === 4">
          <div>页面错误</div>
          <div>请联系服务人员</div>
        </div>
        <van-button class="relative-button" round size="large" @click="closed"
          >我知道了</van-button
        >
      </div>
    </div>
  </van-overlay>
</template>


<script>
export default {
  props: {
    errType: {
      type: Number,
      required: true,
    },
    times: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isClosed: true,
    };
  },
  methods: {
    closed() {
      this.isClosed = false;
    },
  },
};
</script>

<style scoped>
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
.error_message_image {
  margin-top: 3rem;
  width: 4rem;
  height: 4rem;
}
.relative-error {
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
}

.relative-line {
  height: 1px;
  background-color: #ededed;
  margin: 2rem;
}

.relative-message {
  color: black;
  font-weight: bold;
}

.relative-message div:last-child {
  padding-bottom: 2rem;
}

.relative-button {
  width: 10rem;
  background-color: #50d2c8;
  color: #fff;
  font-weight: bold;
}
</style>