# 后端服务规范草稿

## 文档目的
这份文档记录当前后端微服务的职责边界、基础约定和本地联调关注点，便于后续继续扩展服务时保持结构清晰。

## 当前后端技术栈
- Java 17
- Maven
- Spring Boot
- Spring Cloud Alibaba
- Spring Security
- JWT
- Nacos

## 模块职责

### `common`
职责：
- 提供公共工具和共享能力
- 减少多个服务间重复代码

适合放的内容：
- JWT 工具类
- 统一响应结构
- 公共异常
- 通用常量

不建议放的内容：
- 具体业务实现
- 某个服务专属逻辑

### `services/auth-center`
职责：
- 登录认证
- 用户身份校验
- JWT 生成
- 返回基础用户信息

建议：
- 认证相关能力统一收敛
- 后续如果加菜单、权限点、角色树，也优先在这里扩展

### `services/blog-service`
职责：
- 博客与项目管理业务
- 演示下游服务读取用户头信息

建议：
- 业务服务聚焦业务接口
- 不重复实现网关级 token 校验逻辑

### `gateway`
职责：
- 路由转发
- 全局鉴权
- 解析 JWT
- 向下游透传用户信息

建议：
- 通用鉴权逻辑优先在网关完成
- 下游服务优先信任网关透传的用户上下文

## 配置约定

### `bootstrap.yml`
作用：
- 优先加载注册中心和配置中心相关配置
- 当前主要用于连接 Nacos

### `application.yml`
作用：
- 放应用运行配置
- 例如端口、Spring 基础配置、日志、服务参数

原则：
- 注册中心相关配置优先放 `bootstrap.yml`
- 业务运行配置优先放 `application.yml`

## 鉴权链路约定
当前约定如下：
1. 前端登录，调用网关暴露的认证接口
2. `auth-center` 校验账号密码并签发 JWT
3. 前端后续请求携带 token
4. `gateway` 校验 token
5. `gateway` 从 token 中解析用户名和角色
6. `gateway` 通过请求头透传给下游服务
7. 下游服务读取用户头而不是重复解 token

## 头信息透传约定
当前已使用的头包括：
- `X-User-Name`
- `X-User-Roles`

建议：
- 用户上下文头统一由网关生成
- 下游服务不要信任前端自行传来的同名头

## 本地开发顺序
1. 启动 Docker Compose
2. 确认 MySQL、Redis、Nacos 正常
3. 打开 `http://localhost:8848/nacos`
4. 启动 `auth-center`
5. 启动 `blog-service`
6. 启动 `gateway`

## 常见问题

### JDK 版本不正确
现象：
- Maven 编译失败
- 出现 `--release` 相关错误

处理建议：
- 优先使用 JDK 17
- 启动前检查 `java -version` 和 `JAVA_HOME`

### Nacos 容器运行但服务不可用
现象：
- 应用报 `Client not connected`
- 浏览器打不开 `8848`

处理建议：
- 检查端口映射
- 检查容器日志
- 修改 compose 后重建容器

### 数据库数据丢失
现象：
- 重启容器后表和库消失

处理建议：
- 使用命名卷
- 避免执行 `docker compose down -v`

## 后续可继续沉淀
- 服务间调用约定
- DTO / VO / Entity 分层规范
- 异常码规范
- 日志规范
- 配置中心使用规范
