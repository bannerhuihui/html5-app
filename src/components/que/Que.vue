<template>
  <div class="container">
    <!-- 顶部区域 -->
    <div class="header">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>

    <!-- 中间内容区域 -->
    <div class="content">
      <!-- 进度条 -->
      <div class="progress-container">
        <div class="progress-info">当前进度 {{ progress }}%</div>
        <van-progress
          class="progress-bar"
          :percentage="progress"
          stroke-width="16"
          :show-pivot="false"
          color="#6DDED6"
        />
      </div>
      <div class="upper-content">
        <h3>
          {{ queNo - 1 }}、{{ question.questionContents[0]
          }}{{ getQuestionTypeText }}
        </h3>
      </div>
      <div class="lower-content-container">
        <!-- 设置相对定位 -->
        <div class="lower-content" v-if="questionType === '1'">
          <div v-for="option in question.options" :key="option.optionCode">
            <van-button
              class="base-que-button"
              :class="{
                'button-que-button-active':
                  selectedOption === option.optionValue,
              }"
              :value="option.optionValue"
              type="primary"
              block
              round
              @click="radioUpd(option.optionValue)"
            >
              {{
                option.optionContents[0] === "脑卒中"
                  ? "脑卒中（中风）"
                  : option.optionContents[0] === "嗳气"
                  ? "嗳气（打嗝或打饱嗝）"
                  : option.optionContents[0] === "嗳气疾病"
                  ? "嗳气疾病（打嗝或打饱嗝）"
                  : option.optionContents[0]
              }}
            </van-button>
          </div>
        </div>
        <div class="lower-content" v-if="questionType === '2'">
          <div v-for="option in question.options" :key="option.optionCode">
            <van-button
              v-if="
                option.optionContents[0] !== '甲亢' &&
                option.optionContents[0] !== '甲减'
              "
              class="base-que-button"
              :class="{
                'button-que-button-active': selectedOptions.includes(
                  option.optionValue
                ),
              }"
              :value="option.optionValue"
              type="primary"
              block
              round
              @click="checkboxUpd(option.optionValue)"
            >
              {{
                option.optionContents[0] === "脑卒中"
                  ? "脑卒中（中风）"
                  : option.optionContents[0] === "嗳气"
                  ? "嗳气（打嗝或打饱嗝）"
                  : option.optionContents[0] === "嗳气疾病"
                  ? "嗳气疾病（打嗝或打饱嗝）"
                  : option.optionContents[0]
              }}
            </van-button>
          </div>
        </div>
        <div class="lower-content" v-if="questionType === '5'">
          <div>
            <span class="type-5-6-span">
              单位：{{ question.optionBuilder.unitCn }}（{{
                question.optionBuilder.unit
              }}）
            </span>
          </div>
          <div>
            <span class="type-5-6-span">
              输入范围：{{ question.optionBuilder.minValue }} ~
              {{ question.optionBuilder.maxValue }}
            </span>
          </div>
          <div class="input-container">
            <!-- 添加一个容器用于居中 -->
            <van-cell-group class="que-input-group" inset>
              <van-field
                v-model="values[0]"
                type="number"
                class="van-field-input"
                :placeholder="getPlaceholder"
                input-align="center"
                :min="question.optionBuilder.minValue"
                :max="question.optionBuilder.maxValue"
              ></van-field>
            </van-cell-group>
          </div>
          <div v-if="!question.required">
            <a class="skip-a-a" href="#" @click.prevent="skipQuestion"
              >暂时无法提供，直接跳过</a
            >
          </div>
        </div>
        <div class="lower-content" v-if="questionType === '6'">
          <div>
            <span class="type-5-6-span"> 单位：毫米汞柱（mmHg） </span>
          </div>
          <div v-for="(option, index) in question.optionBuilders" :key="index">
            <div>
              <span class="type-5-6-span">
                输入范围：{{ option.minValue }} ~ {{ option.maxValue }}
              </span>
            </div>
            <div class="input-container">
              <!-- 添加一个容器用于居中 -->
              <van-cell-group class="que-input-group" inset>
                <van-field
                  v-model="values[index]"
                  type="number"
                  class="van-field-input"
                  input-align="center"
                  :placeholder="placeholder(option.optionContent)"
                  :min="option.minValue"
                  :max="option.maxValue"
                  @change="validateInputOther($event, index)"
                ></van-field>
              </van-cell-group>
            </div>
          </div>
          <div v-if="!question.required">
            <a class="skip-a-a" href="#" @click.prevent="skipQuestion"
              >暂时无法提供，直接跳过</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        type="primary"
        class="previous-button"
        @click="onPrevious"
        round
        size="large"
      >
        上一题
      </van-button>
      <van-button
        :style="{
          backgroundColor:
            values.length > 0 || selectedOptions.length > 0
              ? '#50d2c8'
              : 'rgba(80, 210, 200, 0.5)',
          color:
            values.length > 0 || selectedOptions.length > 0 ? '#FFF' : '#FFF',
          cursor:
            values.length > 0 || selectedOptions.length > 0
              ? 'pointer'
              : 'not-allowed',
        }"
        :disabled="!(values.length > 0 || selectedOptions.length > 0)"
        @click="onNext"
        class="next-button"
        round
        size="large"
      >
        {{ last ? "提交" : "下一题" }}
      </van-button>
    </div>
  </div>
</template>

<script>
import {
  getQuestionBefor,
  getQuestionEnd,
  getQuestionNext,
} from "../../api/manager.js";
export default {
  name: "QuePage",
  data() {
    return {
      questionType: "",
      question: {
        questionContents: [],
        preContents: [],
        postContents: [],
        supplementContents: [],
        imageUrls: [],
        required: false,
        options: [],
        questionContent: "",
        defaultOptionCode: "",
        optionBuilder: {
          optionCode: "",
          required: false,
          optionContent: "",
          supplementContents: [],
          minValue: 0,
          maxValue: 0,
          defaultValue: 0,
          step: 0,
          unit: "",
          unitCn: "",
          style: "",
        },
        optionNodes: [],
        optionBuilders: [],
        supplementContent: "",
      },
      values: [],
      id: 0,
      queNo: 0,
      last: false,
      appName: "",
      appType: "",
      queId: "",
      questionCode: "",
      selectedOptions: [], //复选框
      selectedOption: null, // 添加状态变量
      totalCount: 0,
      showError: false,
      overflow: false, // 新增状态变量
      isScrolling: false, // 新增状态变量
    };
  },
  computed: {
    getQuestionTypeText() {
      switch (this.questionType) {
        case "1":
          return "（单选题）";
        case "2":
          return "（多选题）";
        default:
          return "";
      }
    },
    progress() {
      return (((this.queNo - 2) / this.totalCount) * 100).toFixed(0); // 保留两位小数
    },
    getPlaceholder() {
      switch (this.questionCode) {
        case "FBG":
          return "请输入，血糖值";
        case "PBG":
          return "请输入，血糖值";
        case "code3":
          return "请输入内容3";
        default:
          return "请输入内容"; // 默认提示
      }
    },
  },
  watch: {
    // 监听 options 的变化
    "question.options": {
      handler() {
        this.$nextTick(() => {
          this.checkOverflow(); // 在数据更新后检查是否溢出
        });
      },
      deep: true, // 深度监听
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.checkOverflow(); // 初始检查
      const container = this.$el.querySelector(".lower-content-container");
      if (container) {
        container.addEventListener("scroll", this.handleScroll); // 监听滚动事件
      }
    });
  },
  beforeUnmount() {
    // 修改为 beforeUnmount
    const container = this.$el.querySelector(".lower-content-container");
    if (container) {
      container.removeEventListener("scroll", this.handleScroll); // 移除滚动事件监听
    }
  },
  methods: {
    checkOverflow() {
      const container = this.$el.querySelector(".lower-content-container");
      if (container) {
        this.overflow = container.scrollHeight > container.clientHeight; // 更新 overflow 状态
        this.isOverflow = this.overflow; // 更新 isOverflow 状态
      }
    },
    handleScroll() {
      this.isScrolling = true; // 开始滚动
      this.$nextTick(() => {
        this.isScrolling = false; // 结束滚动
      });
    },
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },
    onPrevious() {
      if (this.queNo === 2) {
        this.$router.go(-1);
      } else {
        this.values = [];
        this.selectedOptions = [];
        this.selectedOption = null;
        let queData = {
          id: this.id,
          queNo: this.queNo - 1,
        };
        getQuestionBefor(queData).then((res) => {
          const data = res.data;
          if (data.code === 2000) {
            this.values = [];
            this.selectedOptions = [];
            this.selectedOption = null;
            this.id = data.data.id;
            this.questionType = data.data.questionType;
            this.queNo = data.data.queNo;
            this.last = data.data.last;
            this.totalCount = data.data.total;
            this.questionCode = data.data.questionCode;
            this.question = JSON.parse(data.data.question);
          }
        });
      }
    },
    onNext() {
      let baseData = null;
      // 判断是不是必填项
      if (
        this.question.required &&
        (this.values.length > 0 || this.selectedOptions.length > 0)
      ) {
        if (this.questionType === "1") {
          baseData = {
            queNo: this.queNo,
            id: this.id,
            data: {
              values: this.values,
            },
          };
        } else if (this.questionType === "2") {
          baseData = {
            queNo: this.queNo,
            id: this.id,
            data: {
              values: this.selectedOptions,
            },
          };
        }
        //获取下一页的问题
        if (this.last) {
          getQuestionEnd(baseData).then((res) => {
            if (res && res.data.code === 2000) {
              const pageInfo = {
                id: res.data.data.id,
                goodsList: res.data.data.goodsList,
              };
              this.$router.push({
                path: "/queEnd",
                query: { info: JSON.stringify(pageInfo) },
              });
            } else if (res && res.data.code === 4013) {
              const pageLastInfo = {
                id: res.data.data.id,
                appName: res.data.data.appName,
                appType: res.data.data.appType,
                callBackUrl: res.data.data.callBackUrl,
                callBackType: res.data.data.callBackType,
                callBackBody: res.data.data.callBackBody,
              };
              this.$router.push({
                path: "/success",
                query: { info: JSON.stringify(pageLastInfo) },
              });
            }
          });
        } else {
          getQuestionNext(baseData).then((res) => {
            let data = res.data;
            if (data.code === 2000) {
              this.values = [];
              this.selectedOptions = [];
              this.selectedOption = null;
              this.id = data.data.id;
              this.questionType = data.data.questionType;
              this.queNo = data.data.queNo;
              this.last = data.data.last;
              this.questionCode = data.data.questionCode;
              this.totalCount = data.data.total;
              this.question = JSON.parse(data.data.question);
            }
          });
        }
      } else {
        baseData = {
          queNo: this.queNo,
          id: this.id,
          data: {
            values: this.values,
          },
        };
        getQuestionNext(baseData).then((res) => {
          let data = res.data;
          if (data.code === 2000) {
            this.values = [];
            this.selectedOptions = [];
            this.selectedOption = null;
            this.id = data.data.id;
            this.questionType = data.data.questionType;
            this.queNo = data.data.queNo;
            this.last = data.data.last;
            this.questionCode = data.data.questionCode;
            this.question = JSON.parse(data.data.question);
            this.totalCount = data.data.total;
          }
        });
      }
    },
    radioUpd(value) {
      this.selectedOption = this.selectedOption === value ? null : value; // 切换选中的按钮
      if (this.selectedOption) {
        this.values = [value];
      } else {
        this.values = [];
      }
    },
    checkboxUpd(value) {
      const index = this.selectedOptions.indexOf(value);
      if (index === -1) {
        this.selectedOptions.push(value);
        //互斥逻辑
        this.question.options.forEach((option) => {
          if (option.excludeOptionValues) {
            if (this.selectedOptions.indexOf(option.optionValue) !== -1) {
              if (
                this.selectedOptions[this.selectedOptions.length - 1] ===
                option.optionValue
              ) {
                option.excludeOptionValues.forEach((excludeValue) => {
                  const excludeIndex =
                    this.selectedOptions.indexOf(excludeValue);
                  if (excludeIndex !== -1) {
                    this.selectedOptions.splice(excludeIndex, 1);
                  }
                });
              } else if (this.selectedOptions[0] === option.optionValue) {
                this.selectedOptions = [];
                this.selectedOptions.push(value);
              }
            }
          }
        });
      } else {
        this.selectedOptions.splice(index, 1);
      }
    },
    skipQuestion() {
      let baseData = null;
      baseData = {
        queNo: this.queNo,
        id: this.id,
        data: {
          values: this.values,
        },
      };
      getQuestionNext(baseData).then((res) => {
        let data = res.data;
        if (data.code === 2000) {
          this.values = [];
          this.selectedOptions = [];
          this.selectedOption = null;
          this.id = data.data.id;
          this.questionType = data.data.questionType;
          this.queNo = data.data.queNo;
          this.last = data.data.last;
          this.questionCode = data.data.questionCode;
          this.totalCount = data.data.total;
          this.question = JSON.parse(data.data.question);
        }
      });
    },
    placeholder(value) {
      if (value === "收缩压") {
        value = "高血压";
      } else {
        value = "低血压";
      }
      return "请输入，" + value;
    },
    validateInputOther(event, index) {
      const inputValue = parseFloat(event.target.value); // 获取输入框的值并转换为数字
      const minValue = parseFloat(event.target.min); // 获取 min 属性并转换为数字
      const maxValue = parseFloat(event.target.max); // 获取 max 属性并转换为数字
      // 检查输入值是否小于最小值
      if (inputValue < minValue) {
        this.values[index] = minValue; // 赋值为最小值
      }
      // 检查输入值是否大于最大值
      else if (inputValue > maxValue) {
        this.values[index] = maxValue; // 赋值为最大值
      }
    },
  },
  created() {
    const _info = this.$route?.query?.info;
    let baseInfo = JSON.parse(_info);
    this.id = baseInfo.id;
    this.questionType = baseInfo.questionType;
    this.queNo = baseInfo.queNo;
    this.last = baseInfo.last;
    this.question = JSON.parse(baseInfo.question);
    this.appName = baseInfo.appName;
    this.appType = baseInfo.appType;
    this.queId = baseInfo.queId;
    this.totalCount = baseInfo.total;
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10; /* 确保在最上层 */
}

.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.progress-info {
  font-size: 1rem; /* 设置进度信息的文字大小 */
  margin-bottom: 0.5rem; /* 进度信息和进度条之间的间距 */
}

.progress-bar {
  width: 86vw; /* 设置进度条宽度为 80vw */
}

.content {
  display: flex;
  flex-direction: column; /* 垂直排列上下部分 */
  padding: 1rem 1rem 0 1rem;
  text-align: center;
  margin-top: 2rem; /* 留出顶部区域的空间 */
}

.lower-content-container {
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 允许内容溢出时滚动 */
  position: relative; /* 确保阴影在容器内 */
}

.que-input-group {
  margin: 1rem;
  border-radius: 1.5rem;
}

.van-field-input {
  background-color: #f6f6f6;
  font-size: 1rem;
  font-weight: bold;
  color: black;
}

.upper-content {
  padding: 1rem; /* 设置内边距为1rem，增加内容与边界的间距 */
  text-align: left; /* 设置文本左对齐 */
}

.lower-content {
  padding: 1rem; /* 可选：设置内边距 */
}

.type-5-6-span {
  color: red;
}

.skip-a-a {
  text-decoration: underline; /* 添加下划线 */
  color: #0083fe; /* 可选：设置链接颜色 */
}

.base-que-button {
  background-color: #f6f6f6;
  color: #000;
  border: none;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  height: 3.5rem;
}

.button-que-button-active {
  background-color: #50d2c8;
}

.footer {
  bottom: 10px; /* 调整底部距离 */
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem; /* 减少上下内边距 */
  background-color: #fff; /* 可选：设置背景颜色 */
}

.previous-button {
  background-color: #fff;
  color: #50d2c8; /* 文字颜色 */
  border: 1px solid #50d2c8; /* 边框颜色 */
  margin-right: 0.5rem;
  margin-left: 2rem;
}

.next-button {
  margin-left: 0.5rem;
  margin-right: 2rem;
}
</style>
