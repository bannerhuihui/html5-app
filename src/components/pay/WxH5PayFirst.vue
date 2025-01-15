<template>
  <div class="pay-base">
    <h2>微信支付</h2>
    <van-image
      width="7rem"
      height="7rem"
      fit="contain"
      position="left"
      src="https://pic.616pic.com/ys_img/00/03/79/SkfHaoi23t.jpg"
      class="wx-img"
    />

    <div class="amount-input">
      <van-field
        v-model="paymentAmount"
        label="支付金额："
        label-align="center"
        placeholder="请输入金额"
        type="number"
        :rules="[{ required: true, message: '请输入支付金额', trigger: 'blur' }]"
      />
    </div>

    <div class="button-div">
      <van-button
        class="pay-button"
        type="primary"
        size="large"
        color="#07C160"
        @click="wxPay"
      >
        <van-icon name="wechat-pay" size="1.4rem" />
        微信支付
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "h5payFirst",
  data() {
    return {
      WxPay: {
        amount: {},
        sceneInfo: {}
      },
      paymentAmount: "", // 用于存储输入的支付金额
    };
  },
  components: {},
  methods: {
    wxPay() {
      console.log("wx支付中");
      this.WxPay.amount = {
        total: this.paymentAmount * 100,
        currency: "CNY",
      };
      let type;
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) {
        type = "Android";
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        type = "iOS";
      } else {
        type = "Wap"
      }
      console.log(type);
      console.log(this.WxPay);
    },
  },
};
</script>

<style scoped>
.pay-base {
  padding: 2rem;
}
.pay-order {
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.pay-button {
  margin-top: 1rem;
  font-size: 1.5rem;
}
.wx-img {
  margin: 5rem 0;
}

/* 放大 van-field 的字体 */
.amount-input .van-field {
  font-size: 1.5rem; /* 设置字体大小 */
}

.amount-input .van-field__label {
  font-size: 1.5rem; /* 设置标签字体大小 */
  line-height: 1.5; /* 设置标签的行高 */
}

.amount-input .van-field__control {
  font-size: 1.5rem; /* 设置输入框字体大小 */
  line-height: 1.5; /* 设置输入框的行高 */
  padding-top: 0.5rem; /* 调整输入框的上内边距 */
  padding-bottom: 0.5rem; /* 调整输入框的下内边距 */
}
</style>

