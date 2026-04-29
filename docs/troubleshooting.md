# 常见问题排查草稿

## 文档目的
这份文档用于记录当前项目在本地开发过程中已经遇到过或高概率会遇到的问题，并给出优先级较高的排查路径，帮助尽快定位是环境问题、容器问题、配置问题还是代码问题。

## 排查原则
- 先看基础设施，再看服务配置，最后看业务代码
- 先确认依赖服务是否可用，再看应用日志
- 先验证最短链路，再扩大排查范围

## 一类问题：JDK 或 Maven 编译失败

### 常见现象
- `mvn spring-boot:run` 失败
- 编译时出现 `--release` 相关错误
- Maven 显示的 Java 版本不符合预期

### 优先排查
1. 执行 `java -version`
2. 执行 `mvn -v`
3. 检查 `JAVA_HOME`
4. 确认当前终端会话是否真的切换到 JDK 17

### 处理建议
- 优先统一使用 JDK 17
- 每次开新终端后重新确认环境变量

## 二类问题：Nacos 连接失败

### 常见现象
- 应用启动时报 `Client not connected`
- 浏览器打不开 `http://localhost:8848/nacos`
- 容器显示在运行，但服务无法注册

### 优先排查
1. 执行 `docker ps`
2. 检查 `blog-nacos` 是否在运行
3. 执行 `docker port blog-nacos`
4. 执行 `curl http://localhost:8848/nacos`
5. 查看 Nacos 容器日志

### 高概率原因
- 端口没有正确映射到宿主机
- 修改过 `docker-compose.yml` 但容器没有重建
- Nacos 容器虽然启动但内部服务未就绪

### 处理建议
```bash
docker compose down
docker compose up -d
```

注意：
- 一般不要加 `-v`
- 避免误删卷数据

## 三类问题：数据库数据丢失

### 常见现象
- 之前建的库和表不见了
- 容器重启后数据重新初始化

### 优先排查
1. 检查 `docker-compose.yml` 是否使用命名卷
2. 检查是否执行过 `docker compose down -v`
3. 检查当前连接的是不是新的容器实例

### 处理建议
- MySQL 必须使用命名卷
- 谨慎操作容器和卷

## 四类问题：登录失败

### 常见现象
- 前端登录页提示登录失败
- 网关返回 401 或 403
- `auth-center` 没有返回 token

### 优先排查
1. 检查前端请求地址是否走网关
2. 检查 `gateway` 是否启动
3. 检查 `auth-center` 是否启动
4. 查看登录接口请求和响应
5. 查看后端日志是否有鉴权或参数错误

## 五类问题：登录成功但首页数据异常

### 常见现象
- 已登录但首页显示未登录
- 用户名和角色不显示
- 下游服务拿不到用户头

### 优先排查
1. 检查前端是否保存 token
2. 检查 Pinia 是否刷新用户信息
3. 检查 Axios 是否带上 token
4. 检查 `gateway` 是否透传 `X-User-Name` 和 `X-User-Roles`
5. 检查下游服务是否正确读取请求头

## 六类问题：前端样式异常

### 常见现象
- 样式没有生效
- 页面样式互相污染
- Less 改了但编译结果不对

### 优先排查
1. 检查入口是否为 `src/styles/index.less`
2. 检查页面组件是否正确引入对应的 `less`
3. 检查是否使用了 `lang="less"`
4. 检查是否是 `scoped` 作用域导致选择器未命中
5. 执行 `npm run build`

## 快速定位顺序建议
1. 看 Docker
2. 看 Nacos
3. 看后端服务是否启动
4. 看网关是否可转发
5. 看前端请求是否正确
6. 再看具体代码逻辑

## 常用检查命令

```bash
docker ps
docker port blog-nacos
curl http://localhost:8848/nacos
java -version
mvn -v
npm run build
```

## 后续可继续沉淀
- 日志关键字速查表
- 每个服务的典型错误示例
- 网络端口冲突排查
- 浏览器端请求失败排查清单
