# 当前用户与权限相关接口草稿

## 文档目的
这份文档用于沉淀“当前用户是谁、拥有哪些角色与权限”的接口约定与链路说明，确保前端、网关、认证中心在用户上下文获取上保持一致，并为后续 RBAC/权限点扩展预留空间。

## 适用范围
- 前端登录后需要展示用户信息、菜单权限与按钮权限
- 刷新页面后需要恢复用户上下文
- 网关需要统一鉴权并透传用户上下文
- 下游服务需要读取用户上下文但不重复解 token

## 核心原则
- 前端只负责携带 token，不负责拼装用户头
- 网关完成 token 校验，并从 JWT 中解析出用户上下文
- 用户上下文通过请求头透传给下游服务
- “当前用户”接口统一归属 `auth-center` 业务域：`/api/auth/**`

## 接口清单

### 1. 登录
- 路径：`POST /api/auth/login`
- 说明：校验账号密码并签发 JWT
- 是否公开：是（网关放行）

请求体示例：
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

响应数据建议字段（`data`）：
- `token`: JWT
- `username`: 登录账号
- `displayName`: 展示名
- `roles`: 角色数组
- `permissions`: 权限点数组

对应实现：
- [AuthController](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/auth-center/src/main/java/com/myblog/auth/controller/AuthController.java)
- [AuthService](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/auth-center/src/main/java/com/myblog/auth/service/AuthService.java)
- [LoginResponse](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/auth-center/src/main/java/com/myblog/auth/dto/LoginResponse.java)

### 2. 当前用户
- 路径：`GET /api/auth/me`
- 说明：返回当前登录用户信息（用户名、展示名、角色、权限），用于前端恢复与展示
- 是否公开：否（必须携带 token）

响应数据字段（`data`）：
- `username`
- `displayName`
- `roles`
- `permissions`
- `authChecked`: 是否已在网关完成鉴权（当前实现会由网关写入头）

对应实现：
- [AuthController](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/auth-center/src/main/java/com/myblog/auth/controller/AuthController.java)
- [CurrentUserResponse](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/auth-center/src/main/java/com/myblog/auth/dto/CurrentUserResponse.java)

## JWT Claims 约定（当前实现）
登录成功后签发的 JWT 中包含：
- `sub`: username
- `roles`: 角色列表
- `permissions`: 权限点列表

JWT 工具：
- [JwtUtils](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/common/src/main/java/com/myblog/common/util/JwtUtils.java)

## 网关透传头约定
网关在鉴权通过后，会向下游请求注入：
- `X-Auth-Checked`: `true`
- `X-User-Name`: 用户名
- `X-User-Roles`: 角色（逗号分隔）
- `X-User-Permissions`: 权限点（逗号分隔）

网关实现：
- [AuthGlobalFilter](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/gateway/src/main/java/com/myblog/gateway/AuthGlobalFilter.java)

## 公开接口放行约定（重要）
为了避免把认证域下的所有接口误放行：
- 当前建议只放行：`/api/auth/login`
- `GET /api/auth/me` 不允许放行，需要鉴权后才可访问

## 前端接入约定
- 登录接口：前端调用 `/api/auth/login`，保存 token
- 当前用户：前端调用 `/api/auth/me`，用返回值更新 Pinia 与本地缓存

前端相关实现：
- [auth.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/api/auth.ts)
- [user.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/stores/user.ts)
- [auth-storage.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/utils/auth-storage.ts)
- [http.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/api/http.ts)

## 下游服务的读取方式（示例）
下游服务如果需要用户上下文，优先读取网关透传头：
- `X-User-Name`
- `X-User-Roles`
- `X-User-Permissions`

示例实现（仅示例业务，不作为“当前用户接口”的归属地）：
- [BlogController](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/blog-service/src/main/java/com/myblog/blog/controller/BlogController.java)

## 常见问题

### 1. 有 token 但 `/api/auth/me` 返回 401
优先检查：
- 网关是否正确读取 `Authorization: Bearer <token>`
- JWT 密钥是否与签发一致
- 网关放行规则是否误配置

### 2. 前端刷新后用户信息不更新
优先检查：
- `initializeAuth()` 是否执行
- `refreshCurrentUser()` 是否调用 `/api/auth/me`
- 本地缓存是否被 401 拦截逻辑清理

## 后续可继续补充
- 权限点命名规范（例如 `domain:action`）
- 刷新 token/续期策略
- 权限点与菜单/按钮的映射策略
