<template>
  <main class="page not-found-page">
    <section class="card auth-card not-found-card">
      <p class="eyebrow">404</p>
      <h1>页面不存在</h1>
      <p class="description">你访问的路由暂时没有对应页面，可以返回首页或重新进入登录页。</p>

      <div class="actions">
        <RouterLink to="/" class="router-button">返回首页</RouterLink>
        <RouterLink to="/login" class="router-button secondary-router-button">前往登录</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/not-found.less';
</style>
