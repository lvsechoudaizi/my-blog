<script setup lang="ts">
import { ref } from 'vue'

// Types
interface Skill {
  id: number
  name: string
  category: string
  level: '精通' | '熟练' | '了解'
}

interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
}

// Basic info
const basicInfo = ref({
  name: '李建华',
  title: '高级前端工程师 · 全栈开发工程师',
  tagline: '10年全栈开发经验，专注前端工程化与用户体验',
  bio: '拥有10年前端及全栈开发经验，熟悉 Vue、React 等主流框架，擅长大型项目架构设计和团队管理。曾主导多个商业级项目的前端架构搭建，对微前端、性能优化和工程化有深入理解。热爱技术分享，持续关注 AI 与前端交叉领域的创新应用。',
  intention: '前端开发 / 全栈开发工程师',
  education: '玉溪师范学院 · 通信工程 · 本科',
  experience: '10年',
  age: '32岁',
})

// Contact info
const contactInfo = ref({
  email: '931015218@qq.com',
  phone: '15730404707',
  githubUrl: 'https://github.com/',
  juejinUrl: 'https://juejin.cn/',
})

// Skills
const skills = ref<Skill[]>([
  { id: 1, name: 'Vue.js', category: '前端框架', level: '精通' },
  { id: 2, name: 'React', category: '前端框架', level: '精通' },
  { id: 3, name: 'TypeScript', category: '语言', level: '精通' },
  { id: 4, name: 'JavaScript', category: '语言', level: '精通' },
  { id: 5, name: 'Node.js', category: '后端', level: '熟练' },
  { id: 6, name: 'Spring Boot', category: '后端', level: '熟练' },
  { id: 7, name: 'Webpack/Vite', category: '工程化', level: '精通' },
  { id: 8, name: 'Docker', category: '运维', level: '熟练' },
  { id: 9, name: 'ECharts', category: '可视化', level: '精通' },
  { id: 10, name: 'CSS/Less/Sass', category: '样式', level: '精通' },
  { id: 11, name: 'PostgreSQL', category: '数据库', level: '熟练' },
  { id: 12, name: 'Redis', category: '数据库', level: '了解' },
  { id: 13, name: 'Git', category: '工具', level: '精通' },
  { id: 14, name: 'Linux', category: '运维', level: '熟练' },
])

// Experiences
const experiences = ref<Experience[]>([
  {
    id: 1,
    company: '某科技公司',
    position: '高级前端工程师',
    period: '2022.03 - 至今',
    description: '负责运营商数字化运营中台和 AI 投诉处理平台的前端架构设计与核心开发，带领5人前端团队完成项目交付。',
  },
  {
    id: 2,
    company: '某数字出版公司',
    position: '前端开发工程师',
    period: '2018.06 - 2022.02',
    description: '负责数字出版生态平台集群的微前端架构落地，使用 React + Qiankun 实现多应用统一管理。',
  },
  {
    id: 3,
    company: '某金融科技公司',
    position: '前端开发工程师',
    period: '2016.07 - 2018.05',
    description: '负责金融设备端前端开发框架的设计与实现，以及信用重庆政府门户的前端开发工作。',
  },
])

// UI state
const activeTab = ref<'basic' | 'skills' | 'experience' | 'contact'>('basic')
const savedMessage = ref('')

// Skill editor
const showSkillEditor = ref(false)
const editingSkill = ref<Skill | null>(null)
const skillForm = ref({ name: '', category: '', level: '熟练' as '精通' | '熟练' | '了解' })

// Experience editor
const showExpEditor = ref(false)
const editingExp = ref<Experience | null>(null)
const expForm = ref({ company: '', position: '', period: '', description: '' })

function saveBasicInfo() {
  savedMessage.value = '基础信息已保存'
  setTimeout(() => (savedMessage.value = ''), 2000)
}

function saveContactInfo() {
  savedMessage.value = '联系方式已保存'
  setTimeout(() => (savedMessage.value = ''), 2000)
}

// Skill CRUD
function openNewSkill() {
  editingSkill.value = null
  skillForm.value = { name: '', category: '', level: '熟练' }
  showSkillEditor.value = true
}

function openEditSkill(skill: Skill) {
  editingSkill.value = skill
  skillForm.value = { name: skill.name, category: skill.category, level: skill.level }
  showSkillEditor.value = true
}

function saveSkill() {
  if (!skillForm.value.name.trim()) return
  if (editingSkill.value) {
    const idx = skills.value.findIndex((s) => s.id === editingSkill.value!.id)
    if (idx !== -1) {
      skills.value[idx] = { ...skills.value[idx], ...skillForm.value }
    }
  } else {
    skills.value.push({ id: Date.now(), ...skillForm.value })
  }
  showSkillEditor.value = false
}

function deleteSkill(id: number) {
  skills.value = skills.value.filter((s) => s.id !== id)
}

// Experience CRUD
function openNewExp() {
  editingExp.value = null
  expForm.value = { company: '', position: '', period: '', description: '' }
  showExpEditor.value = true
}

function openEditExp(exp: Experience) {
  editingExp.value = exp
  expForm.value = { company: exp.company, position: exp.position, period: exp.period, description: exp.description }
  showExpEditor.value = true
}

function saveExp() {
  if (!expForm.value.company.trim()) return
  if (editingExp.value) {
    const idx = experiences.value.findIndex((e) => e.id === editingExp.value!.id)
    if (idx !== -1) {
      experiences.value[idx] = { ...experiences.value[idx], ...expForm.value }
    }
  } else {
    experiences.value.push({ id: Date.now(), ...expForm.value })
  }
  showExpEditor.value = false
}

function deleteExp(id: number) {
  experiences.value = experiences.value.filter((e) => e.id !== id)
}

function getLevelClass(level: string) {
  switch (level) {
    case '精通': return 'level-expert'
    case '熟练': return 'level-proficient'
    case '了解': return 'level-familiar'
    default: return ''
  }
}
</script>

<template>
  <main class="page profile-page">
    <section class="card page-header">
      <div class="header-left">
        <p class="eyebrow">Profile</p>
        <h1>个人信息管理</h1>
        <p class="description">管理前台"关于我"页面展示的所有内容</p>
      </div>
      <div class="avatar-placeholder">
        <span>📷</span>
        <p>头像上传</p>
      </div>
    </section>

    <transition name="fade">
      <div v-if="savedMessage" class="message success">{{ savedMessage }}</div>
    </transition>

    <!-- Tabs -->
    <div class="tabs">
      <button type="button" class="tab-btn" :class="{ active: activeTab === 'basic' }" @click="activeTab = 'basic'">基础信息</button>
      <button type="button" class="tab-btn" :class="{ active: activeTab === 'skills' }" @click="activeTab = 'skills'">技能矩阵</button>
      <button type="button" class="tab-btn" :class="{ active: activeTab === 'experience' }" @click="activeTab = 'experience'">职业经历</button>
      <button type="button" class="tab-btn" :class="{ active: activeTab === 'contact' }" @click="activeTab = 'contact'">联系方式</button>
    </div>

    <!-- Basic Info Tab -->
    <section v-if="activeTab === 'basic'" class="card">
      <h2>基础信息</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>姓名</label>
          <input v-model="basicInfo.name" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label>职业标签</label>
          <input v-model="basicInfo.title" type="text" class="form-input" />
        </div>
        <div class="form-group full-width">
          <label>一句话简介</label>
          <input v-model="basicInfo.tagline" type="text" class="form-input" />
        </div>
        <div class="form-group full-width">
          <label>个人简介</label>
          <textarea v-model="basicInfo.bio" class="form-textarea" rows="6"></textarea>
        </div>
        <div class="form-group">
          <label>求职意向</label>
          <input v-model="basicInfo.intention" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label>学历</label>
          <input v-model="basicInfo.education" type="text" class="form-input" />
        </div>
      </div>
      <div class="section-actions">
        <button type="button" class="router-button" @click="saveBasicInfo">保存基础信息</button>
      </div>
    </section>

    <!-- Skills Tab -->
    <section v-if="activeTab === 'skills'" class="card">
      <div class="section-header">
        <h2>技能矩阵</h2>
        <button type="button" class="router-button" @click="openNewSkill">+ 新增技能</button>
      </div>

      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.id" class="skill-item">
          <div class="skill-main">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-category">{{ skill.category }}</span>
          </div>
          <div class="skill-right">
            <span class="skill-level" :class="getLevelClass(skill.level)">{{ skill.level }}</span>
            <div class="skill-actions">
              <button type="button" class="table-btn edit-btn" @click="openEditSkill(skill)">编辑</button>
              <button type="button" class="table-btn delete-btn" @click="deleteSkill(skill.id)">删除</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Tab -->
    <section v-if="activeTab === 'experience'" class="card">
      <div class="section-header">
        <h2>职业经历</h2>
        <button type="button" class="router-button" @click="openNewExp">+ 新增经历</button>
      </div>

      <div class="timeline">
        <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <div>
                <h3 class="timeline-company">{{ exp.company }}</h3>
                <p class="timeline-position">{{ exp.position }}</p>
              </div>
              <div class="timeline-actions">
                <span class="timeline-period">{{ exp.period }}</span>
                <button type="button" class="table-btn edit-btn" @click="openEditExp(exp)">编辑</button>
                <button type="button" class="table-btn delete-btn" @click="deleteExp(exp.id)">删除</button>
              </div>
            </div>
            <p class="timeline-desc">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Tab -->
    <section v-if="activeTab === 'contact'" class="card">
      <h2>联系方式</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>邮箱</label>
          <input v-model="contactInfo.email" type="email" class="form-input" />
        </div>
        <div class="form-group">
          <label>电话</label>
          <input v-model="contactInfo.phone" type="tel" class="form-input" />
        </div>
        <div class="form-group">
          <label>GitHub URL</label>
          <input v-model="contactInfo.githubUrl" type="url" class="form-input" placeholder="https://github.com/..." />
        </div>
        <div class="form-group">
          <label>掘金 URL</label>
          <input v-model="contactInfo.juejinUrl" type="url" class="form-input" placeholder="https://juejin.cn/..." />
        </div>
      </div>
      <div class="section-actions">
        <button type="button" class="router-button" @click="saveContactInfo">保存联系方式</button>
      </div>
    </section>

    <!-- Skill Editor Modal -->
    <div v-if="showSkillEditor" class="modal-overlay" @click.self="showSkillEditor = false">
      <div class="modal-content card">
        <div class="modal-header">
          <h2>{{ editingSkill ? '编辑技能' : '新增技能' }}</h2>
          <button type="button" class="modal-close" @click="showSkillEditor = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>技能名称</label>
            <input v-model="skillForm.name" type="text" class="form-input" placeholder="如：Vue.js" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>分类</label>
              <input v-model="skillForm.category" type="text" class="form-input" placeholder="如：前端框架" />
            </div>
            <div class="form-group">
              <label>熟练度</label>
              <select v-model="skillForm.level" class="form-select">
                <option value="精通">精通</option>
                <option value="熟练">熟练</option>
                <option value="了解">了解</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary-button" @click="showSkillEditor = false">取消</button>
          <button type="button" class="router-button" @click="saveSkill">保存</button>
        </div>
      </div>
    </div>

    <!-- Experience Editor Modal -->
    <div v-if="showExpEditor" class="modal-overlay" @click.self="showExpEditor = false">
      <div class="modal-content card">
        <div class="modal-header">
          <h2>{{ editingExp ? '编辑经历' : '新增经历' }}</h2>
          <button type="button" class="modal-close" @click="showExpEditor = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>公司名称</label>
              <input v-model="expForm.company" type="text" class="form-input" placeholder="请输入公司名称" />
            </div>
            <div class="form-group">
              <label>职位</label>
              <input v-model="expForm.position" type="text" class="form-input" placeholder="请输入职位" />
            </div>
          </div>
          <div class="form-group">
            <label>时间段</label>
            <input v-model="expForm.period" type="text" class="form-input" placeholder="如：2022.03 - 至今" />
          </div>
          <div class="form-group">
            <label>工作简介</label>
            <textarea v-model="expForm.description" class="form-textarea" rows="4" placeholder="描述主要工作内容"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary-button" @click="showExpEditor = false">取消</button>
          <button type="button" class="router-button" @click="saveExp">保存</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/profile.less';
</style>
