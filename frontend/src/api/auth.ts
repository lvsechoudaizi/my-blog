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
  refreshToken: string
  expiresIn: number
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

export interface RefreshTokenRequest {
  refreshToken: string
}

export function refreshToken(data: RefreshTokenRequest): Promise<LoginResponse> {
  return request<LoginResponse>({
    url: '/auth/refresh',
    method: 'post',
    data,
  })
}

export interface LogoutRequest {
  refreshToken: string
}

export function logout(data: LogoutRequest): Promise<void> {
  return request<void>({
    url: '/auth/logout',
    method: 'post',
    data,
  })
}
