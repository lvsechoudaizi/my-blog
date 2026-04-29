# 前端样式规范草稿

## 文档目的
这份文档记录当前前端工程的样式组织方案，核心目标是避免样式继续集中在单个文件中，提升后续扩展性和可维护性。

## 当前技术方案
- 预处理器：Less
- 全局入口：`frontend/src/styles/index.less`
- 页面组件使用：`<style scoped lang="less">`

## 目录约定

### `styles/index.less`
统一样式入口，只负责聚合，不承载具体页面业务样式。

### `styles/variables.less`
放置设计常量，例如：
- 字体
- 间距
- 圆角
- 断点
- 过渡时间

原则：
- 有复用价值的尺寸和基础常量优先抽到这里
- 不要在页面中散落硬编码基础尺寸

### `styles/theme.less`
放置主题令牌，当前已预留：
- `:root`
- `[data-theme='dark']`
- `[data-theme='light']`

原则：
- 颜色优先通过 CSS 变量管理
- 后续如果增加主题切换，不直接改组件样式，而是切换根节点主题属性

### `styles/mixins.less`
放置可复用样式能力，例如：
- 卡片外观
- 页面容器
- 悬浮交互
- 焦点态

原则：
- 通用样式行为抽成 mixin
- 页面特有样式不要抽成全局 mixin

### `styles/base.less`
放置基础重置和全局标签样式，例如：
- `body`
- `a`
- `button`
- `h1`
- `h2`

### `styles/components.less`
放置跨页面可复用的 UI 类，例如：
- `.card`
- `.panel`
- `.actions`
- `.message`
- `.field`

原则：
- 多个页面都会用到的公共类放这里
- 某个页面专属类不要放到公共组件层

### `styles/layouts`
放置布局级样式，例如：
- 后台主布局
- 侧边栏
- 顶部栏

### `styles/pages`
放置页面级样式，例如：
- 登录页
- 首页
- 404 页

原则：
- 一页一个文件
- 页面样式通过页面根类收口，例如 `.login-page`、`.home-page`

## 页面级样式写法
推荐页面组件结构：

```vue
<template>
  <main class="page login-page">
    ...
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/login.less';
</style>
```

## 命名建议
- 页面根类：`xxx-page`
- 布局根类：`layout-xxx`
- 公共状态类：`is-xxx` 或语义化类名
- 不要使用无语义的类名，例如 `box1`、`item2`

## 主题扩展建议
如果后续要做主题切换：
1. 在根节点维护 `data-theme`
2. Pinia 里保存当前主题
3. 所有颜色通过 `theme.less` 的 CSS 变量下发
4. 页面样式尽量不要直接写死颜色

## 当前实践结论
- 样式入口已经从单文件迁移到目录化结构
- 页面、布局、公共样式已经分层
- 主题色已经有预留，后面可继续扩展主题切换能力

## 后续可以继续补充
- 表单规范
- 按钮等级规范
- 间距和排版令牌
- 主题切换实现方式
- 移动端适配约定
