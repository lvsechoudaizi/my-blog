<script setup lang="ts">
import { ref } from 'vue'

interface Tag {
  id: number
  name: string
  postCount: number
}

const tags = ref<Tag[]>([
  { id: 1, name: 'Vue', postCount: 8 },
  { id: 2, name: 'React', postCount: 4 },
  { id: 3, name: 'TypeScript', postCount: 10 },
  { id: 4, name: 'SpringBoot', postCount: 3 },
  { id: 5, name: 'Docker', postCount: 5 },
  { id: 6, name: 'AI', postCount: 3 },
  { id: 7, name: '工程化', postCount: 4 },
  { id: 8, name: '可视化', postCount: 2 },
  { id: 9, name: '微前端', postCount: 2 },
  { id: 10, name: 'Redis', postCount: 1 },
])

const showEditor = ref(false)
const editingTag = ref<Tag | null>(null)
const showDeleteConfirm = ref(false)
const deleteTargetId = ref<number | null>(null)
const searchQuery = ref('')

const form = ref({ name: '' })

const filteredTags = ref(tags)

function filterTags() {
  if (!searchQuery.value) {
    filteredTags.value = tags.value
  } else {
    filteredTags.value = tags.value.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
}

function openNew() {
  editingTag.value = null
  form.value = { name: '' }
  showEditor.value = true
}

function openEdit(tag: Tag) {
  editingTag.value = tag
  form.value = { name: tag.name }
  showEditor.value = true
}

function save() {
  if (!form.value.name.trim()) return

  if (editingTag.value) {
    const idx = tags.value.findIndex((t) => t.id === editingTag.value!.id)
    if (idx !== -1) {
      tags.value[idx] = { ...tags.value[idx], name: form.value.name }
    }
  } else {
    tags.value.push({
      id: Date.now(),
      name: form.value.name,
      postCount: 0,
    })
  }

  showEditor.value = false
  filterTags()
}

function confirmDelete(id: number) {
  deleteTargetId.value = id
  showDeleteConfirm.value = true
}

function deleteTag() {
  if (deleteTargetId.value !== null) {
    tags.value = tags.value.filter((t) => t.id !== deleteTargetId.value)
  }
  showDeleteConfirm.value = false
  deleteTargetId.value = null
  filterTags()
}
</script>

<template>
  <main class="page tags-page">
    <section class="card page-header">
      <div class="header-left">
        <p class="eyebrow">Blog</p>
        <h1>标签管理</h1>
      </div>
      <button type="button" class="router-button" @click="openNew">+ 新增标签</button>
    </section>

    <section class="card filters-card">
      <input
        v-model="searchQuery"
        type="text"
        class="filter-input"
        placeholder="搜索标签..."
        @input="filterTags"
      />
    </section>

    <section class="card tags-grid-card">
      <div class="tags-grid">
        <div v-for="tag in filteredTags" :key="tag.id" class="tag-card">
          <div class="tag-info">
            <span class="tag-name">{{ tag.name }}</span>
            <span class="tag-count">{{ tag.postCount }} 篇文章</span>
          </div>
          <div class="tag-actions">
            <button type="button" class="table-btn edit-btn" @click="openEdit(tag)">编辑</button>
            <button type="button" class="table-btn delete-btn" @click="confirmDelete(tag.id)">删除</button>
          </div>
        </div>
        <div v-if="filteredTags.length === 0" class="empty-state">
          <p>暂无标签</p>
        </div>
      </div>
    </section>

    <!-- Editor Modal -->
    <div v-if="showEditor" class="modal-overlay" @click.self="showEditor = false">
      <div class="modal-content card">
        <div class="modal-header">
          <h2>{{ editingTag ? '编辑标签' : '新增标签' }}</h2>
          <button type="button" class="modal-close" @click="showEditor = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>标签名称</label>
            <input v-model="form.name" type="text" class="form-input" placeholder="请输入标签名称" />
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
          <button type="button" class="router-button delete-confirm-btn" @click="deleteTag">确认删除</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/tags.less';
</style>
