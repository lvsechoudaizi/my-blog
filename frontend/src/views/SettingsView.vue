<script setup lang="ts">
import { ref } from 'vue'

// Site config
const siteConfig = ref({
  name: '李建华的个人博客',
  description: '一个高级前端工程师的技术分享与个人展示平台',
  faviconUrl: '/favicon.ico',
  heroTitle: '用代码构建，用文字记录',
})

// SEO config
const seoConfig = ref({
  title: '李建华的个人博客 - 前端开发 · 全栈探索',
  keywords: '前端开发,Vue,React,TypeScript,全栈,技术博客',
  description: '10年前端开发经验，专注 Vue/React 生态，分享前端进阶、全栈开发和工程化实践。',
})

// Feature config
const featureConfig = ref({
  postsPerPage: 10,
  enableComments: true,
  showViewCount: true,
})

// Style config
const styleConfig = ref({
  defaultTheme: 'dark' as 'dark' | 'light',
})

const savedSection = ref('')

function saveSection(section: string) {
  savedSection.value = section
  setTimeout(() => (savedSection.value = ''), 2000)
}
</script>

<template>
  <main class="page settings-page">
    <section class="card page-header">
      <div class="header-left">
        <p class="eyebrow">System</p>
        <h1>网站配置</h1>
        <p class="description">管理网站的基础配置、SEO、功能和样式设置</p>
      </div>
    </section>

    <transition name="fade">
      <div v-if="savedSection" class="message success">{{ savedSection }} 已保存</div>
    </transition>

    <!-- Site Config -->
    <section class="card config-card">
      <div class="config-header">
        <h2>🌐 网站基础配置</h2>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>网站名称</label>
          <input v-model="siteConfig.name" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label>网站图标 URL</label>
          <input v-model="siteConfig.faviconUrl" type="text" class="form-input" />
        </div>
        <div class="form-group full-width">
          <label>网站简介</label>
          <textarea v-model="siteConfig.description" class="form-textarea" rows="3"></textarea>
        </div>
        <div class="form-group full-width">
          <label>首页标语</label>
          <input v-model="siteConfig.heroTitle" type="text" class="form-input" />
        </div>
      </div>
      <div class="section-actions">
        <button type="button" class="router-button" @click="saveSection('网站基础配置')">保存</button>
      </div>
    </section>

    <!-- SEO Config -->
    <section class="card config-card">
      <div class="config-header">
        <h2>🔍 SEO 配置</h2>
      </div>
      <div class="form-grid">
        <div class="form-group full-width">
          <label>网站标题</label>
          <input v-model="seoConfig.title" type="text" class="form-input" />
        </div>
        <div class="form-group full-width">
          <label>关键词</label>
          <input v-model="seoConfig.keywords" type="text" class="form-input" placeholder="多个关键词用逗号分隔" />
        </div>
        <div class="form-group full-width">
          <label>描述</label>
          <textarea v-model="seoConfig.description" class="form-textarea" rows="3"></textarea>
        </div>
      </div>
      <div class="section-actions">
        <button type="button" class="router-button" @click="saveSection('SEO 配置')">保存</button>
      </div>
    </section>

    <!-- Feature Config -->
    <section class="card config-card">
      <div class="config-header">
        <h2>⚡ 功能配置</h2>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>博客每页数量</label>
          <input v-model.number="featureConfig.postsPerPage" type="number" class="form-input" min="1" max="50" />
        </div>
        <div class="form-group">
          <label>是否开启评论</label>
          <div class="toggle-row">
            <button
              type="button"
              class="toggle-btn"
              :class="{ active: featureConfig.enableComments }"
              @click="featureConfig.enableComments = !featureConfig.enableComments"
            >
              {{ featureConfig.enableComments ? '已开启' : '已关闭' }}
            </button>
          </div>
        </div>
        <div class="form-group">
          <label>是否显示访问量</label>
          <div class="toggle-row">
            <button
              type="button"
              class="toggle-btn"
              :class="{ active: featureConfig.showViewCount }"
              @click="featureConfig.showViewCount = !featureConfig.showViewCount"
            >
              {{ featureConfig.showViewCount ? '已开启' : '已关闭' }}
            </button>
          </div>
        </div>
      </div>
      <div class="section-actions">
        <button type="button" class="router-button" @click="saveSection('功能配置')">保存</button>
      </div>
    </section>

    <!-- Style Config -->
    <section class="card config-card">
      <div class="config-header">
        <h2>🎨 样式配置</h2>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>默认主题</label>
          <div class="theme-options">
            <button
              type="button"
              class="theme-option"
              :class="{ active: styleConfig.defaultTheme === 'dark' }"
              @click="styleConfig.defaultTheme = 'dark'"
            >
              🌙 暗黑模式
            </button>
            <button
              type="button"
              class="theme-option"
              :class="{ active: styleConfig.defaultTheme === 'light' }"
              @click="styleConfig.defaultTheme = 'light'"
            >
              ☀️ 亮色模式
            </button>
          </div>
        </div>
      </div>
      <div class="section-actions">
        <button type="button" class="router-button" @click="saveSection('样式配置')">保存</button>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/settings.less';
</style>
