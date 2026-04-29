import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUser, login, type LoginRequest } from '../api/auth'
import {
  clearPersistedUserProfile,
  getPersistedUserProfile,
  setPersistedUserProfile,
  type PersistedUserProfile,
} from '../utils/auth-storage'
import { clearToken, getToken, setToken } from '../utils/token'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const profile = ref<PersistedUserProfile | null>(getPersistedUserProfile())
  const initialized = ref(false)
  const loading = ref(false)
  const refreshing = ref(false)

  const isLoggedIn = computed(() => Boolean(token.value))
  const username = computed(() => profile.value?.username ?? '')
  const displayName = computed(() => profile.value?.displayName ?? '')
  const roles = computed(() => profile.value?.roles ?? [])
  const permissions = computed(() => profile.value?.permissions ?? [])

  function applyProfile(nextProfile: PersistedUserProfile | null) {
    profile.value = nextProfile

    if (nextProfile) {
      setPersistedUserProfile(nextProfile)
      return
    }

    clearPersistedUserProfile()
  }

  function logout() {
    clearToken()
    token.value = ''
    applyProfile(null)
  }

  async function refreshCurrentUser() {
    if (!token.value) {
      applyProfile(null)
      return null
    }

    refreshing.value = true

    try {
      const currentUser = await getCurrentUser()
      const nextProfile = {
        username: currentUser.username,
        displayName: currentUser.displayName,
        roles: currentUser.roles,
        permissions: currentUser.permissions,
        authChecked: currentUser.authChecked,
      }

      applyProfile(nextProfile)
      return nextProfile
    } catch (error) {
      if (error instanceof Error && /401|unauthorized|invalid/i.test(error.message)) {
        logout()
      }

      throw error
    } finally {
      refreshing.value = false
    }
  }

  async function loginUser(payload: LoginRequest) {
    loading.value = true

    try {
      const result = await login(payload)
      setToken(result.token)
      token.value = result.token

      applyProfile({
        username: result.username,
        displayName: result.displayName,
        roles: result.roles,
        permissions: result.permissions,
        authChecked: true,
      })

      await refreshCurrentUser()
      return result
    } catch (error) {
      logout()
      throw error
    } finally {
      loading.value = false
    }
  }

  async function initializeAuth() {
    token.value = getToken()
    profile.value = getPersistedUserProfile()

    if (!token.value) {
      initialized.value = true
      return
    }

    try {
      await refreshCurrentUser()
    } catch {
      // Keep cached user info when refresh fails due to network issues.
    } finally {
      initialized.value = true
    }
  }

  return {
    token,
    profile,
    initialized,
    loading,
    refreshing,
    isLoggedIn,
    username,
    displayName,
    roles,
    permissions,
    loginUser,
    refreshCurrentUser,
    initializeAuth,
    logout,
  }
})
