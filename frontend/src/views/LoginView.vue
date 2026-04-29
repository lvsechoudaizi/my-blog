<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const { loading } = storeToRefs(userStore)

const form = reactive({
  username: 'admin',
  password: 'Admin@123',
})

const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''

  try {
    await userStore.loginUser(form)
    await router.push('/')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '登录失败'
  }
}
</script>

<template>
  <main class="page login-page">
    <section class="card auth-card">
      <div class="intro">
        <p class="eyebrow">My Blog Admin</p>
        <h1>登录</h1>
        <p class="description">
          通过网关调用后端 `POST /api/auth/login`，登录成功后跳转到首页。
        </p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <label class="field">
          <span>用户名</span>
          <input v-model.trim="form.username" type="text" autocomplete="username" placeholder="请输入用户名" />
        </label>

        <label class="field">
          <span>密码</span>
          <input
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            placeholder="请输入密码"
          />
        </label>

        <div class="actions">
          <button type="submit" :disabled="loading">
            {{ loading ? '登录中...' : '立即登录' }}
          </button>
        </div>

        <p class="hint">演示账号：`admin` / `Admin@123`</p>
        <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>
      </form>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/login.less';
</style>
