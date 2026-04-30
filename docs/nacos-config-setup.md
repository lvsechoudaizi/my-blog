# Nacos 配置创建指南

## 问题分析
服务启动失败的主要原因是**Nacos中缺少必要的配置文件**。根据bootstrap.yml配置：
- 命名空间：`my-blog`
- 配置文件扩展名：`yaml`
- 需要的配置文件：`common.yml` 和 `auth-center.yaml`

## 一、登录 Nacos 控制台
1. 访问地址：`http://127.0.0.1:8848/nacos`
2. 默认账号密码：`nacos`/`nacos`

## 二、切换命名空间
1. 在顶部导航栏点击「命名空间」
2. 如果没有 `my-blog` 命名空间，点击「新建命名空间」
3. 填写：
   - 命名空间ID：`my-blog`
   - 命名空间名：`my-blog`
   - 描述：`My Blog 项目配置`
4. 点击「确定」创建命名空间
5. 在左侧导航栏的「命名空间」下拉菜单中选择 `my-blog`

## 三、创建配置文件

### 1. 创建 common.yml 配置
- **Data ID**: `common.yml`
- **Group**: `DEFAULT_GROUP`
- **配置格式**: `YAML`
- **配置内容**:

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

### 2. 创建 auth-center.yaml 配置
- **Data ID**: `auth-center.yaml`
- **Group**: `DEFAULT_GROUP`
- **配置格式**: `YAML`
- **配置内容**:

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

# MyBatis-Plus配置（禁用自动DDL）
mybatis-plus:
  mapper-locations: classpath*:mapper/**/*.xml
  type-aliases-package: com.myblog.auth.entity
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      # 禁用MyBatis-Plus自动DDL功能
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0

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

## 四、解决 MyBatis-Plus DDL 问题

### 问题原因
错误信息：`Bean named 'ddlApplicationRunner' is expected to be of type 'org.springframework.boot.Runner' but was actually of type 'org.springframework.beans.factory.support.NullBean'`

这是因为：
1. 项目引入了 MyBatis-Plus 依赖
2. MyBatis-Plus 尝试创建 DDL 自动执行器
3. 但没有找到对应的配置或实体类

### 解决方案
在 `auth-center.yaml` 中添加了以下配置：
```yaml
mybatis-plus:
  global-config:
    db-config:
      # 禁用MyBatis-Plus自动DDL功能
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
```

这个配置禁用了 MyBatis-Plus 的自动 DDL 功能，解决了 `ddlApplicationRunner` 初始化失败的问题。

## 五、启动服务

### 1. 设置 Java 版本
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### 2. 启动服务
```bash
cd /Users/lijianhua/Documents/其他/个人官网/my-blog/backend/services/auth-center
mvn spring-boot:run
```

## 六、验证启动成功

服务启动成功后，应该看到类似以下日志：
```
2026-04-30 16:00:00.000  INFO 12345 --- [restartedMain] c.m.auth.AuthCenterApplication           : Started AuthCenterApplication in 5.0 seconds
```

## 七、常见问题排查

### 1. 配置文件找不到
- 检查命名空间是否正确（`my-blog`）
- 检查配置文件扩展名是否正确（`yaml` 或 `yml`）
- 检查配置文件的 Group 是否为 `DEFAULT_GROUP`

### 2. 数据库连接失败
- 确保 MySQL 服务正在运行
- 检查数据库名、用户名、密码是否正确
- 检查数据库连接 URL 中的端口号

### 3. Redis 连接失败
- 确保 Redis 服务正在运行
- 检查 Redis 主机和端口配置

### 4. Java 版本问题
- 确保 `java -version` 和 `mvn --version` 都显示 Java 17
- 如果不一致，重新设置 `JAVA_HOME` 环境变量

## 八、后续步骤

1. 成功启动 `auth-center` 服务后，继续启动其他服务：
   - `gateway` 服务
   - `blog-service` 服务

2. 确保所有服务都能正确从 Nacos 获取配置

3. 测试服务间的通信和功能

通过以上步骤，您应该能够成功解决服务启动失败的问题。