package com.myblog.gateway;
// 这个类 = 后端网关的全局请求拦截器= 你前端写的 axios 请求拦截器 + 响应拦截器
//  作用 所有前端发来的请求，必须先经过这里检查 token，合法才放行，不合法直接返回 401！
// = 后端网关的全局请求拦截器
// = 你写的 axios 请求拦截器
// 它的完整工作流程：
// 所有前端请求先到这里
// 如果是登录接口 → 直接放行
// 否则检查请求头有没有 token
// 没有 token 或格式错误 → 返回 401
// 验证 token 是否有效（过期 / 篡改）
// 无效 → 返回 401
// 有效 → 标记已鉴权，放行请求
// 一句话：
// 网关统一鉴权，所有接口必须登录才能访问！

// 导入 JWT 工具（验证 token 用）
import com.myblog.common.util.JwtUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

// @Component = 注册成全局组件
// implements GlobalFilter = 全局过滤器
// → 所有请求都会走这里 
// implements Ordered = 优先级（数字越小越先执行）
// 可以理解成
// 前端 axios 全局拦截器
// axios.interceptors.request.use(config => {
//   // 所有请求先经过这里
// })
@Component
public class AuthGlobalFilter implements GlobalFilter, Ordered {

    // 从配置文件读取 jwt 密钥 用来验证 token 是否合法
    @Value("${app.jwt.secret}")
    private String jwtSecret;
    

    // 所有前端请求，都会先进这个方法！
    // ServerWebExchange = 服务器 Web 交换对象，包含了请求和响应的所有信息
    // GatewayFilterChain = 网关过滤器链，用来继续处理请求
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 获取请求路径
        String path = exchange.getRequest().getURI().getPath();
        if (exchange.getRequest().getMethod() != null && "OPTIONS".equals(exchange.getRequest().getMethod().name())) {
            return chain.filter(exchange);
        }
        // 白名单：登录接口不校验 token 
        if (isPublicPath(path)) {
            return chain.filter(exchange); // 直接放行
        }
        // 校验 token
        String authorization = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        // 校验 token 是否存在且格式正确
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            // token 不存在或格式错误
            // 返回 401 错误响应
            // 401 未授权，没有权限访问
            // 401 错误响应体：{"success":false,"message":"未授权，没有权限访问"}
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete(); // // 结束请求
        }
        // 校验 token 是否合法
        // 从 token 中提取用户名 Bearer eyJhbGciOiJIUzI... 截取真正的 token（去掉 "Bearer"）
        String token = authorization.substring(7);
        // 校验 token 是否合法
        if (!JwtUtils.isTokenValid(token, jwtSecret)) {
            // token 无效
            // 返回 401 错误响应
            // 401 未授权，没有权限访问
            // 401 错误响应体：{"success":false,"message":"未授权，没有权限访问"}  X-Auth-Checked: true
            // 告诉后面的服务：这个请求已经在网关验证过身份了，是安全的！
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete(); // // 结束请求
        }

        return chain.filter(exchange);
    }

    // 设置过滤器优先级 
    @Override
    public int getOrder() {
        return -100;
    }

    private boolean isPublicPath(String path) {
        return "/api/auth/login".equals(path)
                || "/api/auth/refresh".equals(path)
                || "/api/auth/logout".equals(path);
    }
}
