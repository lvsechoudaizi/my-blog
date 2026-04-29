# 项目结构草稿

## 文档目的
这份文档用于说明当前 `my-blog` 工程的目录组织方式，以及每个模块在全链路中的职责边界。它是草稿版，重点记录已经在项目中验证过的结构，而不是追求一次写全。

## 根目录结构
- `frontend`: Vue3 + Vite + TypeScript 前端管理台
- `backend`: Spring Cloud Alibaba 微服务父工程
- `docker`: 本地基础设施相关脚本和初始化文件
- `docker-compose.yml`: MySQL、Redis、Nacos 本地运行编排
- `docs`: 项目规范、结构说明和沉淀文档
- `.trae/skills`: 面向 AI 的可复用能力说明

## 后端结构

### `backend/common`
公共依赖与共享能力模块，适合放置：
- 统一响应结构
- 公共异常
- JWT 工具
- 通用常量或公共 DTO

原则：
- 能被多个服务复用的内容优先放这里
- 不要把具体业务逻辑写进 `common`

### `backend/services/auth-center`
认证中心，负责：
- 登录接口
- 账号密码校验
- JWT 签发
- 用户与角色信息返回

原则：
- 所有认证入口尽量收敛到这里
- 与权限模型相关的能力优先沉淀在这里，而不是散落到每个服务里

### `backend/services/blog-service`
博客业务服务，当前作为示例业务模块，负责：
- 博客与项目管理相关接口
- 演示如何从请求头读取网关透传的用户信息

原则：
- 业务服务不重复实现网关级鉴权逻辑
- 如果需要用户上下文，优先读取网关透传头

### `backend/gateway`
统一网关，负责：
- 路由转发
- JWT 校验
- 用户信息透传到下游服务

原则：
- 通用鉴权优先在网关完成
- 网关负责拦截无效 token，减少下游重复校验成本

## 前端结构

### `frontend/src/api`
放置接口请求封装和 Axios 配置。

### `frontend/src/router`
放置前端路由配置、登录拦截和页面跳转规则。

### `frontend/src/stores`
放置 Pinia 状态管理，例如用户登录态、用户资料和刷新逻辑。

### `frontend/src/layouts`
放置布局组件，例如后台壳层、侧边栏、顶部栏。

### `frontend/src/views`
放置页面级组件，例如登录页、首页、404 页。

### `frontend/src/styles`
放置全局样式规范，统一使用 Less 进行开发。

## 基础设施结构

### `docker/mysql/init`
存放数据库初始化 SQL，用于本地容器第一次启动时建库。

### `docker-compose.yml`
负责启动：
- MySQL
- Redis
- Nacos

原则：
- 使用命名卷保存数据
- 修改端口和环境变量后需要重建容器
- 本地联调前先确认基础设施可访问

## 当前推荐开发顺序
1. 启动 Docker 基础设施
2. 检查 Nacos 是否可用
3. 启动 `auth-center`
4. 启动 `blog-service`
5. 启动 `gateway`
6. 启动前端并进行联调

## 后续可继续沉淀的内容
- 模块依赖图
- 接口分层约定
- DTO、VO、Entity 命名约定
- 配置文件拆分约定
- 本地启动顺序和排障清单
