<template>
    <div class="base-item">
      <div class="base-item-title">
        <h3>根据您的评测，为您推荐以下方案：</h3>
      </div>
      <div class="base-item-body" v-if="info">
        <div v-for="(item, index) in info" :key="index" class="card">
            <div class="ichat">
                <div class="image-container">
                    <img :src="item.goodsImg" alt="" class="card-image">
                </div>
                <div class="card-content">
                    <div class="card-title">{{ item.name }}</div>
                    <div class="card-remark">{{ item.remark }}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: "NutritionPage",
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

<style>
.card {
    border: 1px solid #e0e0e0; /* 卡片边框 */
    border-radius: 8px; /* 圆角 */
    margin: 0.5rem; /* 外边距 */
    margin-right: 1.05rem;
    padding: 0.5rem; /* 内边距 */
    display: flex; /* 使用 Flexbox 布局 */
    background-color: #fff; /* 背景颜色 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.ichat {
    display: flex; /* 使用 Flexbox 布局 */
    align-items: center; /* 垂直居中对齐 */
}

.image-container {
    padding-left: 10px; /* 设置左侧内边距 */
}

.card-image {
    width: 5rem; /* 图片宽度 */
    height: 5rem; /* 图片高度 */
    border-radius: 4px; /* 图片圆角 */
    object-fit: cover; /* 保持图片的宽高比 */
}

.card-content {
    flex: 1; /* 使内容区域占据剩余空间 */
    text-align: left; /* 文字居中对齐 */
    margin-left: 1rem;
}

.card-title {
    font-weight: bold; /* 标题加粗 */
    font-size: 1.2rem; /* 标题字体大小 */
}

.card-remark {
    color: #666; /* 备注文字颜色 */
    font-size: 0.9rem; /* 备注字体大小 */
}
</style>