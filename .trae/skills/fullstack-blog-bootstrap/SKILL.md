---
name: "fullstack-blog-bootstrap"
description: "Bootstraps and extends a Vue3 + Spring Cloud Alibaba blog admin scaffold. Invoke when initializing similar full-stack projects or continuing this workspace."
---

# Fullstack Blog Bootstrap

## Purpose
用于初始化、扩展和维护一个基于 Vue3 + Vite + TypeScript 前端、Spring Cloud Alibaba 微服务后端的博客后台工程, 默认启用热加载，同时提供本地 Docker Compose 基础设施。

## When To Use
- 用户要从零搭建类似的全栈脚手架
- 用户要继续扩展当前 `my-blog` 项目
- 用户要补充登录、鉴权、网关、服务注册、前端路由、状态管理、Less 规范
- 用户要排查本地联调链路中的环境、容器、注册中心或样式结构问题

## Current Stack
- Frontend: Vue3, Vite, TypeScript, Vue Router, Pinia, Axios, Less
- Backend: Spring Boot, Spring Cloud Alibaba, Spring Security, JWT, Maven
- Infra: Docker Compose, MySQL 8, Redis 7, Nacos 2.x

## Project Layout
- `frontend`: 前端工程
- `backend/common`: 公共依赖、统一响应、异常、JWT 工具
- `backend/services/auth-center`: 认证与令牌签发
- `backend/services/blog-service`: 博客与项目管理业务服务
- `backend/gateway`: 统一网关与 JWT 校验
- `docker-compose.yml`: 本地基础设施
- `docs`: 人类可读规范文档

## Standard Workflow
1. 检查基础目录结构与技术栈是否符合当前工程约定
2. 初始化或扩展 Docker Compose，确保 MySQL、Redis、Nacos 可用
3. 配置后端父工程与子模块依赖
4. 为每个微服务补齐 `application.yml` 和 `bootstrap.yml`
5. 配置 `gateway` 路由和全局 JWT 鉴权过滤器
6. 实现 `auth-center` 登录、用户信息与令牌签发
7. 实现 `blog-service` 示例接口并演示下游如何读取用户头信息
8. 初始化前端路由、登录页、Pinia、Axios 拦截器
9. 在前端统一接入 `src/styles` 目录化 Less 方案
10. 进行构建验证、诊断检查和联调

## Frontend Style Rules
- 样式入口统一为 `frontend/src/styles/index.less`
- 变量放在 `variables.less`
- 主题令牌放在 `theme.less`
- 公共 mixin 放在 `mixins.less`
- 页面级样式放在 `styles/pages`
- 布局级样式放在 `styles/layouts`
- 页面组件内部通过 `style scoped lang="less"` 按需引入页面样式

## Backend Rules
- 公共能力优先沉淀到 `common`
- 认证逻辑集中在 `auth-center`
- 统一鉴权和转发逻辑放在 `gateway`
- 下游业务服务通过请求头接收网关透传的用户信息
- 服务注册和配置优先走 Nacos

## Infra Rules
- 本地开发使用 Docker Compose
- 数据卷必须使用命名卷，避免数据库数据意外丢失
- 不要随意执行 `docker compose down -v`
- 启动微服务前先确认 Nacos `8848` 可访问

## Common Pitfalls
- JDK 版本错误导致 Maven 编译失败
- Nacos 容器运行但宿主机端口没有正确映射
- 修改 `docker-compose.yml` 后没有重建容器
- 前端样式全部堆到单文件导致维护困难
- 登录态只存 token，不刷新用户信息导致页面状态不一致

## Verification Checklist
- `docker compose up -d` 正常
- `http://localhost:8848/nacos` 可访问
- 后端模块可以单独启动
- 前端 `npm run build` 通过
- 登录后可以通过网关拿到用户信息

## Output Expectation
在处理类似任务时，优先输出：
- 当前状态判断
- 最小可执行改动
- 涉及文件与原因
- 构建或运行验证结果
- 下一步建议
