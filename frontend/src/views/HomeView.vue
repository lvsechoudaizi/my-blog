<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import { hasAnyPermission } from '../utils/permission'

const userStore = useUserStore()
const { token, username, displayName, roles, permissions, refreshing } = storeToRefs(userStore)

const shortToken = computed(() => {
  return token.value ? `${token.value.slice(0, 32)}...` : '暂无 Token'
})

const canReadPosts = computed(() => hasAnyPermission(permissions.value, ['blog:read']))
const canWritePosts = computed(() => hasAnyPermission(permissions.value, ['blog:write']))
</script>

<template>
  <main class="page home-page">
    <section class="card">
      <div class="intro">
        <p class="eyebrow">My Blog Admin</p>
        <h1>Hello World</h1>
        <p class="description">
          这里先作为登录后的默认首页，后续可以继续扩展为仪表盘、文章管理、项目管理等模块。
        </p>
      </div>
    </section>

    <section class="panel-grid">
      <article class="panel">
        <h2>当前状态</h2>
        <dl class="result-list">
          <div>
            <dt>路由状态</dt>
            <dd>已进入首页，占位完成</dd>
          </div>
          <div>
            <dt>当前用户</dt>
            <dd>{{ displayName || username || '暂无用户信息' }}</dd>
          </div>
          <div>
            <dt>登录账号</dt>
            <dd>{{ username || '暂无账号信息' }}</dd>
          </div>
          <div>
            <dt>角色列表</dt>
            <dd>{{ roles.length ? roles.join(', ') : '暂无角色信息' }}</dd>
          </div>
          <div>
            <dt>权限列表</dt>
            <dd>{{ permissions.length ? permissions.join(', ') : '暂无权限信息' }}</dd>
          </div>
          <div>
            <dt>登录凭证</dt>
            <dd class="token">{{ shortToken }}</dd>
          </div>
        </dl>
      </article>

      <article class="panel">
        <h2>后续预留</h2>
        <dl class="result-list">
          <div>
            <dt>模块一</dt>
            <dd>后台仪表盘</dd>
          </div>
          <div>
            <dt>模块二</dt>
            <dd>博客文章管理</dd>
          </div>
          <div>
            <dt>模块三</dt>
            <dd>项目管理与配置中心接入</dd>
          </div>
          <div>
            <dt>用户刷新状态</dt>
            <dd>{{ refreshing ? '正在刷新用户信息' : '用户信息已就绪' }}</dd>
          </div>
        </dl>
      </article>

      <article class="panel">
        <h2>权限预留</h2>
        <dl class="result-list">
          <div>
            <dt>可访问文章管理</dt>
            <dd>{{ canReadPosts ? '是' : '否' }}</dd>
          </div>
          <div>
            <dt>可新增文章</dt>
            <dd>{{ canWritePosts ? '是' : '否' }}</dd>
          </div>
          <div>
            <dt>按钮控制</dt>
            <dd>
              <button type="button" class="secondary-button" v-permission="'blog:write'">新增文章</button>
            </dd>
          </div>
        </dl>
      </article>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/home.less';
</style>
