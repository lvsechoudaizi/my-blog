<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()
const { username, displayName, roles, permissions, refreshing } = storeToRefs(userStore)
const { isDarkMode } = storeToRefs(themeStore)

const sidebarCollapsed = ref(false)
const blogMenuExpanded = ref(true)

function handleToggleTheme() {
  themeStore.toggleTheme()
}

async function handleRefreshUser() {
  try {
    await userStore.refreshCurrentUser()
  } catch {
    // Errors are surfaced on the related pages when needed.
  }
}

async function handleLogout() {
  await userStore.logoutUser()
  await router.push('/login')
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

function toggleBlogMenu() {
  blogMenuExpanded.value = !blogMenuExpanded.value
}
</script>

<template>
  <div class="layout-shell" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <aside class="layout-sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <p class="eyebrow">My Blog Admin</p>
          <h2 v-if="!sidebarCollapsed" class="layout-title">后台管理</h2>
        </div>

        <button class="sidebar-toggle" type="button" @click="toggleSidebar">
          {{ sidebarCollapsed ? '→' : '←' }}
        </button>
      </div>

      <nav class="nav-list">
        <RouterLink to="/" class="nav-link">
          <span class="nav-icon">📊</span>
          <span v-if="!sidebarCollapsed" class="nav-text">控制台</span>
        </RouterLink>

        <div class="nav-group">
          <button
            v-if="!sidebarCollapsed"
            type="button"
            class="nav-group-toggle"
            @click="toggleBlogMenu"
          >
            <span class="nav-icon">📝</span>
            <span class="nav-text">博客管理</span>
            <span class="nav-arrow" :class="{ expanded: blogMenuExpanded }">›</span>
          </button>
          <div
            v-if="!sidebarCollapsed"
            class="nav-submenu"
            :class="{ collapsed: !blogMenuExpanded }"
          >
            <RouterLink to="/posts" class="nav-link nav-sublink" v-permission="'blog:read'">
              <span class="nav-text">文章管理</span>
            </RouterLink>
            <RouterLink to="/categories" class="nav-link nav-sublink" v-permission="'blog:read'">
              <span class="nav-text">分类管理</span>
            </RouterLink>
            <RouterLink to="/tags" class="nav-link nav-sublink" v-permission="'blog:read'">
              <span class="nav-text">标签管理</span>
            </RouterLink>
          </div>
        </div>

        <RouterLink to="/projects" class="nav-link">
          <span class="nav-icon">🚀</span>
          <span v-if="!sidebarCollapsed" class="nav-text">项目管理</span>
        </RouterLink>

        <RouterLink to="/profile" class="nav-link">
          <span class="nav-icon">👤</span>
          <span v-if="!sidebarCollapsed" class="nav-text">个人信息</span>
        </RouterLink>

        <RouterLink to="/settings" class="nav-link" v-permission="'system:admin'">
          <span class="nav-icon">⚙️</span>
          <span v-if="!sidebarCollapsed" class="nav-text">网站配置</span>
        </RouterLink>

        <RouterLink to="/logs" class="nav-link" v-permission="'system:admin'">
          <span class="nav-icon">📋</span>
          <span v-if="!sidebarCollapsed" class="nav-text">访问日志</span>
        </RouterLink>
      </nav>

      <div v-if="!sidebarCollapsed" class="sidebar-footer">
        <div class="sidebar-user">
          <p class="layout-text">{{ displayName || username || '未登录' }}</p>
          <p class="layout-text muted">{{ roles.length ? roles.join(', ') : '' }}</p>
        </div>
      </div>
    </aside>

    <div class="layout-main">
      <header class="layout-header">
        <div class="header-info">
          <p class="layout-text">
            {{ displayName || username || '未登录' }}
            <template v-if="username"> · {{ username }}</template>
          </p>
          <p class="layout-text" v-if="permissions.length">权限数：{{ permissions.length }}</p>
        </div>

        <div class="layout-actions">
          <button type="button" class="secondary-button" @click="handleToggleTheme">
            {{ isDarkMode ? '☀️ 浅色' : '🌙 深色' }}
          </button>
          <button type="button" class="secondary-button" :disabled="refreshing" @click="handleRefreshUser">
            {{ refreshing ? '刷新中...' : '🔄 刷新' }}
          </button>
          <button type="button" class="secondary-button logout-btn" @click="handleLogout">退出</button>
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

.sidebar-collapsed {
  grid-template-columns: 72px 1fr;

  .layout-sidebar {
    padding: @space-4 @space-2;
    align-items: center;
  }

  .nav-link {
    justify-content: center;
    padding: 12px;
  }

  .nav-icon {
    margin: 0;
  }
}

.sidebar-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: @space-2;
}

.sidebar-brand {
  flex: 1;
  min-width: 0;
}

.sidebar-toggle {
  .button-reset();
  background: var(--color-secondary-soft);
  color: var(--color-text-secondary);
  padding: 6px 10px;
  font-size: 14px;
  border-radius: @radius-sm;
  flex-shrink: 0;
  transition: background @transition-fast;

  &:hover {
    background: var(--color-secondary-soft-hover);
  }
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: @space-2;
  padding: 11px 14px;
  border-radius: @radius-md;
  color: var(--color-text-secondary);
  background: var(--color-bg-panel);
  border: 1px solid transparent;
  transition: background @transition-fast, border-color @transition-fast, transform @transition-fast;
  text-decoration: none;

  &:hover,
  &.router-link-active {
    transform: translateY(-1px);
    background: var(--color-primary-soft);
    border-color: var(--color-border-active);
  }
}

.nav-icon {
  font-size: 16px;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-group-toggle {
  .button-reset();
  display: flex;
  align-items: center;
  gap: @space-2;
  width: 100%;
  padding: 11px 14px;
  border-radius: @radius-md;
  color: var(--color-text-secondary);
  background: var(--color-bg-panel);
  font-size: 14px;
  font-weight: 500;
  transition: background @transition-fast;

  &:hover {
    background: var(--color-secondary-soft-hover);
  }
}

.nav-arrow {
  margin-left: auto;
  transition: transform @transition-fast;
  font-size: 16px;

  &.expanded {
    transform: rotate(90deg);
  }
}

.nav-submenu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: @space-3;
  max-height: 200px;
  overflow: hidden;
  transition: max-height 0.3s ease;

  &.collapsed {
    max-height: 0;
  }
}

.nav-sublink {
  font-size: 13px;
  padding: 9px 14px;
}

.sidebar-footer {
  border-top: 1px solid var(--color-border-secondary);
  padding-top: @space-3;
}

.sidebar-user {
  .layout-text {
    font-size: 13px;

    &.muted {
      color: var(--color-text-muted);
      font-size: 12px;
    }
  }
}

.header-info {
  display: flex;
  gap: @space-4;
  align-items: center;
}

.logout-btn {
  color: var(--color-danger-text) !important;
  border-color: var(--color-danger-bg) !important;
}
</style>
