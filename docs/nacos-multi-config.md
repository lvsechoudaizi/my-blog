# Nacos 多文件配置方案

## 一、配置文件拆分设计

### 1. 共享配置文件（所有服务共用）
**文件名**: `common.yml`
**作用**: 存储所有服务共享的基础配置

```yaml
# 全局Spring配置
spring:
  profiles:
    active: dev
  # Redis配置（所有服务共用）
  redis:
    host: 127.0.0.1
    port: 6379
    database: 0
    lettuce:
      pool:
        max-active: 8
        max-wait: -1ms
        max-idle: 8
        min-idle: 0
```

### 2. 网关服务配置
**文件名**: `gateway.yml`
**作用**: 存储网关服务专用配置

```yaml
server:
  port: 8080

spring:
  cloud:
    gateway:
      routes:
        - id: auth-center
          uri: http://localhost:8081
          predicates:
            - Path=/api/auth/**
        - id: blog-service
          uri: http://localhost:8082
          predicates:
            - Path=/api/blog/**

# JWT配置（网关验证使用）
app:
  jwt:
    secret: my-blog-demo-jwt-secret-key-2026-keep-safe
    token-header: Authorization
    token-prefix: Bearer
```

### 3. 认证中心配置
**文件名**: `auth-center.yml`
**作用**: 存储认证中心专用配置

```yaml
server:
  port: 8081

# MySQL配置（用户数据存储）
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/blog_auth?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

# MyBatis-Plus配置
mybatis-plus:
  mapper-locations: classpath*:mapper/**/*.xml
  type-aliases-package: com.myblog.auth.entity
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl

# JWT配置
app:
  jwt:
    secret: my-blog-demo-jwt-secret-key-2026-keep-safe
    expiration-seconds: 7200
    token-header: Authorization
    token-prefix: Bearer

# Redis令牌配置
auth:
  token:
    redis-key-prefix: "auth:token:"
    blacklist-key-prefix: "auth:blacklist:"
```

### 4. 博客服务配置
**文件名**: `blog-service.yml`
**作用**: 存储博客服务专用配置

```yaml
server:
  port: 8082

# 博客服务特定配置（可根据需要扩展）
blog:
  post:
    page-size: 10
  comment:
    enabled: true
```

## 二、各服务 bootstrap.yml 配置

### 1. Gateway 服务
```yaml
spring:
  application:
    name: gateway
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        namespace: my-blog
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yml
        namespace: my-blog
        # 加载共享配置
        shared-configs:
          - data-id: common.yml
            refresh: true
        # 加载网关专用配置
        extension-configs:
          - data-id: gateway.yml
            group: DEFAULT_GROUP
            refresh: true
```

### 2. Auth-Center 服务
```yaml
spring:
  application:
    name: auth-center
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        namespace: my-blog
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml
        namespace: my-blog
        # 加载共享配置
        shared-configs:
          - data-id: common.yml
            refresh: true
        # 加载认证中心专用配置
        extension-configs:
          - data-id: auth-center.yml
            group: DEFAULT_GROUP
            refresh: true
```

### 3. Blog-Service 服务
```yaml
spring:
  application:
    name: blog-service
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        namespace: my-blog
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yml
        namespace: my-blog
        # 加载共享配置
        shared-configs:
          - data-id: common.yml
            refresh: true
        # 加载博客服务专用配置
        extension-configs:
          - data-id: blog-service.yml
            group: DEFAULT_GROUP
            refresh: true
```

## 三、Nacos 配置操作步骤

### 1. 登录 Nacos 控制台
访问：`http://127.0.0.1:8848/nacos`

### 2. 切换到命名空间
在顶部导航栏选择命名空间：`my-blog`

### 3. 创建配置文件
依次创建以下配置文件：
1. **common.yml** - 共享配置
2. **gateway.yml** - 网关配置
3. **auth-center.yml** - 认证中心配置
4. **blog-service.yml** - 博客服务配置

### 4. 配置内容粘贴
将上述各配置文件的内容分别粘贴到对应的配置项中，确保：
- Data ID 与文件名一致
- Group 保持默认的 `DEFAULT_GROUP`
- 文件类型选择 `YAML`

## 四、迁移注意事项

1. **配置优先级**
   - 扩展配置（extension-configs）优先级高于共享配置（shared-configs）
   - 相同配置项，服务专用配置会覆盖共享配置

2. **配置验证**
   - 服务启动后，检查日志确认配置是否正确加载
   - 可通过 `/actuator/configprops` 端点查看实际生效的配置

3. **敏感信息处理**
   - 生产环境中，数据库密码等敏感信息建议使用 Nacos 加密功能
   - 或通过环境变量注入敏感配置

4. **版本管理**
   - 启用 Nacos 配置的版本历史功能
   - 重要配置变更前进行版本备份

5. **本地配置清理**
   - 配置迁移完成后，建议删除或注释本地 application.yml 中的重复配置
   - 保留本地配置仅用于开发环境的临时调试

## 五、优势总结

1. **职责清晰**：每个服务配置独立管理，便于维护
2. **易于扩展**：新服务可快速创建专属配置文件
3. **安全隔离**：服务间配置相互独立，避免误操作影响其他服务
4. **版本控制**：可针对单个服务配置进行版本管理
5. **权限管理**：可通过 Nacos 权限控制实现配置的细粒度访问控制

这种多文件配置方案既保持了配置的集中管理，又实现了服务间的配置隔离，是企业级微服务应用的最佳实践。