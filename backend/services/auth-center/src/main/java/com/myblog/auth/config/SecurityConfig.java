package com.myblog.auth.config;
/**
 * 安全配置类
 * 负责配置认证中心服务的安全策略，包括认证、授权、会话管理等
 * 提供安全相关的组件，如认证过滤器、权限校验器等
 * @author Lijianhua
 * @date 2023-12-10
 * @version 1.0
 * @description 安全配置类
 * @see com.myblog.auth.config.SecurityConfig
 * @since 1.0
 */
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// @Configuration：告诉 Spring 这是配置类，项目启动时自动加载
// 相当于前端的 config.js / setting.ts
// 全局路由守卫 + 权限控制
@Configuration
public class SecurityConfig {

    /**
     * @Bean：把这个对象交给 Spring 管理
     * SecurityFilterChain：整个权限控制的核心规则
     * 所有请求必须先经过这里，才能访问接口
     * @param http HttpSecurity 对象，用于配置 HTTP 安全策略的构建器
     * @return SecurityFilterChain 对象，用于构建安全过滤器链的构建器
     * @throws Exception 如果配置过程中发生异常
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 关闭 CSRF（前后端分离必须关）
//         什么是 CSRF？
// 浏览器安全机制，防止跨站攻击
// 但前后端分离项目（Vue/React）不需要！
// 不关会导致：前端请求全部报 403 禁止访问
        http.csrf(AbstractHttpConfigurer::disable)
        // formLogin：Spring 默认的登录页面（我们用前端登录，所以关）
                .formLogin(AbstractHttpConfigurer::disable)
                // httpBasic：浏览器弹框登录（过时、不安全，关）
                .httpBasic(AbstractHttpConfigurer::disable)
                // 设置无状态（STATLESS）= 只用 Token 登录
                // 重点：前后端分离必须是无状态
// 不使用 Session
// 不存储用户登录状态在服务器
// 完全靠 JWT Token 识别用户
// 这就是你前面 common 模块引入 JWT 的原因！
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 接口权限规则（核心中的核心）
                // /api/auth/login（登录接口）+ 健康检查接口→ 直接放行，不需要登录（相当于前端路由里的 /login 白名单）
                // 其他所有接口→ 必须登录（必须带合法 Token）才能访问
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login", "/actuator/health").permitAll()
                        // 来自网关的已认证请求直接放行
                        .requestMatchers(req -> "true".equals(req.getHeader("X-Auth-Checked"))).permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }

    // 密码编码器：用于对用户密码进行加密存储
    // 重点：密码不能明文存储，必须加密后存储
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
// 项目启动 → 加载这个安全配置
// 所有请求先经过这里
// 白名单接口（login） → 直接过
// 其他接口 → 检查有没有合法 Token
// 无 Token / Token 无效 → 返回 401 未登录
// 密码自动加密存储，不暴露明文