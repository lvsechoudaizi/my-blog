export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'my-blog-theme'

/**
 * 获取本地存储的主题，如果没有则返回null
 */
export function getPersistedTheme(): Theme | null {
  const raw = localStorage.getItem(THEME_STORAGE_KEY)
  
  if (!raw) {
    return null
  }
  
  try {
    const theme = JSON.parse(raw) as Theme
    return isThemeValid(theme) ? theme : null
  } catch {
    localStorage.removeItem(THEME_STORAGE_KEY)
    return null
  }
}

/**
 * 保存主题到本地存储
 */
export function setPersistedTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
}

/**
 * 清除本地存储的主题
 */
export function clearPersistedTheme(): void {
  localStorage.removeItem(THEME_STORAGE_KEY)
}

/**
 * 验证主题是否有效
 */
function isThemeValid(theme: string): theme is Theme {
  return theme === 'light' || theme === 'dark'
}

/**
 * 获取系统默认主题
 */
export function getSystemTheme(): Theme {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}