import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'
import { registerPermissionDirective } from './directives/permission'

async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)
  registerPermissionDirective(app)

  const userStore = useUserStore(pinia)
  await userStore.initializeAuth()

  app.use(router)
  app.mount('#app')
}

bootstrap()
