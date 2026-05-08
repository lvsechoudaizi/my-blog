import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { clearPersistedUserProfile } from '../utils/auth-storage'
import { clearRefreshToken, clearToken, getRefreshToken, getToken, setRefreshToken, setToken } from '../utils/token'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

let refreshPromise: Promise<string> | null = null

http.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiResponse<unknown>

    if (!payload.success) {
      return Promise.reject(new Error(payload.message || 'Request failed'))
    }

    return response
  },
  (error: AxiosError<ApiResponse<never>>) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message || 'Network error'

    const originalConfig = error.config as (AxiosRequestConfig & { _retry?: boolean; _skipAuthRefresh?: boolean })

    if (
      status === 401 &&
      originalConfig &&
      !originalConfig._retry &&
      !originalConfig._skipAuthRefresh &&
      typeof originalConfig.url === 'string' &&
      !originalConfig.url.includes('/auth/login') &&
      !originalConfig.url.includes('/auth/refresh') &&
      !originalConfig.url.includes('/auth/logout')
    ) {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        originalConfig._retry = true

        if (!refreshPromise) {
          refreshPromise = http
            .request<ApiResponse<{ token: string; refreshToken: string }>>({
              url: '/auth/refresh',
              method: 'post',
              data: { refreshToken },
              _skipAuthRefresh: true,
            } as any)
            .then((response) => {
              const result = response.data.data
              setToken(result.token)
              setRefreshToken(result.refreshToken)
              return result.token
            })
            .finally(() => {
              refreshPromise = null
            })
        }

        return refreshPromise.then((newToken) => {
          originalConfig.headers = originalConfig.headers ?? {}
          ;(originalConfig.headers as Record<string, string>).Authorization = `Bearer ${newToken}`
          return http.request(originalConfig)
        })
      }

      clearToken()
      clearRefreshToken()
      clearPersistedUserProfile()
    } else if (status === 401) {
      clearToken()
      clearRefreshToken()
      clearPersistedUserProfile()
    }

    return Promise.reject(new Error(message))
  },
)

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await http.request<ApiResponse<T>>(config)
  return response.data.data
}
