<template>
  <div class="pay-base">
    <h2>请确认订单</h2>
    <van-card
      num="1"
      price="128.00"
      thumb="https://api.rtyouth.com/admin/images/goods/4_pc_big_2022102515151125.jpg"
    >
      <template #title>
        <div class="custom-title">劲得钙</div> <!-- 使用自定义标题 -->
      </template>
      <template #desc>
        <div class="card-desc">
          <p>产品规格：168克(1.4克x120片)</p>
          <p>适宜人群：青少年及中老年人</p>
          <p>食用方法及食用量：每日2-3片，咀嚼或含服</p>
        </div>
      </template>
    </van-card>
    <van-card
      num="1"
      price="129.00"
      thumb="https://api.rtyouth.com/admin/images/goods/88_pc_big_2022122814492467.jpg"
    >
      <template #title>
        <div class="custom-title">牛磺酸维生素C泡腾片</div> <!-- 使用自定义标题 -->
      </template>
      <template #desc>
        <div class="card-desc">
          <p>产品规格：4.15克*24片</p>
          <p>适宜人群：免疫力低下者</p>
          <p>不适宜人群：少年儿童/孕妇/乳母</p>
        </div>
      </template>
    </van-card>
    <van-card
      num="1"
      price="258.00"
      thumb="https://api.rtyouth.com/admin/images/goods/78_pc_big_2021110911042695.jpg"
    >
      <template #title>
        <div class="custom-title">大豆肽蛋白粉固体饮料(盒装)</div> <!-- 使用自定义标题 -->
      </template>
      <template #desc>
        <div class="card-desc">
          <p>产品规格：16克*16袋/盒</p>
          <p>适宜人群：成人及青少年</p>
          <p>使用方法及食用量：将一包本产品加入200毫升温水，揽拌均匀即可直接饮用。也可加入到一杯250毫升的牛奶、豆浆或其他饮料中，搅拌均匀后饮用</p>
        </div>
      </template>
    </van-card>
    <van-cell-group center class="pay-order">
      <van-cell title-style="font-size:1.2rem;" title="订单总金额："  value="515.00元" />
      <van-cell title-style="font-size:1.2rem;" title="预支付金额："  value="100.00元" />
    </van-cell-group>
    <div class="button-div">
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
    </div>
  </div>
</template>

<script>
import { pay } from "../../api/manager.js";
export default {
  name: "H5PayFirst",
  data() {
    return {
      H5pay: {
        merOrderId: "",
        goods: [],
        attachedData: "",
        orderDesc: "",
        goodsTag: "",
        originalAmount: "1",
        totalAmount: "1",
        notifyUrl: "",
        returnUrl: "",
        sceneType: "", //业务数据类型
        merAppName: "", //应用名称
        merAppId: "", //应用标识
      },
      GoodsItem: {
        goodsId: "",
        goodsName: "",
        quantity: "",
        price: "",
        goodsCategory: "",
        body: "",
        subMerchantId: "",
        merOrderId: "",
        subOrderAmount: "",
      },
    };
  },
  methods: {
    aliPay() {
      console.log("发送消息");
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const timestamp = date.getTime();
      const randomNum = Math.floor(Math.random() * 1000); // 生成0-999的随机数
      this.H5pay.merOrderId = `${year}${month}${day}${timestamp}${randomNum}`;
      pay("ali","chinaums_test", this.H5pay).then((res) => {
        if (res) {
           if (res.data.code == 2000) {
             //初始化数据
             window.location.href = res.data.data;
           }
        }
      });
    },
    wxPay() {},
    uacPay() {},
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
.card-desc {
  line-height: 1.5; /* 设置行高，增加可读性 */
  text-align: left; /* 设置文本左对齐 */
  margin-left: 2rem; /* 添加左边距 */
}

/* 使描述内容只显示一行，超出隐藏 */
.card-desc p {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
}

/* 增大标题字体 */
.custom-title {
  font-size: 1.1rem; /* 设置标题字体大小 */
  font-weight: bold; /* 设置标题加粗 */
}
</style>