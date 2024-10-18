# html5-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


<style scoped>
.container {
  display: flex; /* 使用 flexbox 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  height: 100vh; /* 高度占满视口高度 */
  background-color: #FFF; /* 背景颜色为白色 */
}

.header {
  position: fixed; /* 固定在顶部 */
  top: 0; /* 顶部位置为0 */
  left: 0; /* 左侧位置为0 */
  right: 0; /* 右侧位置为0 */
  z-index: 10; /* 确保在最上层 */
}

.progress-container {
  display: flex; /* 使用 flexbox 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 子元素水平居中 */
  justify-content: center; /* 子元素垂直居中 */
  margin: 1rem 0; /* 上下外边距为1rem */
}

.progress-info {
  font-size: 1rem; /* 设置进度信息的文字大小 */
  margin-bottom: 0.5rem; /* 进度信息和进度条之间的间距 */
}

.progress-bar {
  width: 86vw; /* 设置进度条宽度为86vw */
}

.content {
  display: flex; /* 使用 flexbox 布局 */
  flex-direction: column; /* 垂直排列上下部分 */
  padding: 1rem 1rem 0 1rem; /* 设置内边距 */
  text-align: center; /* 文本居中对齐 */
  margin-top: 100px; /* 留出顶部区域的空间 */
  margin-bottom: 100px; /* 留出底部区域的空间 */
}

.lower-content-container {
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 允许内容溢出时滚动 */
  position: relative; /* 确保阴影在容器内 */
}

.que-input-group {
  margin: 1rem; /* 设置外边距为1rem */
  border-radius: 1.5rem; /* 设置圆角 */
}

.van-field-input {
  background-color: #F6F6F6; /* 输入框背景颜色 */
  font-size: 1rem; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  color: black; /* 字体颜色为黑色 */
}

.upper-content {
  padding: 1rem; /* 设置内边距为1rem，增加内容与边界的间距 */
  text-align: left; /* 设置文本左对齐 */
}

.lower-content {
  padding: 1rem; /* 设置内边距为1rem */
}

.type-5-6-span {
  color: red; /* 设置文本颜色为红色 */
}

.skip-a-a {
  text-decoration: underline; /* 添加下划线 */
  color: #0083FE; /* 设置链接颜色 */
}

.base-que-button {
  background-color: #F6F6F6; /* 按钮背景颜色 */
  color: #000; /* 按钮文字颜色 */
  border: none; /* 无边框 */
  margin-bottom: 1.5rem; /* 下外边距为1.5rem */
  font-size: 1rem; /* 字体大小 */
  height: 3.5rem; /* 按钮高度 */
}

.button-que-button-active {
  background-color: #50d2c8; /* 激活状态下按钮的背景颜色 */
}

.footer {
  position: fixed; /* 固定在底部 */
  bottom: 10px; /* 距离底部10px */
  left: 0; /* 左侧位置为0 */
  right: 0; /* 右侧位置为0 */
  display: flex; /* 使用 flexbox 布局 */
  justify-content: space-around; /* 子元素均匀分布 */
  padding: 0.5rem; /* 上下内边距为0.5rem */
  background-color: #FFF; /* 背景颜色为白色 */
}

.previous-button {
  background-color: #FFF; /* 按钮背景颜色为白色 */
  color: #50d2c8; /* 按钮文字颜色 */
  border: 1px solid #50d2c8; /* 边框颜色 */
  margin-right: 0.5rem; /* 右外边距为0.5rem */
  margin-left: 2rem; /* 左外边距为2rem */
}

.next-button {
  margin-left: 0.5rem; /* 左外边距为0.5rem */
  margin-right: 2rem; /* 右外边距为2rem */
}
</style>
