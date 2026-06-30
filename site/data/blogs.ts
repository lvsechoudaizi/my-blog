/**
 * 技术博客数据 - 基于简历经历生成，10 篇
 */

export type BlogSection = {
  heading: string;
  content: string[];
  code?: { lang: string; snippet: string };
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readingMinutes: number;
  views: number;
  tags: string[];
  category: string;
  excerpt: string;
  toc: string[];
  sections: BlogSection[];
};

export const posts: BlogPost[] = [
  // ── 1. Vue3 + TS + Vite 工程化 ──────────────────────────
  {
    slug: "vue3-ts-vite-engineering",
    title: "Vue3 + TypeScript + Vite 企业级工程化实战",
    date: "2026-06-15",
    readingMinutes: 15,
    views: 3680,
    tags: ["Vue3", "TypeScript", "工程化", "Vite"],
    category: "前端进阶",
    excerpt:
      "从项目初始化到规范落地，完整拆解 Vue3 + TS + Vite 在运营商级项目中的工程化配置、ESLint/Prettier/Husky 质量保障与团队协作最佳实践。",
    toc: [
      "项目初始化与目录规范",
      "TypeScript 类型体系搭建",
      "请求层统一封装",
      "代码质量保障闭环",
      "构建优化与多环境发布",
      "团队规范落地经验",
    ],
    sections: [
      {
        heading: "项目初始化与目录规范",
        content: [
          "在运营商级项目中，工程化的第一步不是写代码，而是定规范。我主导的项目统一采用以下目录结构：api/ 放接口定义、composables/ 放组合式函数、components/ 放可复用组件、views/ 放页面级组件、stores/ 放 Pinia 状态、utils/ 放工具函数、types/ 放类型定义。",
          "每个模块按业务域拆分，而不是按文件类型拆分。比如 user/ 下放 UserTable、UserForm、useUser、user.api.ts。这样做的好处是改一个功能只需要关注一个目录，CR 和重构的范围也更小。",
          "Vite 配置上，重点做了路径别名（@/ → src/）、开发代理（/api → 后端服务）、多环境打包和按需引入优化。",
        ],
        code: {
          lang: "typescript",
          snippet: `// vite.config.ts
export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  server: {
    proxy: {
      '/api': { target: env.VITE_API_BASE, changeOrigin: true,
        rewrite: (p) => p.replace(/^\\/api/, '') }
    }
  },
  build: {
    rollupOptions: {
      output: { manualChunks: { vendor: ['vue','vue-router','pinia'], ui: ['element-plus'] } }
    }
  }
})`,
        },
      },
      {
        heading: "TypeScript 类型体系搭建",
        content: [
          "TypeScript 的价值不在于给变量加个类型注解，而在于建立一套贯穿请求→状态→视图的类型流。项目中定义了三套核心类型：API 响应类型、业务实体类型、组件 Props 类型。",
          "接口层使用泛型封装，确保每个 API 函数的返回类型都是明确推断的。配合 Pinia store 的类型声明，全链路类型安全。",
        ],
        code: {
          lang: "typescript",
          snippet: `interface ApiResponse<T> { code: number; message: string; data: T }

function request<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return http.request(url, config)
}

// 使用时自动推断
const { data } = await request<UserInfo>('/api/user/info')`,
        },
      },
      {
        heading: "请求层统一封装",
        content: [
          "运营商项目的请求层需要处理 Token 自动携带与刷新、接口签名（防篡改）、统一异常提示、超时重试、登录态失效自动跳转。",
          "基于 Axios 封装统一请求拦截层：请求拦截器注入 Token + 计算签名；响应拦截器统一错误提示 + Token 过期处理。",
          "特别是 Token 刷新的并发竞态问题：第一个 401 触发刷新，后续请求排队等待，刷新成功后自动重发。这个方案在精益运营平台中稳定运行。",
        ],
        code: {
          lang: "typescript",
          snippet: `let isRefreshing = false
let pending: Array<(t: string) => void> = []

http.interceptors.response.use(res => res, async (error) => {
  if (error.response?.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true
      const token = await refreshToken()
      pending.forEach(cb => cb(token))
      pending = []
      isRefreshing = false
      return retryWithToken(error.config, token)
    }
    return new Promise(resolve => {
      pending.push(t => resolve(retryWithToken(error.config, t)))
    })
  }
})`,
        },
      },
      {
        heading: "代码质量保障闭环",
        content: [
          "团队协作中，代码规范不能靠自觉，必须靠工具链强制。我搭建的质量闭环：ESLint + Prettier + Husky + lint-staged + Commitlint。",
          "开发阶段编辑器保存自动修复；提交阶段 Husky pre-commit 对暂存文件执行 lint-staged；commit-msg 校验提交信息。",
          "推行策略：先在新项目跑通，用实际效果说话，再逐步推广。最终这套规范被团队采纳，成为后续新项目标配。",
        ],
      },
      {
        heading: "构建优化与多环境发布",
        content: [
          "主要优化手段：路由懒加载、Element Plus 按需引入、静态资源 CDN 外置、Gzip 压缩。",
          "多环境发布通过 .env 文件区分，配合 npm scripts 的 build:staging / build:production 和 Nginx 配置实现一键发布。",
        ],
      },
      {
        heading: "团队规范落地经验",
        content: [
          "工程化最难的不是技术方案，而是推行落地。总结经验：先做减法（只做最有价值的几项规范）；工具先行（自动化代替口头约定）；新代码新规范、老代码逐步迁移；每周 CR 复盘会统一认知。",
          "所沉淀的通用组件和工具函数直接复用到多个后续项目中，大幅降低了新项目的启动成本。",
        ],
      },
    ],
  },

  // ── 2. Qiankun 微前端 ───────────────────────────────────
  {
    slug: "qiankun-micro-frontend",
    title: "Qiankun 微前端架构在大型政务系统中的落地实践",
    date: "2021-08-15",
    readingMinutes: 14,
    views: 4200,
    tags: ["React", "微前端", "Qiankun", "架构"],
    category: "前端进阶",
    excerpt:
      "从子应用拆分到主应用通信，记录微前端在出版集团十几个子系统整合中的落地方案、样式隔离踩坑与全局状态管理。",
    toc: [
      "为什么选择微前端",
      "子应用拆分策略",
      "样式隔离与 JS 沙箱",
      "全局状态通信",
      "Yeoman 脚手架提速",
      "踩坑与总结",
    ],
    sections: [
      {
        heading: "为什么选择微前端",
        content: [
          "出版集团的数字出版生态包含用户管理、产品管理、渠道管理、订单管理、财务结算等十几个子系统。原有 SPA 方案导致构建 10+ 分钟、多人协作冲突、无法局部升级技术栈。",
          "微前端的核心价值：独立开发、独立部署、独立运行、整合展示。选择 Qiankun 是因为它对 React 生态支持最成熟。",
        ],
      },
      {
        heading: "子应用拆分策略",
        content: [
          "按业务域独立拆分，每个微应用有自己的代码仓库和构建流程。主应用监听一级路由（/user、/order、/product），匹配后加载对应子应用。",
          "改造成本可控：只需导出 bootstrap/mount/unmount 三个生命周期函数，修改 webpack publicPath 配置。",
        ],
        code: {
          lang: "typescript",
          snippet: `export async function bootstrap() { /* 初始化 */ }
export async function mount(props: any) {
  ReactDOM.render(<App {...props} />, props.container.querySelector('#root'))
}
export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(props.container.querySelector('#root'))
}`,
        },
      },
      {
        heading: "样式隔离与 JS 沙箱",
        content: [
          "选择 experimentalStyleIsolation + BEM 命名规范双重保障。共享样式通过 CSS 变量从主应用注入。",
          "JS 沙箱用 Qiankun 的 ProxySandbox，注意子应用不能直接修改 window 全局变量，共享配置需通过 initGlobalState 注入。",
        ],
      },
      {
        heading: "全局状态通信",
        content: [
          "主应用维护全局状态池（登录用户、主题、权限），子应用通过 onGlobalStateChange 监听、setGlobalState 更新。复杂场景用 CustomEvent + 全局事件总线。",
        ],
      },
      {
        heading: "Yeoman 脚手架提速",
        content: [
          "开发 Yeoman 项目脚手架模板，一键生成标准化子应用结构，新项目从创建到联调只需 5 分钟，搭建时间缩短 70%。",
        ],
      },
      {
        heading: "踩坑与总结",
        content: [
          "踩过的坑：公共依赖重复加载（externals + CDN）、预加载影响首屏（调整 prefetch）、热更新失效（开发时关闭沙箱）、路由跳转白屏（主应用统一接管切换动画）。",
          "最终成功整合十几个子系统，解决了技术栈冲突问题，团队并行开发效率显著提升。",
        ],
      },
    ],
  },

  // ── 3. ECharts 大屏性能优化 ────────────────────────────
  {
    slug: "echarts-highcharts-dashboard",
    title: "ECharts + Highcharts 可视化大屏性能优化实战",
    date: "2024-06-16",
    readingMinutes: 12,
    views: 3860,
    tags: ["可视化", "ECharts", "Highcharts", "Vue2"],
    category: "全栈开发",
    excerpt:
      "在运营商运营中台中，面对 20+ 图表同屏渲染的性能挑战，通过组件拆分、数据驱动、懒加载和渲染优化实现流畅大屏体验。",
    toc: [
      "大屏场景的性能挑战",
      "图表组件化拆分",
      "数据驱动与响应式",
      "渲染性能优化",
      "组件复用与主题规范",
    ],
    sections: [
      {
        heading: "大屏场景的性能挑战",
        content: [
          "精益运营平台的驾驶舱大屏需要在同一页面展示 20+ 个图表。初期直接初始化所有实例，结果页面卡顿、切换白屏 2-3 秒、内存飙到 1.5GB。",
          "根本原因：每个 ECharts 实例持有独立 Canvas 和渲染上下文，20+ 个实例同时驻留内存，加上数据轮询导致大量重绘。",
        ],
      },
      {
        heading: "图表组件化拆分",
        content: [
          "每个图表封装为独立 Vue 组件，管理自己的 ECharts 实例生命周期。关键：挂载时初始化、销毁时 dispose、resize 时自适应。",
        ],
        code: {
          lang: "vue",
          snippet: `<script setup>
const chartRef = ref()
let chart = null

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(mergedOption)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chart?.dispose()  // 防止内存泄漏
  window.removeEventListener('resize', handleResize)
})
</script>`,
        },
      },
      {
        heading: "数据驱动与响应式",
        content: [
          "设计数据适配层：API 原始数据 → 适配器转换为图表格式 → 组件渲染。后端接口变更时只改适配器。",
          "响应式用 ResizeObserver 而不是 window.resize，因为容器尺寸变化不一定来自窗口变化。",
        ],
      },
      {
        heading: "渲染性能优化",
        content: [
          "核心措施：① IntersectionObserver 可视区域检测，进入视口才初始化；② LTTB 算法降采样；③ 分批渲染，首屏只渲染可见图表；④ 数据缓存避免重复请求。",
          "优化后首屏从 8s 降到 2.5s，内存从 1.5GB 降到 600MB，FPS 从 15 提升到 55。",
        ],
      },
      {
        heading: "组件复用与主题规范",
        content: [
          "沉淀了 15+ 种图表组件库，统一配色、交互规范和响应式断点。主题色通过 CSS 变量注入，切换暗黑/亮色模式自动跟随。",
          "这套组件库被复用到智慧全息洞察平台和其他新项目中。",
        ],
      },
    ],
  },

  // ── 4. ArcGIS + 客群圈选 ────────────────────────────────
  {
    slug: "arcgis-customer-selection",
    title: "ArcGIS 地图可视化 + 条件树客群圈选实战",
    date: "2025-03-10",
    readingMinutes: 16,
    views: 2460,
    tags: ["可视化", "ArcGIS", "Vue2", "React"],
    category: "全栈开发",
    excerpt:
      "在智慧全息洞察平台中，首次落地 ArcGIS 地图能力，同时通过 iframe + postMessage 实现 Vue2 主工程与 React 客群子工程的跨技术栈协同。",
    toc: [
      "ArcGIS 快速入门",
      "地图看管与热力营销",
      "条件树客群圈选",
      "iframe + postMessage 跨页协同",
      "实战踩坑总结",
    ],
    sections: [
      {
        heading: "ArcGIS 快速入门",
        content: [
          "平台需要在地图上展示网格分布、客户热力图、营销覆盖区域。时间紧迫（一周交付），从零学习 ArcGIS。",
          "选择 esri-loader 按需加载（全量 npm 包 2MB+），核心概念：Map → MapView → Layer → Graphic → Renderer，覆盖 80% 需求。",
        ],
        code: {
          lang: "typescript",
          snippet: `const [Map, MapView, GraphicsLayer] = await loadModules([
  'esri/Map', 'esri/views/MapView', 'esri/layers/GraphicsLayer'
])
const map = new Map({ basemap: 'dark-gray-vector' })
const view = new MapView({
  container: mapContainer.value, map,
  center: [113.65, 34.75], zoom: 8
})`,
        },
      },
      {
        heading: "地图看管与热力营销",
        content: [
          "展示行政区划边界、基站分布、客户热力图、营销覆盖区域，每个图层独立控制显隐。",
          "热力图通过 HeatmapRenderer 实现，点击区域可下钻到网格级别查看客户分布和营销执行情况。",
        ],
      },
      {
        heading: "条件树客群圈选",
        content: [
          "最复杂的交互模块：选择标签 → 配置计算方式 → 可视化条件树组合 → 实时预估人数 → 保存配置。",
          "用 React + Redux + jsPlumb 实现，条件变化时防抖 300ms 调用后端接口计算覆盖人数。",
        ],
      },
      {
        heading: "iframe + postMessage 跨页协同",
        content: [
          "客群子工程通过 iframe 嵌入 Vue2 主工程，通过 postMessage 双向通信。",
          "关键设计：消息协议统一（type + payload + timestamp）、origin 校验、消息队列（iframe 未就绪时缓存）、会话同步（子工程刷新后恢复状态）。",
        ],
        code: {
          lang: "typescript",
          snippet: `// 子工程 → 主工程
window.parent.postMessage({
  type: 'SELECTION_SAVE',
  payload: { groupId, conditions, estimatedCount },
  timestamp: Date.now()
}, TARGET_ORIGIN)

// 主工程监听
window.addEventListener('message', (e) => {
  if (e.origin !== ALLOWED_ORIGIN) return
  if (e.data.type === 'SELECTION_SAVE') handleSave(e.data.payload)
})`,
        },
      },
      {
        heading: "实战踩坑总结",
        content: [
          "踩坑：ArcGIS 底图加载慢（换国内 CDN）、jsPlumb 高分屏连线偏移（缩放比校正）、iframe 弹窗被父页面遮挡（改用父页面弹窗代理）、移动端手势冲突（禁用默认触摸行为）。",
          "成功填补了团队在 GIS 方向的技术空白，后续地图需求可复用这套方案。",
        ],
      },
    ],
  },

  // ── 5. AI 多模态质检 ─────────────────────────────────────
  {
    slug: "ai-multimodal-quality",
    title: "AI 多模态质检体系：从录音识别到报告生成",
    date: "2026-02-15",
    readingMinutes: 14,
    views: 2180,
    tags: ["AI", "Vue3", "TypeScript", "全栈"],
    category: "全栈开发",
    excerpt:
      "在 AI 神匠投诉处理平台中，设计多模态质检与预览体系，集成 Word/PDF/图片/音频联动展示与 AI 敏感词识别、材料要素自动提取。",
    toc: [
      "多模态文件预览架构",
      "docx-preview + pdf.js 集成",
      "AI 质检工作流",
      "录音敏感词识别",
      "分场景 Loading 优化",
    ],
    sections: [
      {
        heading: "多模态文件预览架构",
        content: [
          "投诉工单包含多种文件：Word 报告、PDF 附件、照片、录音。目标是统一在线预览，AI 识别结果直接叠加在预览上。",
          "架构：统一文件入口（按 MIME 路由）→ 各格式预览组件 → AI 标注层 → 审核操作栏。",
        ],
      },
      {
        heading: "docx-preview + pdf.js 集成",
        content: [
          "Word 用 docx-preview 解析为 HTML，注意表格样式丢失（需 CSS 覆盖）和大文件解析慢（loading 兜底）。",
          "PDF 用 pdf.js，控制渲染分辨率 1.5x 保证清晰度，切页时释放上一页 Canvas 管理内存。",
        ],
        code: {
          lang: "typescript",
          snippet: `// Word 预览
import { renderAsync } from 'docx-preview'
await renderAsync(buffer, container, null, {
  breakPages: true, className: 'docx-preview'
})

// PDF 预览
const pdf = await pdfjsLib.getDocument(buffer).promise
const page = await pdf.getPage(1)
const viewport = page.getViewport({ scale: 1.5 })
await page.render({ canvasContext: ctx, viewport }).promise`,
        },
      },
      {
        heading: "AI 质检工作流",
        content: [
          "流程：上传报告 → AI 解析 → 返回质检结果（敏感词、缺失要素、签名校验、合规评分）→ 前端高亮标注 → 人工复核。",
          "关键：质检结果异步返回需渐进展示（loading → 部分 → 完整），标注需精确定位到文档位置。",
        ],
      },
      {
        heading: "录音敏感词识别",
        content: [
          "播放音频的同时在时间轴标注敏感词位置，点击标注跳转到对应时间。",
          "Audio API 控制播放，Canvas 绘制波形和标注，按 severity 用不同颜色区分。",
        ],
      },
      {
        heading: "分场景 Loading 优化",
        content: [
          "大屏数据场景下统一 Loading 体验差。设计分场景策略：文件区域骨架屏、质检面板脉冲动画、表格区域 Spin → 页面整体可用，各区域独立加载。",
          "配合 Vue3 Suspense 和 Transition，用户体验明显好于全屏遮罩方案。",
        ],
      },
    ],
  },

  // ── 6. Spring Cloud Gateway 鉴权 ────────────────────────
  {
    slug: "spring-cloud-gateway-auth",
    title: "Spring Cloud Gateway 统一鉴权与 Nacos 动态配置",
    date: "2026-05-20",
    readingMinutes: 18,
    views: 2820,
    tags: ["SpringBoot", "Spring Cloud", "全栈", "Nacos"],
    category: "全栈开发",
    excerpt:
      "从 JWT 签发到 Gateway 路由鉴权，结合 Nacos 配置中心实现配置动态生效，梳理微服务架构下的安全接入方案。",
    toc: [
      "网关层鉴权的优势",
      "JWT 签发与校验",
      "Gateway 过滤器实现",
      "Nacos 动态配置",
      "部署与调试",
    ],
    sections: [
      {
        heading: "网关层鉴权的优势",
        content: [
          "微服务架构下每个服务自己校验 Token 会导致重复代码和密钥分发困难。在网关层统一鉴权：所有请求先经过网关校验，通过后转发到下游，下游只需读取透传的用户信息。",
          "My Blog 项目中的实践：Gateway 负责 JWT 校验和路由转发；auth-center 负责登录签发；blog-service 只从请求头读用户 ID。",
        ],
      },
      {
        heading: "JWT 签发与校验",
        content: [
          "登录流程：提交凭证 → auth-center 校验 → 生成 JWT → 返回 access_token + refresh_token → 前端存储。",
          "access_token 有效期 2 小时、refresh_token 7 天，Token 存入 Redis 支持服务端主动吊销。",
        ],
        code: {
          lang: "java",
          snippet: `public TokenPair login(LoginRequest req) {
    User user = userService.validate(req.getUsername(), req.getPassword());
    String accessToken = jwtUtil.generateToken(
        user.getId(), user.getUsername(), user.getRoles(),
        Duration.ofHours(2));
    String refreshToken = jwtUtil.generateRefreshToken(
        user.getId(), Duration.ofDays(7));
    redisTemplate.opsForValue().set("token:" + user.getId(), refreshToken, 7, TimeUnit.DAYS);
    return new TokenPair(accessToken, refreshToken);
}`,
        },
      },
      {
        heading: "Gateway 过滤器实现",
        content: [
          "自定义 GlobalFilter：校验 Authorization 头中的 JWT → 校验通过后将 userId、username、roles 写入请求头 → 转发到下游服务。",
          "白名单路径（登录、注册、静态资源）直接放行。校验失败返回 401，Token 过期返回特定错误码让前端触发刷新。",
        ],
        code: {
          lang: "java",
          snippet: `@Component
public class AuthFilter implements GlobalFilter, Ordered {
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        if (isWhiteListed(path)) return chain.filter(exchange);

        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        Claims claims = jwtUtil.parseToken(token);
        if (claims == null) return unauthorized(exchange);

        ServerHttpRequest request = exchange.getRequest().mutate()
            .header("X-User-Id", claims.getSubject())
            .header("X-User-Name", claims.get("username", String.class))
            .build();
        return chain.filter(exchange.mutate().request(request).build());
    }
}`,
        },
      },
      {
        heading: "Nacos 动态配置",
        content: [
          "网站配置（SEO 信息、功能开关、样式参数）存储在 Nacos 配置中心，管理后台修改后实时生效，无需重启服务。",
          "Spring Cloud 的 @RefreshScope 配合 Nacos Config 监听器，配置变更时自动刷新 Bean。前端管理后台通过 API 修改 Nacos 配置项，下次请求即生效。",
        ],
      },
      {
        heading: "部署与调试",
        content: [
          "Docker Compose 编排：Nacos（服务注册+配置中心）+ MySQL + Redis + Gateway + auth-center + blog-service。",
          "调试经验：Gateway 路由不匹配时检查 predicates 的 Path 配置；Token 校验失败先看密钥是否一致；Nacos 配置不生效检查 dataId 和 group 是否匹配。",
        ],
      },
    ],
  },

  // ── 7. Docker 一键部署 ──────────────────────────────────
  {
    slug: "docker-nginx-deploy",
    title: "Docker + Nginx 一键部署：从镜像构建到线上发布",
    date: "2026-04-10",
    readingMinutes: 12,
    views: 3100,
    tags: ["Docker", "Nginx", "DevOps", "全栈"],
    category: "全栈开发",
    excerpt:
      "从 Dockerfile 编写到 Docker Compose 编排，配合 Nginx 反向代理实现可复制的交付链路，覆盖前端静态资源和后端微服务。",
    toc: [
      "为什么需要容器化",
      "Dockerfile 编写实践",
      "Docker Compose 编排",
      "Nginx 反向代理配置",
      "多环境部署策略",
      "常见问题排查",
    ],
    sections: [
      {
        heading: "为什么需要容器化",
        content: [
          "个人官网项目包含 Next.js 前端、Vue3 管理后台、Spring Boot 后端、MySQL、Redis、Nacos 六个组件。手动部署需要分别配置环境，容易出错且不可复制。",
          "Docker 的价值：一份 Dockerfile 描述构建过程，一个 docker-compose.yml 描述组件关系，任何机器上 docker-compose up 一键启动完整环境。",
        ],
      },
      {
        heading: "Dockerfile 编写实践",
        content: [
          "前端项目用多阶段构建：第一阶段 npm install + build，第二阶段只复制构建产物到 Nginx 镜像，最终镜像只有 30MB。",
          "后端 Spring Boot 用官方 JDK 镜像，COPY jar 包 + EXPOSE 端口 + ENTRYPOINT 启动。",
        ],
        code: {
          lang: "dockerfile",
          snippet: `# 前端多阶段构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80`,
        },
      },
      {
        heading: "Docker Compose 编排",
        content: [
          "docker-compose.yml 定义了所有服务的启动顺序、网络、卷挂载和环境变量。关键是 depends_on + healthcheck 确保依赖服务就绪后再启动上层服务。",
        ],
        code: {
          lang: "yaml",
          snippet: `version: '3.8'
services:
  nacos:
    image: nacos/nacos-server:v2.3.0
    ports: ["8848:8848"]
    healthcheck:
      test: curl -f http://localhost:8848/nacos/
      interval: 10s
  mysql:
    image: mysql:8.0
    volumes: [mysql-data:/var/lib/mysql]
  redis:
    image: redis:7-alpine
  gateway:
    build: ./gateway
    depends_on:
      nacos: { condition: service_healthy }
    ports: ["9000:9000"]`,
        },
      },
      {
        heading: "Nginx 反向代理配置",
        content: [
          "Nginx 作为统一入口：/ → Next.js 静态资源、/admin → Vue3 管理后台、/api → Spring Cloud Gateway。SPA 路由用 try_files 兜底。",
        ],
        code: {
          lang: "nginx",
          snippet: `server {
    listen 80;
    location /      { root /usr/share/nginx/html/site; try_files $uri $uri/ /index.html; }
    location /admin { root /usr/share/nginx/html; try_files $uri $uri/ /admin/index.html; }
    location /api   { proxy_pass http://gateway:9000; proxy_set_header Host $host; }
}`,
        },
      },
      {
        heading: "多环境部署策略",
        content: [
          "通过 .env 文件区分环境：docker-compose --env-file .env.production up。不同环境的数据库连接、API 地址、密钥都通过环境变量注入。",
        ],
      },
      {
        heading: "常见问题排查",
        content: [
          "常见问题：容器间网络不通（检查是否在同一个 docker network）、MySQL 启动慢导致后端连接失败（healthcheck + depends_on）、端口冲突（映射到不同宿主机端口）。",
        ],
      },
    ],
  },

  // ── 8. Multi-Agent 智能写作 ─────────────────────────────
  {
    slug: "multi-agent-writing",
    title: "Multi-Agent 协作架构：Token 消耗降低 89% 的秘密",
    date: "2026-01-20",
    readingMinutes: 16,
    views: 2580,
    tags: ["AI", "TypeScript", "Multi-Agent", "RAG"],
    category: "AI 工程",
    excerpt:
      "StoryForge AI 的 Planner/Writer/Keeper 三层 Agent 协作架构，独创注意力衰减 + 摘要压缩记忆机制，大幅降低长文本创作的 Token 消耗。",
    toc: [
      "为什么需要 Multi-Agent",
      "三层 Agent 架构设计",
      "注意力衰减记忆机制",
      "智能多模型路由",
      "LLM-as-Judge 质量飞轮",
      "工程化实践",
    ],
    sections: [
      {
        heading: "为什么需要 Multi-Agent",
        content: [
          "长文本创作（小说、技术文档）如果用一个 LLM 一次性生成，面临三个问题：上下文窗口不够长（10 万字远超限制）、质量不可控（越到后面越跑偏）、Token 成本极高（每次都要传完整上下文）。",
          "Multi-Agent 的思路是分工协作：不同 Agent 负责不同环节，通过结构化的消息传递协作，每个 Agent 只需要看到自己需要的上下文。",
        ],
      },
      {
        heading: "三层 Agent 架构设计",
        content: [
          "Planner Agent：负责全局规划，生成章节大纲、角色设定、情节线索。输出结构化的写作计划。",
          "Writer Agent：按照 Planner 的指令逐章撰写，每次只接收当前章节所需的最小上下文。",
          "Keeper Agent：负责记忆管理，维护角色状态、情节进展、伏笔记录，在 Writer 需要时提供精准的上下文摘要。",
        ],
      },
      {
        heading: "注意力衰减记忆机制",
        content: [
          "核心创新：不是所有历史信息都同等重要。距离当前章节越远的内容，注意力权重越低。",
          "实现方式：每完成一章，Keeper 将详细内容压缩为摘要，摘要再压缩为关键事实。Writer 请求上下文时，最近 3 章给完整内容，之前给摘要，更早给关键事实列表。",
          "效果：Token 消耗从每章 ~8000 降到 ~900，降低 89%。同时因为上下文更精准，生成质量反而更高。",
        ],
      },
      {
        heading: "智能多模型路由",
        content: [
          "不同任务对模型能力要求不同：大纲规划需要强推理（用高端模型）、正文撰写需要流畅表达（用中等模型）、格式整理只需要基础能力（用便宜模型）。",
          "路由器根据任务类型自动选择最合适的模型，API 成本降低约 70%。",
        ],
      },
      {
        heading: "LLM-as-Judge 质量飞轮",
        content: [
          "写完每章后，用 LLM 从 5 个维度（情节连贯性、角色一致性、文笔质量、节奏控制、伏笔呼应）打分，低于阈值的自动要求 Writer 重写。",
          "评分数据积累后形成质量趋势，帮助 Planner 在后续章节中调整策略，形成数据飞轮。",
        ],
      },
      {
        heading: "工程化实践",
        content: [
          "技术栈：TypeScript + NestJS + PostgreSQL + Prisma。前端实时展示写作进度和 Agent 通信过程（WebSocket/SSE）。",
          "90%+ 代码由 AI（Claude Code）辅助生成，人工聚焦架构设计和业务逻辑审查。这种开发模式本身就是 AI 工程化的最佳实践。",
        ],
      },
    ],
  },


  // ── 9. SpringAI + RAG ───────────────────────────────────
  {
    slug: "springai-rag-knowledge-base",
    title: "SpringAI + RAG 构建企业级知识问答系统",
    date: "2025-09-18",
    readingMinutes: 14,
    views: 2140,
    tags: ["AI", "SpringBoot", "RAG", "全栈"],
    category: "AI 工程",
    excerpt:
      "结合 PGVector 向量存储与 Function Calling，用 SpringAI 打造基于文档 ETL 的 AI 知识检索增强应用。",
    toc: ["RAG 架构概述", "文档 ETL 流水线", "PGVector 向量存储", "Function Calling", "SpringAI 集成", "效果评估"],
    sections: [
      {
        heading: "RAG 架构概述",
        content: [
          "RAG（Retrieval-Augmented Generation）的核心思路：先从知识库中检索相关文档片段，再将片段作为上下文传给 LLM 生成回答。既利用 LLM 的生成能力，又保证回答基于真实数据，减少幻觉。",
          "在 My Blog 项目中实现了完整 RAG 流程：文档上传 → 解析提取 → 文本分块 → 向量化 → 存入 PGVector → 查询时检索 Top-K 相似片段 → 拼接 Prompt 调用 LLM。",
        ],
      },
      {
        heading: "文档 ETL 流水线",
        content: [
          "支持 PDF、Word、Markdown、TXT 四种格式。解析后按 500 token 分块（overlap 50 token），每块生成 embedding 向量。",
          "ETL 用 Spring Batch 实现，支持断点续传和错误重试。大文档异步处理，WebSocket 推送进度。",
        ],
      },
      {
        heading: "PGVector 向量存储",
        content: [
          "选 PGVector 而非 Milvus 的原因：项目已用 PostgreSQL，PGVector 是扩展而非新组件，运维成本低。万级文档规模下性能完全够用。",
          "关键配置：embedding 维度匹配模型（1536 维）、HNSW 索引加速搜索、调整 ef_construction 和 m 参数。",
        ],
        code: {
          lang: "sql",
          snippet: `CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding vector(1536)
);
CREATE INDEX ON documents
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);`,
        },
      },
      {
        heading: "Function Calling",
        content: [
          "通过 Function Calling 让 AI 调用外部工具：搜索博客、查询项目、获取天气。SpringAI 的 @Tool 注解让 Java 方法直接暴露给 LLM。",
        ],
      },
      {
        heading: "SpringAI 集成",
        content: [
          "SpringAI 提供统一 ChatClient 接口，屏蔽 LLM 提供商差异。注入 VectorStore 和 Tool 列表，RAG 自动串联。",
        ],
        code: {
          lang: "java",
          snippet: `@Bean
ChatClient chatClient(ChatClient.Builder builder, VectorStore store) {
    return builder
        .defaultAdvisors(new QuestionAnswerAdvisor(store))
        .defaultTools(new BlogTools(), new ProjectTools())
        .build();
}`,
        },
      },
      {
        heading: "效果评估",
        content: [
          "检索准确率 Top-5 命中率 ~85%，响应延迟平均 2.3s。",
          "优化手段：查询改写（多搜索角度）、混合检索（向量 + BM25）、Cross-Encoder 重排序。",
        ],
      },
    ],
  },

  // ── 10. 前端工作台设计模式 ─────────────────────────────
  {
    slug: "frontend-workstation-patterns",
    title: "前端工作台设计模式：多服务聚合与状态编排",
    date: "2024-11-05",
    readingMinutes: 11,
    views: 1960,
    tags: ["Vue3", "TypeScript", "架构", "工程化"],
    category: "前端进阶",
    excerpt:
      "从运营商投诉处理平台中提炼的前端工作台设计模式，解决多后端服务聚合、分场景 Loading、错误隔离与状态编排问题。",
    toc: ["工作台场景的复杂性", "服务聚合层设计", "分场景 Loading", "错误隔离", "状态编排", "可复用性沉淀"],
    sections: [
      {
        heading: "工作台场景的复杂性",
        content: [
          "运营商投诉处理工作台需要同时对接 5+ 个后端服务（用户画像、订购信息、账单查询、接触记录、AI 质检），每个服务的响应速度和错误模式各不相同。",
          "如果简单地在页面里发 5 个请求等全部返回再渲染，一个慢接口会拖垮整个页面。需要更精细的加载策略。",
        ],
      },
      {
        heading: "服务聚合层设计",
        content: [
          "在 API 层之上封装「数据聚合层」，将同一业务实体的多个服务调用合并为语义化接口。聚合层内部使用 Promise.allSettled，单个服务失败不会导致全部失败。",
        ],
        code: {
          lang: "typescript",
          snippet: `async function getWorkstation(userId: string) {
  const results = await Promise.allSettled([
    fetchUserProfile(userId),
    fetchOrders(userId),
    fetchBills(userId),
    fetchContacts(userId),
    fetchQualityScore(userId),
  ])
  return {
    profile: unwrap(results[0]),
    orders: unwrap(results[1]),
    bills: unwrap(results[2]),
    contacts: unwrap(results[3]),
    quality: unwrap(results[4]),
  }
}`,
        },
      },
      {
        heading: "分场景 Loading",
        content: [
          "每个数据模块有独立的 loading/error/data 状态，渲染互不干扰。用户看到的是各区域逐步填充内容，而非全屏 Loading。",
          "优先级排序：核心信息优先加载，辅助信息延迟加载，非必要信息后台静默加载。",
        ],
      },
      {
        heading: "错误隔离",
        content: [
          "单个服务失败时，对应模块显示错误提示和重试按钮，其他模块正常展示。",
          "错误分类：网络错误（自动重试 2 次）、业务错误（展示后端提示）、超时（提示并允许重试）。",
        ],
      },
      {
        heading: "状态编排",
        content: [
          "工作台状态是「会话态」而非简单 CRUD：当前查看的用户、激活的 Tab、各模块加载状态、操作历史。",
          "设计 WorkstationStore 统一管理，支持状态快照（回退）和多 Tab 页同步。",
        ],
      },
      {
        heading: "可复用性沉淀",
        content: [
          "这套工作台模式可推广到任何需要多服务聚合的场景：CRM 客户工作台、运维监控台、电商运营台。",
          "核心组件已抽取为通用库：ServiceAggregator（服务聚合）、ModuleLoader（模块加载器）、ErrorBoundary（错误边界）、SessionStore（会话管理）。",
        ],
      },
    ],
  },
];

/** 按日期倒序排列 */
export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

/** 所有标签（去重） */
export const allTags = [...new Set(posts.flatMap((p) => p.tags))];

/** 根据 slug 查找 */
export function findPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** 获取推荐文章（同标签优先） */
export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = findPostBySlug(slug);
  if (!current) return posts.slice(0, limit);
  const tagSet = new Set(current.tags);
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore = a.tags.filter((t) => tagSet.has(t)).length;
      const bScore = b.tags.filter((t) => tagSet.has(t)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}
