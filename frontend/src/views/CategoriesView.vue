<script setup lang="ts">
import { ref, computed } from 'vue'

interface Category {
  id: number
  name: string
  postCount: number
  sort: number
}

const categories = ref<Category[]>([
  { id: 1, name: '前端进阶', postCount: 8, sort: 1 },
  { id: 2, name: '全栈开发', postCount: 5, sort: 2 },
  { id: 3, name: 'Docker部署', postCount: 4, sort: 3 },
  { id: 4, name: 'AI应用', postCount: 3, sort: 4 },
  { id: 5, name: '踩坑日记', postCount: 4, sort: 5 },
])

const showEditor = ref(false)
const editingCategory = ref<Category | null>(null)
const showDeleteConfirm = ref(false)
const deleteTargetId = ref<number | null>(null)

const form = ref({
  name: '',
  sort: 1,
})

const sortedCategories = computed(() => {
  return [...categories.value].sort((a, b) => a.sort - b.sort)
})

function openNew() {
  editingCategory.value = null
  form.value = { name: '', sort: categories.value.length + 1 }
  showEditor.value = true
}

function openEdit(cat: Category) {
  editingCategory.value = cat
  form.value = { name: cat.name, sort: cat.sort }
  showEditor.value = true
}

function save() {
  if (!form.value.name.trim()) return

  if (editingCategory.value) {
    const idx = categories.value.findIndex((c) => c.id === editingCategory.value!.id)
    if (idx !== -1) {
      categories.value[idx] = {
        ...categories.value[idx],
        name: form.value.name,
        sort: form.value.sort,
      }
    }
  } else {
    categories.value.push({
      id: Date.now(),
      name: form.value.name,
      postCount: 0,
      sort: form.value.sort,
    })
  }

  showEditor.value = false
}

function confirmDelete(id: number) {
  deleteTargetId.value = id
  showDeleteConfirm.value = true
}

function deleteCategory() {
  if (deleteTargetId.value !== null) {
    categories.value = categories.value.filter((c) => c.id !== deleteTargetId.value)
  }
  showDeleteConfirm.value = false
  deleteTargetId.value = null
}

function moveUp(cat: Category) {
  const idx = categories.value.findIndex((c) => c.id === cat.id)
  if (idx > 0) {
    const prev = categories.value[idx - 1]
    const tempSort = prev.sort
    prev.sort = cat.sort
    cat.sort = tempSort
  }
}

function moveDown(cat: Category) {
  const idx = categories.value.findIndex((c) => c.id === cat.id)
  if (idx < categories.value.length - 1) {
    const next = categories.value[idx + 1]
    const tempSort = next.sort
    next.sort = cat.sort
    cat.sort = tempSort
  }
}
</script>

<template>
  <main class="page categories-page">
    <section class="card page-header">
      <div class="header-left">
        <p class="eyebrow">Blog</p>
        <h1>分类管理</h1>
      </div>
      <button type="button" class="router-button" @click="openNew">+ 新增分类</button>
    </section>

    <section class="card table-card">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>排序</th>
              <th>分类名称</th>
              <th>文章数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in sortedCategories" :key="cat.id">
              <td class="sort-cell">
                <span class="sort-number">{{ cat.sort }}</span>
                <div class="sort-actions">
                  <button type="button" class="sort-btn" :disabled="cat.sort === 1" @click="moveUp(cat)">↑</button>
                  <button type="button" class="sort-btn" :disabled="cat.sort === sortedCategories.length" @click="moveDown(cat)">↓</button>
                </div>
              </td>
              <td class="name-cell">{{ cat.name }}</td>
              <td><span class="count-badge">{{ cat.postCount }} 篇</span></td>
              <td class="actions-cell">
                <button type="button" class="table-btn edit-btn" @click="openEdit(cat)">编辑</button>
                <button type="button" class="table-btn delete-btn" @click="confirmDelete(cat.id)">删除</button>
              </td>
            </tr>
            <tr v-if="sortedCategories.length === 0">
              <td colspan="4" class="empty-cell">暂无分类</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Editor Modal -->
    <div v-if="showEditor" class="modal-overlay" @click.self="showEditor = false">
      <div class="modal-content card">
        <div class="modal-header">
          <h2>{{ editingCategory ? '编辑分类' : '新增分类' }}</h2>
          <button type="button" class="modal-close" @click="showEditor = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>分类名称</label>
            <input v-model="form.name" type="text" class="form-input" placeholder="请输入分类名称" />
          </div>
          <div class="form-group">
            <label>排序</label>
            <input v-model.number="form.sort" type="number" class="form-input" min="1" />
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
        <p class="description">删除分类后，该分类下的文章将变为未分类。是否继续？</p>
        <div class="modal-footer">
          <button type="button" class="secondary-button" @click="showDeleteConfirm = false">取消</button>
          <button type="button" class="router-button delete-confirm-btn" @click="deleteCategory">确认删除</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/categories.less';
</style>
