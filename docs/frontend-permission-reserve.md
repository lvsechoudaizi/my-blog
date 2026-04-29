# 基于 permissions 的前端权限控制预留草稿

## 文档目的
这份文档用于沉淀前端如何基于后端返回的 `permissions`（权限点列表）做权限控制预留，包括：
- 路由级访问控制
- 菜单与按钮级可见性控制
- 页面内逻辑的权限判断

目标是先形成“可扩展的骨架”，后续接入真实权限模型时不需要推倒重来。

## 核心原则
- 前端权限控制只用于“体验与导航控制”，不是安全边界
- 真正的安全边界必须在后端（网关/服务）完成
- 权限点应由后端下发，前端不硬编码角色到权限的映射

## 当前用户与 permissions 来源
前端通过 `GET /api/auth/me` 获取：
- `permissions: string[]`

相关文档：
- [当前用户与权限相关接口草稿](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/docs/current-user-permissions.md)

## 现有实现概览

### 1. 权限判断工具
文件：
- [permission.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/utils/permission.ts)

提供能力：
- `hasAnyPermission(userPermissions, required)`
- `hasAllPermissions(userPermissions, required)`
- `canAccess(userPermissions, requirement)`

其中 `requirement` 支持三种形式：
- 单个权限点：`'blog:write'`
- 任意满足：`['blog:read', 'blog:write']`
- 组合条件：`{ any: ['a'], all: ['b', 'c'] }`

### 2. `v-permission` 指令（按钮/菜单级）
文件：
- [permission.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/directives/permission.ts)
- 注册入口：[main.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/main.ts)

使用方式：
```vue
<button v-permission="'blog:write'">新增文章</button>
<RouterLink v-permission="'blog:read'" to="/posts">文章管理</RouterLink>
```

行为说明：
- 无权限时会把元素 `display` 设为 `none`
- 有权限时恢复显示

### 3. 路由级权限控制（访问拦截预留）
文件：
- [router/index.ts](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/router/index.ts)

约定：
- 页面路由可设置：`meta.permissions: string[]`
- 当用户不具备任意一个所需权限点时，跳转到 `/403`

示例：
- `/posts`：`permissions: ['blog:read']`
- `/settings`：`permissions: ['system:admin']`

403 页面：
- [ForbiddenView.vue](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/views/ForbiddenView.vue)

## 示例落点（当前工程）
- 菜单可见性示例：[AppLayout.vue](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/layouts/AppLayout.vue)
- 首页权限预留示例：[HomeView.vue](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/views/HomeView.vue)
- 文章管理示例页：[PostsView.vue](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/views/PostsView.vue)
- 系统设置示例页：[SettingsView.vue](file:///Users/lijianhua/Documents/其他/个人官网/my-blog/frontend/src/views/SettingsView.vue)

## 推荐使用方式（团队约定）

### 页面入口（路由级）
- 任何“明显需要权限才能进入”的页面，都应在路由上声明 `meta.permissions`
- 这样可以避免用户点进去才发现“页面里什么都没有”

### 页面内部（按钮级）
- 任何“高风险动作”，例如新增、删除、发布，都应做按钮级控制
- 使用 `v-permission` 做可见性控制
- 同时在点击逻辑中也建议二次判断（用于提示语），避免用户从其他入口触发动作

## 常见注意点

### 1. 不能把前端权限当安全
即使按钮隐藏了，用户仍然可能通过：
- 直接访问 URL
- 直接调用接口

所以后端必须做最终鉴权。

### 2. 权限数据的刷新与缓存
权限点来自 `/api/auth/me`，并通过 Pinia + localStorage 持久化。

如果出现“缓存权限已过期”的问题，建议：
- token 失效时统一清理用户信息
- 页面启动时刷新 `/api/auth/me`

## 后续扩展方向
- 增加“权限点字典”（用于把权限 code 显示成中文名）
- 增加“菜单模型”，让菜单由后端下发
- 增加“路由级等待初始化”机制：在守卫中等待用户状态初始化后再判断权限
