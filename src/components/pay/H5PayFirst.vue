<template>
  <div class="pay-base">
    <h2>请确认订单</h2>
    <van-card
      num="2"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      origin-price="10.00"
    />
    <van-card
      num="2"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      origin-price="10.00"
    />
    <van-card
      num="2"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      origin-price="10.00"
    />
    <van-card
      num="2"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      origin-price="10.00"
    />
    <div class="pay-order">
      订单总金额：1000.00 元
      <br />
      预支付金额：300.00 元
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
      <van-button
        class="pay-button"
        type="primary"
        size="large"
        color="#226BF3"
        @click="aliPay"
      >
        <van-icon name="alipay" size="1.4rem" />
        支付宝支付
      </van-button>
      <van-button
        class="pay-button"
        type="primary"
        size="large"
        color="#FF8000"
        @click="uacPay"
        icon="https://resource.cn-bj.ufileos.com/img/yinlian.jpg"
      >
        云闪付
      </van-button>
    </div>
  </div>
</template>

<script>
import { pay } from "../../api/manager.js";
export default {
  name: "h5payFirst",
  data() {
    return {
      H5pay: {
        merOrderId: "2024123023563699087653",
        goods: [],
        attachedData: "",
        orderDesc: "",
        goodsTag: "",
        originalAmount: "",
        totalAmount: "1",
        notifyUrl: "",
        returnUrl: "",
        sceneType: "", //业务数据类型
        merAppName: "", //应用名称
        merAppId: "", //应用标识
      },
      GoodsItem: {
        goodsId: '',
        goodsName: '',
        quantity: '',
        price: '',
        goodsCategory: '',
        body: '',
        subMerchantId: '',
        merOrderId: '',
        subOrderAmount: ''
      }
    };
  },
  components: {},
  methods: {
    aliPay() {
      console.log("发送消息")
      pay("ali",this.H5pay);
    },
    wxPay(){

    },
    uacPay(){

    }

  },
};
</script>

<style scoped>
.pay-base {
  padding: 2rem;
}
.pay-order {
  text-align: left;
  padding-left: 2rem;
  padding-top: 3rem;
  font-weight: bold;
}
.pay-button {
  margin-top: 1rem;
}
</style>

