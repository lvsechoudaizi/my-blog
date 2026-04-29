import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { clearPersistedUserProfile } from '../utils/auth-storage'
import { clearToken, getToken } from '../utils/token'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

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

    if (status === 401) {
      clearToken()
      clearPersistedUserProfile()
    }

    return Promise.reject(new Error(message))
  },
)

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await http.request<ApiResponse<T>>(config)
  return response.data.data
}
