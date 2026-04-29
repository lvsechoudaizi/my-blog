import { computed, ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { 
  getPersistedTheme, 
  setPersistedTheme, 
  getSystemTheme,
  type Theme 
} from '../utils/theme-storage'

export const useThemeStore = defineStore('theme', () => {
  // 主题状态
  const theme = ref<Theme>('dark')

  // 计算属性：是否为深色模式
  const isDarkMode = computed(() => theme.value === 'dark')

  // 设置主题
  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    // 保存到本地存储
    setPersistedTheme(newTheme)
    // 更新文档的data-theme属性
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // 切换主题
  function toggleTheme() {
    const newTheme: Theme = theme.value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // 初始化主题
  function initializeTheme() {
    // 优先从本地存储获取主题
    const savedTheme = getPersistedTheme()
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // 否则使用系统主题
      const systemTheme = getSystemTheme()
      setTheme(systemTheme)
    }
  }

  // 监听系统主题变化
  function setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有当用户没有明确设置主题时，才跟随系统变化
      if (!getPersistedTheme()) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    // 添加事件监听器
    mediaQuery.addEventListener('change', handleChange)
    
    // 组件卸载时移除监听器
    // return () => mediaQuery.removeEventListener('change', handleChange)
  }

  // 组件挂载时初始化
  onMounted(() => {
    initializeTheme()
    setupSystemThemeListener()
  })

  return {
    theme,
    isDarkMode,
    setTheme,
    toggleTheme,
    initializeTheme
  }
})