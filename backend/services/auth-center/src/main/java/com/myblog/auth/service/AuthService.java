package com.myblog.auth.service;

import com.myblog.auth.dto.CurrentUserResponse;
import com.myblog.auth.dto.LoginRequest;
import com.myblog.auth.dto.LoginResponse;
import com.myblog.common.exception.BusinessException;
import com.myblog.common.util.JwtUtils;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 认证服务
 * 1. 登录接口
 * 2. 获取当前用户信息接口
 * 3. 异常处理：登录失败、权限不足等
 */
@Service
public class AuthService {

    private static final String DEMO_USERNAME = "admin";
    private static final String DEMO_PASSWORD = "Admin@123";
    private static final String DEMO_DISPLAY_NAME = "系统管理员";
    private static final List<String> DEMO_ROLES = List.of("ADMIN");
    private static final List<String> DEMO_PERMISSIONS = List.of(
            "dashboard:view",
            "blog:read",
            "blog:write",
            "project:read"
    );

    private final PasswordEncoder passwordEncoder;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-seconds:7200}")
    private long expirationSeconds;

    /**
     * 构造函数
     * 1. 初始化密码编码器
     */
    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 登录接口
     * 1. 验证用户名和密码
     * 2. 生成 JWT 令牌
     * 3. 返回登录响应
     * 4. 异常处理：用户名或密码错误
     */
       public LoginResponse login(LoginRequest request) {
        boolean validUser = DEMO_USERNAME.equals(request.username());
        boolean validPassword = passwordEncoder.matches(request.password(), passwordEncoder.encode(DEMO_PASSWORD));
        if (!validUser || !validPassword) {
            throw new BusinessException("Invalid username or password");
        }

        String token = JwtUtils.generateToken(
                request.username(),
                Map.of(
                        "roles", DEMO_ROLES,
                        "permissions", DEMO_PERMISSIONS
                ),
                jwtSecret,
                expirationSeconds
        );
        return new LoginResponse(token, request.username(), DEMO_DISPLAY_NAME, DEMO_ROLES, DEMO_PERMISSIONS);
    }

    /**
     * 获取当前用户信息接口
     * 1. 从 JWT 中提取用户名
     * 2. 构建当前用户响应
     * 3. 返回当前用户响应
     * 4. 异常处理：用户名不存在
     */
    public CurrentUserResponse buildCurrentUser(
            String username,
            List<String> roles,
            List<String> permissions,
            boolean authenticated
    ) {
        String currentUsername = username == null ? "" : username.trim();
        String displayName = DEMO_USERNAME.equals(currentUsername) ? DEMO_DISPLAY_NAME : currentUsername;

        return new CurrentUserResponse(
                currentUsername,
                displayName,
                roles == null ? List.of() : roles,
                permissions == null ? List.of() : permissions,
                authenticated
        );
    }
}
