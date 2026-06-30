<script setup lang="ts">
import { ref, computed } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useUserStore } from '../stores/user'
// import { hasAnyPermission } from '../utils/permission'

// const userStore = useUserStore()
// const { permissions } = storeToRefs(userStore)

// const canWrite = computed(() => hasAnyPermission(permissions.value, ['blog:write']))

// Types
interface Post {
  id: number
  title: string
  category: string
  tags: string[]
  status: '已发布' | '草稿'
  publishDate: string
  views: number
  content: string
  cover: string
}

// Mock data
const categories = ['前端进阶', '全栈开发', 'Docker部署', 'AI应用', '踩坑日记']
const allTags = ['Vue', 'React', 'TypeScript', 'SpringBoot', 'Docker', 'AI', '工程化', '可视化', '微前端', 'Redis']

const posts = ref<Post[]>([
  {
    id: 1,
    title: 'Vue3 组合式 API 深度解析：从 setup 到自定义 Hooks',
    category: '前端进阶',
    tags: ['Vue', 'TypeScript'],
    status: '已发布',
    publishDate: '2026-06-25',
    views: 1280,
    content: '## 前言\n\nVue3 的组合式 API 是一次革命性的改变...',
    cover: '',
  },
  {
    id: 2,
    title: 'Docker Compose 部署 SpringBoot + Vue 全栈项目实战',
    category: 'Docker部署',
    tags: ['Docker', 'SpringBoot', 'Vue'],
    status: '已发布',
    publishDate: '2026-06-20',
    views: 856,
    content: '## 环境准备\n\n本文使用 Docker Compose 编排前后端服务...',
    cover: '',
  },
  {
    id: 3,
    title: 'AI 辅助编程的正确打开方式：从 Copilot 到 Claude',
    category: 'AI应用',
    tags: ['AI', '工程化'],
    status: '草稿',
    publishDate: '2026-06-18',
    views: 0,
    content: '## AI 编程工具概览\n\n目前主流的 AI 编程辅助工具有...',
    cover: '',
  },
  {
    id: 4,
    title: '微前端架构落地实践：qiankun 从入门到生产部署',
    category: '前端进阶',
    tags: ['微前端', 'React', 'Vue'],
    status: '已发布',
    publishDate: '2026-06-10',
    views: 2340,
    content: '## 为什么需要微前端\n\n随着业务复杂度增长，单体前端应用...',
    cover: '',
  },
  {
    id: 5,
    title: 'Redis 缓存穿透、击穿、雪崩解决方案总结',
    category: '全栈开发',
    tags: ['Redis', 'SpringBoot'],
    status: '草稿',
    publishDate: '2026-06-05',
    views: 0,
    content: '## 缓存穿透\n\n缓存穿透是指查询一个根本不存在的数据...',
    cover: '',
  },
])

// State
const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const showEditor = ref(false)
const editingPost = ref<Post | null>(null)
const showDeleteConfirm = ref(false)
const deleteTargetId = ref<number | null>(null)

// Form
const form = ref({
  title: '',
  category: categories[0],
  tags: [] as string[],
  status: '草稿' as '已发布' | '草稿',
  content: '',
  cover: '',
})

// Computed
const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchSearch = !searchQuery.value ||
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = !filterCategory.value || post.category === filterCategory.value
    const matchStatus = !filterStatus.value || post.status === filterStatus.value
    return matchSearch && matchCategory && matchStatus
  })
})

// Methods
function openNewPost() {
  editingPost.value = null
  form.value = {
    title: '',
    category: categories[0],
    tags: [],
    status: '草稿',
    content: '',
    cover: '',
  }
  showEditor.value = true
}

function openEditPost(post: Post) {
  editingPost.value = post
  form.value = {
    title: post.title,
    category: post.category,
    tags: [...post.tags],
    status: post.status,
    content: post.content,
    cover: post.cover,
  }
  showEditor.value = true
}

function savePost() {
  if (!form.value.title.trim()) return

  if (editingPost.value) {
    const idx = posts.value.findIndex((p) => p.id === editingPost.value!.id)
    if (idx !== -1) {
      posts.value[idx] = {
        ...posts.value[idx],
        title: form.value.title,
        category: form.value.category,
        tags: [...form.value.tags],
        status: form.value.status,
        content: form.value.content,
        cover: form.value.cover,
      }
    }
  } else {
    const newPost: Post = {
      id: Date.now(),
      title: form.value.title,
      category: form.value.category,
      tags: [...form.value.tags],
      status: form.value.status,
      publishDate: new Date().toISOString().split('T')[0],
      views: 0,
      content: form.value.content,
      cover: form.value.cover,
    }
    posts.value.unshift(newPost)
  }

  showEditor.value = false
}

function togglePostStatus(post: Post) {
  post.status = post.status === '已发布' ? '草稿' : '已发布'
}

function confirmDelete(id: number) {
  deleteTargetId.value = id
  showDeleteConfirm.value = true
}

function deletePost() {
  if (deleteTargetId.value !== null) {
    posts.value = posts.value.filter((p) => p.id !== deleteTargetId.value)
  }
  showDeleteConfirm.value = false
  deleteTargetId.value = null
}

function toggleTag(tag: string) {
  const idx = form.value.tags.indexOf(tag)
  if (idx === -1) {
    form.value.tags.push(tag)
  } else {
    form.value.tags.splice(idx, 1)
  }
}

function clearFilters() {
  searchQuery.value = ''
  filterCategory.value = ''
  filterStatus.value = ''
}
</script>

<template>
  <main class="page posts-page">
    <!-- Header -->
    <section class="card posts-header">
      <div class="header-left">
        <p class="eyebrow">Blog</p>
        <h1>文章管理</h1>
      </div>
      <button type="button" class="router-button" v-permission="'blog:write'" @click="openNewPost">
        + 新增文章
      </button>
    </section>

    <!-- Filters -->
    <section class="card posts-filters">
      <div class="filter-row">
        <input
          v-model="searchQuery"
          type="text"
          class="filter-input"
          placeholder="搜索文章标题..."
        />
        <select v-model="filterCategory" class="filter-select">
          <option value="">全部分类</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <select v-model="filterStatus" class="filter-select">
          <option value="">全部状态</option>
          <option value="已发布">已发布</option>
          <option value="草稿">草稿</option>
        </select>
        <button type="button" class="secondary-button" @click="clearFilters">重置</button>
      </div>
    </section>

    <!-- Posts Table -->
    <section class="card posts-table-card">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>标题</th>
              <th>分类</th>
              <th>标签</th>
              <th>状态</th>
              <th>发布时间</th>
              <th>阅读量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in filteredPosts" :key="post.id">
              <td class="title-cell">{{ post.title }}</td>
              <td><span class="category-badge">{{ post.category }}</span></td>
              <td>
                <div class="tags-cell">
                  <span v-for="tag in post.tags" :key="tag" class="tag-badge">{{ tag }}</span>
                </div>
              </td>
              <td>
                <span class="status-badge" :class="post.status === '已发布' ? 'published' : 'draft'">
                  {{ post.status }}
                </span>
              </td>
              <td class="date-cell">{{ post.publishDate }}</td>
              <td class="views-cell">{{ post.views.toLocaleString() }}</td>
              <td class="actions-cell">
                <button type="button" class="table-btn edit-btn" @click="openEditPost(post)">编辑</button>
                <button type="button" class="table-btn toggle-btn" @click="togglePostStatus(post)">
                  {{ post.status === '已发布' ? '下架' : '发布' }}
                </button>
                <button type="button" class="table-btn delete-btn" @click="confirmDelete(post.id)">删除</button>
              </td>
            </tr>
            <tr v-if="filteredPosts.length === 0">
              <td colspan="7" class="empty-cell">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Editor Modal -->
    <div v-if="showEditor" class="modal-overlay" @click.self="showEditor = false">
      <div class="modal-content card">
        <div class="modal-header">
          <h2>{{ editingPost ? '编辑文章' : '新增文章' }}</h2>
          <button type="button" class="modal-close" @click="showEditor = false">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>标题</label>
            <input v-model="form.title" type="text" class="form-input" placeholder="请输入文章标题" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>分类</label>
              <select v-model="form.category" class="form-select">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>发布状态</label>
              <select v-model="form.status" class="form-select">
                <option value="草稿">草稿</option>
                <option value="已发布">已发布</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>标签</label>
            <div class="tag-selector">
              <button
                v-for="tag in allTags"
                :key="tag"
                type="button"
                class="tag-option"
                :class="{ selected: form.tags.includes(tag) }"
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>封面图</label>
            <div class="upload-placeholder">
              <span>📷 点击上传封面图（占位）</span>
            </div>
          </div>

          <div class="form-group">
            <label>内容（Markdown）</label>
            <textarea
              v-model="form.content"
              class="form-textarea markdown-editor"
              placeholder="请输入 Markdown 内容..."
              rows="12"
            ></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="secondary-button" @click="showEditor = false">取消</button>
          <button type="button" class="router-button" @click="savePost">保存</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="showDeleteConfirm = false">
      <div class="modal-content card confirm-modal">
        <h2>确认删除</h2>
        <p class="description">删除后无法恢复，是否继续？</p>
        <div class="modal-footer">
          <button type="button" class="secondary-button" @click="showDeleteConfirm = false">取消</button>
          <button type="button" class="router-button delete-confirm-btn" @click="deletePost">确认删除</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/posts.less';
</style>
