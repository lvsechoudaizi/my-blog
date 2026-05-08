package com.myblog.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myblog.common.api.ApiResponse;
import com.myblog.common.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
/**
 * 安全配置类
 * 1. 关闭 CSRF（前后端分离必须关）
 * 2. 关闭会话管理（无状态）
 * 3. 添加 JWT 认证过滤器
 * 4. 异常处理
 * 5. 授权请求
 * 6. 登录接口和错误接口是公开的，其他接口都需要认证
 */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        // 关闭 CSRF（前后端分离必须关）
        // 什么是 CSRF？
        // 浏览器安全机制，防止跨站攻击
        // 但前后端分离项目（Vue/React）不需要！
        // 不关会导致：前端请求全部报 403 禁止访问
        http.csrf(AbstractHttpConfigurer::disable)
        // formLogin：Spring 默认的登录页面（我们用前端登录，所以关）
                .formLogin(AbstractHttpConfigurer::disable)
                // httpBasic：浏览器弹框登录（过时、不安全，关）
                .httpBasic(AbstractHttpConfigurer::disable)
                // 关闭会话管理（无状态）
                // 无状态：每个请求都必须包含认证信息（如 Token）
                // 有状态：每个请求都必须包含认证信息（如 Token），且服务器会维护会话状态（如登录状态）
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // 异常处理
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setCharacterEncoding(StandardCharsets.UTF_8.name());
                            response.setContentType("application/json");
                            objectMapper.writeValue(response.getWriter(), ApiResponse.failure("Unauthorized"));
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setCharacterEncoding(StandardCharsets.UTF_8.name());
                            response.setContentType("application/json");
                            objectMapper.writeValue(response.getWriter(), ApiResponse.failure("Forbidden"));
                        })
                )
                // 授权请求
                // 重点：只有登录接口和错误接口是公开的，其他接口都需要认证
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/logout").permitAll()
                        .requestMatchers("/error").permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(
            @Value("${app.jwt.secret}") String jwtSecret,
            @Value("${app.jwt.token-header:Authorization}") String tokenHeader,
            @Value("${app.jwt.token-prefix:Bearer}") String tokenPrefix
    ) {
        return new JwtAuthenticationFilter(jwtSecret, tokenHeader, tokenPrefix);
    }

    // 密码编码器：用于对用户密码进行加密存储
    // 重点：密码不能明文存储，必须加密后存储
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
