# 本地开发启动手册草稿

## 文档目的
这份文档用于说明当前 `my-blog` 项目在本地的推荐启动顺序、基础检查项和联调步骤，目标是让环境问题尽量在启动前被发现，而不是等到服务报错后再回头排查。

## 启动前准备

### 必备环境
- Docker Desktop
- JDK 17
- Maven
- Node.js 和 npm

### 启动前检查
- 确认 Docker Desktop 已启动
- 确认 `java -version` 指向 JDK 17
- 确认 `mvn -v` 输出中的 Java 版本正确
- 确认 `node -v` 和 `npm -v` 可用

## 基础设施启动

### 第一步：进入项目根目录
```bash
cd /Users/lijianhua/Documents/其他/个人官网/my-blog
```

### 第二步：启动基础设施
```bash
docker compose up -d
```

### 第三步：检查容器状态
```bash
docker ps
```

当前重点关注：
- MySQL
- Redis
- Nacos

### 第四步：确认 Nacos 可访问
浏览器打开：

```text
http://localhost:8848/nacos
```

如果无法访问：
- 先不要启动后端服务
- 优先排查容器状态、端口映射和 Nacos 日志

## 后端启动顺序

### 启动之前确保依赖最新
- 先执行 `mvn clean install -DskipTests` 确保所有依赖都已下载到本地仓库
- - clean ：清理目标目录（target/），删除之前构建生成的所有文件（如编译后的类文件、JAR包、配置文件等）
- install ：编译项目源码，运行资源处理，将生成的工件（JAR/WAR）安装到本地 Maven 仓库
- -DskipTests ：跳过单元测试和集成测试，加快构建速度
- 确保依赖最新
- 避免旧文件干扰 
- 解决依赖冲突
- 
### 推荐顺序
1. `auth-center`
2. `blog-service`
3. `gateway`

这样做的原因：
- 认证服务和业务服务先注册到 Nacos
- 网关最后启动时更容易验证路由与联调链路

### 启动 `auth-center`
```bash
cd /Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/auth-center
mvn spring-boot:run
```

### 启动 `blog-service`
```bash
cd /Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/blog-service
mvn spring-boot:run
```

### 启动 `gateway`
```bash
cd /Users/lijianhua/Documents/其他/个人官网/my-blog/backend/gateway
mvn spring-boot:run
```

## 前端启动

### 安装依赖
```bash
cd /Users/lijianhua/Documents/其他/个人官网/my-blog/frontend
npm install
```

### 启动开发服务
```bash
npm run dev
```

### 构建验证
```bash
npm run build
```

## 联调顺序
1. 先确认 Nacos 正常
2. 再确认后端三个服务都已启动
3. 再启动前端
4. 打开登录页
5. 调用登录接口获取 token
6. 访问首页并验证用户信息是否刷新成功

## 登录联调检查点
- 登录请求是否走网关
- `auth-center` 是否返回 JWT
- 前端是否存储 token
- 前端是否刷新当前用户信息
- `gateway` 是否透传 `X-User-Name` 和 `X-User-Roles`
- `blog-service` 是否能读取用户头信息

## 常用命令备忘

### 查看容器
```bash
docker ps
```

### 重建基础设施
```bash
docker compose down
docker compose up -d
```

注意：
- 不要随意使用 `docker compose down -v`
- `-v` 会删除卷数据

### 查看 Nacos 端口映射
```bash
docker port blog-nacos
```

### 检查 Nacos 页面
```bash
curl http://localhost:8848/nacos
```

## 当前推荐习惯
- 每次启动后端前，先确认 Nacos
- 每次改 `docker-compose.yml` 后，重建相关容器
- 每次改前端样式结构后，跑一次 `npm run build`
- 每次改网关或鉴权链路后，至少做一次登录联调

## 后续可继续补充
- 各服务端口说明
- 环境变量清单
- 多终端启动建议
- 常见日志关键字速查
