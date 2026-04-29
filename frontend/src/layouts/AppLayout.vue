<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const { username, displayName, roles, permissions, refreshing } = storeToRefs(userStore)

async function handleRefreshUser() {
  try {
    await userStore.refreshCurrentUser()
  } catch {
    // Errors are surfaced on the related pages when needed.
  }
}

async function handleLogout() {
  userStore.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="layout-shell">
    <aside class="layout-sidebar">
      <div>
        <p class="eyebrow">My Blog Admin</p>
        <h2 class="layout-title">后台管理</h2>
        <p class="layout-text">这里先放基础布局，后续可以继续扩展菜单、面包屑和权限导航。</p>
      </div>

      <nav class="nav-list">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/posts" class="nav-link" v-permission="'blog:read'">文章管理</RouterLink>
        <RouterLink to="/settings" class="nav-link" v-permission="'system:admin'">系统设置</RouterLink>
      </nav>
    </aside>

    <div class="layout-main">
      <header class="layout-header">
        <div>
          <p class="layout-text">当前用户</p>
          <strong>{{ displayName || username || '未登录' }}</strong>
          <p class="layout-text">{{ username ? `账号：${username}` : '暂无账号信息' }}</p>
          <p class="layout-text">{{ roles.length ? roles.join(', ') : '暂无角色信息' }}</p>
          <p class="layout-text">{{ permissions.length ? `权限数：${permissions.length}` : '暂无权限信息' }}</p>
        </div>

        <div class="layout-actions">
          <button type="button" class="secondary-button" :disabled="refreshing" @click="handleRefreshUser">
            {{ refreshing ? '刷新中...' : '刷新用户信息' }}
          </button>
          <button type="button" class="secondary-button" @click="handleLogout">退出登录</button>
        </div>
      </header>

      <div class="layout-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../styles/layouts/app-layout.less';
</style>
