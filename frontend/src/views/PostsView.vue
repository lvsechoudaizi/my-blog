<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import { hasAnyPermission } from '../utils/permission'

const userStore = useUserStore()
const { permissions } = storeToRefs(userStore)

const canWrite = computed(() => hasAnyPermission(permissions.value, ['blog:write']))
</script>

<template>
  <main class="page posts-page">
    <section class="card">
      <div class="intro">
        <p class="eyebrow">Blog</p>
        <h1>文章管理</h1>
        <p class="description">这里先做权限控制预留：页面访问、按钮可见性、后续接口权限。</p>
      </div>
    </section>

    <section class="card">
      <h2>操作区</h2>

      <div class="actions">
        <button type="button" class="secondary-button" v-permission="'blog:write'">新增文章</button>
        <button type="button" class="secondary-button" :disabled="!canWrite">
          {{ canWrite ? '发布文章' : '发布文章（无权限）' }}
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/posts.less';
</style>

