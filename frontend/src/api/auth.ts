import { request } from './http'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
  displayName: string
  roles: string[]
  permissions: string[]
}

export interface CurrentUserResponse {
  username: string
  displayName: string
  roles: string[]
  permissions: string[]
  authChecked: boolean
}

export function login(data: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function getCurrentUser(): Promise<CurrentUserResponse> {
  return request<CurrentUserResponse>({
    url: '/auth/me',
    method: 'get',
  })
}
