<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock data
const stats = [
  { label: '文章总数', value: 24, icon: '📝', color: '#60a5fa' },
  { label: '项目总数', value: 7, icon: '🚀', color: '#a78bfa' },
  { label: '总访问量', value: 12580, icon: '👁️', color: '#34d399' },
  { label: '今日访问量', value: 156, icon: '📈', color: '#fbbf24' },
]

const recentPosts = [
  { id: 1, title: 'Vue3 组合式 API 深度解析', category: '前端进阶', status: '已发布', date: '2026-06-25' },
  { id: 2, title: 'Docker Compose 部署 SpringBoot + Vue 全栈项目', category: 'Docker部署', status: '已发布', date: '2026-06-20' },
  { id: 3, title: 'AI 辅助编程的正确打开方式', category: 'AI应用', status: '草稿', date: '2026-06-18' },
]

const recentProjects = [
  { id: 1, name: 'AI神匠投诉处理平台', category: '商业项目', techStack: 'Vue3/Vite/Pinia', updatedAt: '2026-06-26' },
  { id: 2, name: 'My Blog 全栈个人官网', category: '自研项目', techStack: 'Next.js/Vue3/SpringBoot', updatedAt: '2026-06-24' },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <main class="page home-page">
    <!-- 统计卡片 -->
    <section class="stats-grid">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card card"
      >
        <div class="stat-icon" :style="{ background: stat.color + '20', color: stat.color }">
          {{ stat.icon }}
        </div>
        <div class="stat-info">
          <p class="stat-value">{{ stat.value.toLocaleString() }}</p>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- 快捷操作 -->
    <section class="card quick-actions">
      <h2>快捷操作</h2>
      <div class="actions-grid">
        <button type="button" class="action-btn" @click="navigateTo('/posts?action=new')">
          <span class="action-icon">✏️</span>
          <span>新增文章</span>
        </button>
        <button type="button" class="action-btn" @click="navigateTo('/projects?action=new')">
          <span class="action-icon">📦</span>
          <span>新增项目</span>
        </button>
        <button type="button" class="action-btn" @click="navigateTo('/profile')">
          <span class="action-icon">👤</span>
          <span>修改个人信息</span>
        </button>
        <button type="button" class="action-btn" @click="navigateTo('/settings')">
          <span class="action-icon">⚙️</span>
          <span>修改网站配置</span>
        </button>
      </div>
    </section>

    <!-- 最近操作区 -->
    <section class="recent-grid">
      <article class="card">
        <h2>最近文章</h2>
        <div class="recent-list">
          <div
            v-for="post in recentPosts"
            :key="post.id"
            class="recent-item"
            @click="navigateTo(`/posts?id=${post.id}`)"
          >
            <div class="recent-item-main">
              <p class="recent-title">{{ post.title }}</p>
              <p class="recent-meta">
                <span class="recent-category">{{ post.category }}</span>
                <span class="recent-date">{{ post.date }}</span>
              </p>
            </div>
            <span
              class="status-badge"
              :class="post.status === '已发布' ? 'published' : 'draft'"
            >
              {{ post.status }}
            </span>
          </div>
        </div>
        <button type="button" class="link-button view-all" @click="navigateTo('/posts')">
          查看全部文章 →
        </button>
      </article>

      <article class="card">
        <h2>最近项目</h2>
        <div class="recent-list">
          <div
            v-for="project in recentProjects"
            :key="project.id"
            class="recent-item"
            @click="navigateTo(`/projects?id=${project.id}`)"
          >
            <div class="recent-item-main">
              <p class="recent-title">{{ project.name }}</p>
              <p class="recent-meta">
                <span class="recent-category">{{ project.category }}</span>
                <span class="recent-tech">{{ project.techStack }}</span>
              </p>
            </div>
            <span class="recent-date">{{ project.updatedAt }}</span>
          </div>
        </div>
        <button type="button" class="link-button view-all" @click="navigateTo('/projects')">
          查看全部项目 →
        </button>
      </article>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/home.less';
</style>
