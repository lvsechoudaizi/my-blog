package com.myblog.gateway;
// GatewayApplication 就是整个网关服务的【入口文件】！
// 相当于前端项目里的
// main.js / main.ts
// 整个项目从这里启动！
// 启动 SpringBoot
// 加载配置
// 初始化所有组件（过滤器、Controller、Service…）
// 启动 Tomcat 服务器
// 对外提供接口服务

// GatewayApplication = 整个网关服务的 “开关”
// 你运行它 → 开灯（服务启动）
// 停止运行 → 关灯（服务关闭）
// 没有这个类，你的后端根本跑不起来！
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication→ 这是 SpringBoot 项目的启动类→ 标记 “从这里开始运行”
// scanBasePackages = "com.myblog"→ 让 Spring 扫描 com.myblog 下面所有的组件→ 比如你的过滤器、工具类、配置类……→ 不加这个，你的过滤器、拦截器会不生效！
@SpringBootApplication(scanBasePackages = "com.myblog")
public class GatewayApplication {

    // 整个后端项目的入口！
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}

// 后端	前端	作用
// GatewayApplication	main.js	项目入口，启动用
// @SpringBootApplication	createApp(App)	初始化框架
// scanBasePackages	auto-import 自动导入	让组件生效
// main 方法	mount('#app')	运行项目