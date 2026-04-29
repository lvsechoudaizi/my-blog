import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'
import { useThemeStore } from './stores/theme'
import { registerPermissionDirective } from './directives/permission'

async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)
  registerPermissionDirective(app)

  const userStore = useUserStore(pinia)
  await userStore.initializeAuth()

  // 初始化主题
  const themeStore = useThemeStore(pinia)
  themeStore.initializeTheme()

  app.use(router)
  app.mount('#app')
}

bootstrap()
