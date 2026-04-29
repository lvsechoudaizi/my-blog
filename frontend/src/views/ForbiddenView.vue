<template>
  <main class="page forbidden-page">
    <section class="card auth-card forbidden-card">
      <p class="eyebrow">403</p>
      <h1>无权限访问</h1>
      <p class="description">当前账号没有访问该页面的权限，可以联系管理员或返回首页。</p>

      <div class="actions">
        <RouterLink to="/" class="router-button">返回首页</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/forbidden.less';
</style>

