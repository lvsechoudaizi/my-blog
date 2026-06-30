<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  id: number
  name: string
  category: string
  techStack: string[]
  summary: string
  detail: string
  cover: string
  githubUrl: string
  demoUrl: string
  period: string
  role: string
  createdAt: string
}

const categoryOptions = ['商业项目', '自研项目', '练习项目']

const projects = ref<Project[]>([
  {
    id: 1,
    name: '运营商数字化运营中台',
    category: '商业项目',
    techStack: ['Vue2', 'ECharts', 'ArcGIS'],
    summary: '面向运营商的大型数字化运营中台，提供数据可视化、地图分析和业务管理能力。',
    detail: '负责前端架构设计和核心模块开发，包括大屏数据可视化、GIS 地图集成等。',
    cover: '',
    githubUrl: '',
    demoUrl: '',
    period: '2024.01 - 2025.08',
    role: '前端负责人',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'AI神匠投诉处理平台',
    category: '商业项目',
    techStack: ['Vue3', 'Vite', 'Pinia'],
    summary: '基于 AI 的智能投诉处理平台，提供工单管理、智能分类和自动化处理流程。',
    detail: '主导前端从 0 到 1 搭建，使用 Vue3 全家桶 + TypeScript 构建现代化管理后台。',
    cover: '',
    githubUrl: '',
    demoUrl: '',
    period: '2025.10 - 2026.02',
    role: '前端负责人',
    createdAt: '2025-10-01',
  },
  {
    id: 3,
    name: '数字出版生态平台集群',
    category: '商业项目',
    techStack: ['React', 'Qiankun', 'Mobx'],
    summary: '基于微前端架构的数字出版平台集群，包含多个子应用的统一门户。',
    detail: '使用 Qiankun 微前端框架，统一管理多个出版业务子应用，实现独立部署和运行。',
    cover: '',
    githubUrl: '',
    demoUrl: '',
    period: '2019.01 - 2022.03',
    role: '前端开发工程师',
    createdAt: '2019-01-10',
  },
  {
    id: 4,
    name: '金融设备端前端开发框架',
    category: '商业项目',
    techStack: ['Java', 'AngularJS'],
    summary: '面向金融终端设备的统一前端开发框架，提供标准化组件和开发流程。',
    detail: '设计并实现金融设备端的前端开发框架，包括 UI 组件库、构建工具链和开发规范。',
    cover: '',
    githubUrl: '',
    demoUrl: '',
    period: '2016.09 - 2017.12',
    role: '前端开发工程师',
    createdAt: '2016-09-01',
  },
  {
    id: 5,
    name: '信用重庆政府门户',
    category: '商业项目',
    techStack: ['Vue', 'Express'],
    summary: '重庆市政府信用信息公开门户网站，提供信用查询、公示和监管服务。',
    detail: '负责前端页面开发和 Node.js 中间层接口对接，实现信用数据可视化展示。',
    cover: '',
    githubUrl: '',
    demoUrl: '',
    period: '2018.05 - 2018.12',
    role: '前端开发工程师',
    createdAt: '2018-05-01',
  },
  {
    id: 6,
    name: 'My Blog 全栈个人官网',
    category: '自研项目',
    techStack: ['Next.js', 'Vue3', 'SpringBoot'],
    summary: '全栈个人博客官网，包含前台展示和后台管理系统，支持文章管理和主题切换。',
    detail: '独立设计开发的全栈项目，前台使用 Next.js SSR，后台使用 Vue3 + SpringBoot。',
    cover: '',
    githubUrl: 'https://github.com/',
    demoUrl: '',
    period: '持续迭代',
    role: '全栈开发',
    createdAt: '2025-06-01',
  },
  {
    id: 7,
    name: 'StoryForge AI 智能写作平台',
    category: '自研项目',
    techStack: ['NestJS', 'PostgreSQL', 'Docker'],
    summary: '基于 AI 的智能写作辅助平台，支持故事生成、情节推荐和文本润色。',
    detail: '使用 NestJS + PostgreSQL 构建后端服务，集成 AI 模型提供写作辅助功能。',
    cover: '',
    githubUrl: 'https://github.com/',
    demoUrl: '',
    period: '持续迭代',
    role: '全栈开发',
    createdAt: '2025-08-15',
  },
])

const showEditor = ref(false)
const editingProject = ref<Project | null>(null)
const showDeleteConfirm = ref(false)
const deleteTargetId = ref<number | null>(null)
const filterCategory = ref('')

const filteredProjects = computed(() => {
  if (!filterCategory.value) return projects.value
  return projects.value.filter((p) => p.category === filterCategory.value)
})

const form = ref({
  name: '',
  category: categoryOptions[0],
  techStack: [] as string[],
  summary: '',
  detail: '',
  cover: '',
  githubUrl: '',
  demoUrl: '',
  period: '',
  role: '',
})

const techInput = ref('')

function addTech() {
  const val = techInput.value.trim()
  if (val && !form.value.techStack.includes(val)) {
    form.value.techStack.push(val)
  }
  techInput.value = ''
}

function removeTech(tech: string) {
  form.value.techStack = form.value.techStack.filter((t) => t !== tech)
}

function openNew() {
  editingProject.value = null
  form.value = {
    name: '',
    category: categoryOptions[0],
    techStack: [],
    summary: '',
    detail: '',
    cover: '',
    githubUrl: '',
    demoUrl: '',
    period: '',
    role: '',
  }
  showEditor.value = true
}

function openEdit(project: Project) {
  editingProject.value = project
  form.value = {
    name: project.name,
    category: project.category,
    techStack: [...project.techStack],
    summary: project.summary,
    detail: project.detail,
    cover: project.cover,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
    period: project.period,
    role: project.role,
  }
  showEditor.value = true
}

function save() {
  if (!form.value.name.trim()) return

  if (editingProject.value) {
    const idx = projects.value.findIndex((p) => p.id === editingProject.value!.id)
    if (idx !== -1) {
      projects.value[idx] = {
        ...projects.value[idx],
        name: form.value.name,
        category: form.value.category,
        techStack: [...form.value.techStack],
        summary: form.value.summary,
        detail: form.value.detail,
        cover: form.value.cover,
        githubUrl: form.value.githubUrl,
        demoUrl: form.value.demoUrl,
        period: form.value.period,
        role: form.value.role,
      }
    }
  } else {
    projects.value.unshift({
      id: Date.now(),
      name: form.value.name,
      category: form.value.category,
      techStack: [...form.value.techStack],
      summary: form.value.summary,
      detail: form.value.detail,
      cover: form.value.cover,
      githubUrl: form.value.githubUrl,
      demoUrl: form.value.demoUrl,
      period: form.value.period,
      role: form.value.role,
      createdAt: new Date().toISOString().split('T')[0],
    })
  }

  showEditor.value = false
}

function confirmDelete(id: number) {
  deleteTargetId.value = id
  showDeleteConfirm.value = true
}

function deleteProject() {
  if (deleteTargetId.value !== null) {
    projects.value = projects.value.filter((p) => p.id !== deleteTargetId.value)
  }
  showDeleteConfirm.value = false
  deleteTargetId.value = null
}
</script>

<template>
  <main class="page projects-page">
    <section class="card page-header">
      <div class="header-left">
        <p class="eyebrow">Projects</p>
        <h1>项目管理</h1>
      </div>
      <button type="button" class="router-button" @click="openNew">+ 新增项目</button>
    </section>

    <section class="card filters-card">
      <div class="filter-row">
        <select v-model="filterCategory" class="filter-select">
          <option value="">全部分类</option>
          <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </section>

    <section class="card table-card">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>项目名称</th>
              <th>分类</th>
              <th>技术栈</th>
              <th>开发周期</th>
              <th>角色</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in filteredProjects" :key="project.id">
              <td class="name-cell">
                <div class="project-name">{{ project.name }}</div>
                <div class="project-summary">{{ project.summary }}</div>
              </td>
              <td><span class="category-badge" :class="project.category === '商业项目' ? 'commercial' : 'personal'">{{ project.category }}</span></td>
              <td>
                <div class="tags-cell">
                  <span v-for="tech in project.techStack" :key="tech" class="tag-badge">{{ tech }}</span>
                </div>
              </td>
              <td class="period-cell">{{ project.period }}</td>
              <td class="role-cell">{{ project.role }}</td>
              <td class="actions-cell">
                <button type="button" class="table-btn edit-btn" @click="openEdit(project)">编辑</button>
                <button type="button" class="table-btn delete-btn" @click="confirmDelete(project.id)">删除</button>
              </td>
            </tr>
            <tr v-if="filteredProjects.length === 0">
              <td colspan="6" class="empty-cell">暂无项目</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Editor Modal -->
    <div v-if="showEditor" class="modal-overlay" @click.self="showEditor = false">
      <div class="modal-content card">
        <div class="modal-header">
          <h2>{{ editingProject ? '编辑项目' : '新增项目' }}</h2>
          <button type="button" class="modal-close" @click="showEditor = false">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>项目名称</label>
            <input v-model="form.name" type="text" class="form-input" placeholder="请输入项目名称" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>分类</label>
              <select v-model="form.category" class="form-select">
                <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>开发周期</label>
              <input v-model="form.period" type="text" class="form-input" placeholder="如：2024.01 - 2025.08" />
            </div>
          </div>

          <div class="form-group">
            <label>技术栈</label>
            <div class="tech-input-row">
              <input
                v-model="techInput"
                type="text"
                class="form-input"
                placeholder="输入技术名称，按回车添加"
                @keyup.enter="addTech"
              />
              <button type="button" class="secondary-button add-tech-btn" @click="addTech">添加</button>
            </div>
            <div class="tech-tags">
              <span v-for="tech in form.techStack" :key="tech" class="tech-tag">
                {{ tech }}
                <button type="button" class="remove-tech" @click="removeTech(tech)">✕</button>
              </span>
            </div>
          </div>

          <div class="form-group">
            <label>个人角色</label>
            <input v-model="form.role" type="text" class="form-input" placeholder="如：前端负责人" />
          </div>

          <div class="form-group">
            <label>项目简介</label>
            <textarea v-model="form.summary" class="form-textarea" rows="3" placeholder="一句话描述项目"></textarea>
          </div>

          <div class="form-group">
            <label>项目详情</label>
            <textarea v-model="form.detail" class="form-textarea" rows="5" placeholder="详细描述项目内容"></textarea>
          </div>

          <div class="form-group">
            <label>封面图</label>
            <div class="upload-placeholder">
              <span>📷 点击上传封面图（占位）</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>GitHub 地址</label>
              <input v-model="form.githubUrl" type="url" class="form-input" placeholder="https://github.com/..." />
            </div>
            <div class="form-group">
              <label>在线演示地址</label>
              <input v-model="form.demoUrl" type="url" class="form-input" placeholder="https://..." />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="secondary-button" @click="showEditor = false">取消</button>
          <button type="button" class="router-button" @click="save">保存</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="showDeleteConfirm = false">
      <div class="modal-content card confirm-modal">
        <h2>确认删除</h2>
        <p class="description">删除后无法恢复，是否继续？</p>
        <div class="modal-footer">
          <button type="button" class="secondary-button" @click="showDeleteConfirm = false">取消</button>
          <button type="button" class="router-button delete-confirm-btn" @click="deleteProject">确认删除</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/projects.less';
</style>
