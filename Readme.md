# My Blog 个人博客系统

一个基于微服务架构的现代化个人博客系统，采用前后端分离设计，支持用户管理、博客文章发布、权限控制等功能。

## 📋 项目简介

My Blog是一个功能完整的个人博客系统，旨在提供简洁美观的博客展示和管理界面，同时采用现代化的技术栈保证系统的可扩展性和可维护性。

## 🛠️ 技术栈

### 后端技术
- **框架**: Spring Boot 3.2.5
- **微服务**: Spring Cloud Alibaba 2023.0.1.0
- **注册中心/配置中心**: Nacos
- **API网关**: Spring Cloud Gateway
- **安全认证**: Spring Security + JWT
- **数据库**: MySQL
- **缓存**: Redis
- **构建工具**: Maven

### 前端技术
- **框架**: Vue 3
- **语言**: TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **UI组件**: 自定义组件（基于Less）
- **HTTP客户端**: Axios

### 基础设施
- **容器化**: Docker
- **编排工具**: Docker Compose

## 📁 项目结构

```
my-blog/
├── backend/                  # 后端微服务
│   ├── common/              # 公共模块（工具类、实体、异常等）
│   ├── gateway/             # API网关（路由、认证过滤）
│   └── services/            # 业务服务
│       ├── auth-center/     # 认证中心（用户、角色、权限管理）
│       └── blog-service/    # 博客服务（文章、分类、标签管理）
├── frontend/                # 前端应用
│   ├── public/              # 静态资源
│   ├── src/                 # 源代码
│   │   ├── api/             # API接口定义
│   │   ├── components/      # Vue组件
│   │   ├── layouts/         # 布局组件
│   │   ├── router/          # 路由配置
│   │   ├── stores/          # Pinia状态管理
│   │   ├── styles/          # 样式文件
│   │   ├── utils/           # 工具函数
│   │   └── views/           # 页面组件
│   └── vite.config.ts       # Vite配置
├── docker/                  # Docker配置
│   └── mysql/               # MySQL初始化脚本
├── docs/                    # 项目文档
├── docker-compose.yml       # Docker Compose配置
└── .gitignore               # Git忽略配置
```

## 🚀 快速开始

### 环境要求
- Docker Desktop
- JDK 17+
- Maven 3.6+
- Node.js 16+
- npm 8+

### 本地开发

#### 1. 启动基础设施
```bash
# 启动MySQL、Redis、Nacos
cd my-blog
docker compose up -d
```

#### 2. 编译后端服务
```bash
cd backend
mvn clean install -DskipTests
```

#### 3. 启动后端服务（按顺序）
```bash
# 启动认证中心
cd services/auth-center
mvn spring-boot:run

# 启动博客服务
cd ../blog-service
mvn spring-boot:run

# 启动API网关
cd ../../gateway
mvn spring-boot:run
```

#### 4. 启动前端服务
```bash
cd frontend
npm install
npm run dev
```

#### 5. 访问应用
- 前端应用: http://localhost:5173
- Nacos控制台: http://localhost:8848/nacos

### 构建部署

#### 后端构建
```bash
cd backend
mvn clean package -DskipTests
```

#### 前端构建
```bash
cd frontend
npm run build
```

## 📦 功能模块

### 认证中心 (auth-center)
- 用户注册与登录
- JWT令牌生成与验证
- 角色与权限管理
- 当前用户信息获取

### 博客服务 (blog-service)
- 文章管理（增删改查）
- 分类与标签管理
- 文章搜索与分页
- 评论管理

### 前端应用 (frontend)
- 用户登录与登出
- 文章列表与详情展示
- 后台管理界面
- 响应式设计

## 🔧 配置说明

### 后端配置
各服务的配置文件位于 `src/main/resources/bootstrap.yml`，主要配置：
- Nacos服务地址
- 服务端口
- 数据源配置
- JWT密钥

### 前端配置
前端配置位于 `vite.config.ts`，主要配置：
- API代理
- 构建选项

## 📚 开发文档

详细的开发文档位于 `docs/` 目录：
- `api-conventions.md`: API设计规范
- `auth-flow.md`: 认证流程说明
- `backend-service-guide.md`: 后端开发指南
- `frontend-architecture.md`: 前端架构说明
- `local-dev-runbook.md`: 本地开发手册

## 🤝 贡献指南

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：
- GitHub Issues: [项目Issues页面](https://github.com/你的用户名/my-blog/issues)

---

**© 2026 My Blog. All rights reserved.**