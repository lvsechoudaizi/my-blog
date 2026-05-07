package com.myblog.auth.service;

import com.myblog.auth.dto.CurrentUserResponse;
import com.myblog.auth.dto.LoginRequest;
import com.myblog.auth.dto.LoginResponse;
import com.myblog.auth.entity.SysUser;
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

    private final UserService userService;
    private final AuthorizationService authorizationService;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-seconds:7200}")
    private long expirationSeconds;

    /**
     * 构造函数
     * 1. 初始化密码编码器
     */
    public AuthService(
            UserService userService,
            AuthorizationService authorizationService,
            PasswordEncoder passwordEncoder
    ) {
        this.userService = userService;
        this.authorizationService = authorizationService;
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
        String username = request.username() == null ? "" : request.username().trim();
        String rawPassword = request.password() == null ? "" : request.password();
        if (username.isEmpty() || rawPassword.isEmpty()) {
            throw new BusinessException("Invalid username or password");
        }
        SysUser user = userService.findByUsername(username);
        if (user == null) {
            throw new BusinessException("Invalid username or password");
        }
        if (user.getStatus() != null && user.getStatus() == 0) {
            throw new BusinessException("User is disabled");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new BusinessException("Invalid username or password");
        }
        String storedPassword = user.getPassword().trim();
        boolean validPassword = passwordEncoder.matches(rawPassword, storedPassword);
        if (!validPassword) {
            throw new BusinessException("Invalid username or password");
        }

        List<String> userRoles = authorizationService.getUserRoles(user.getId());
        List<String> userPermissions = authorizationService.getUserPermissions(user.getId());
        String token = JwtUtils.generateToken(
                username,
                Map.of(
                        "roles", userRoles,
                        "permissions", userPermissions
                ),
                jwtSecret,
                expirationSeconds
        );
        String displayName = user.getNickname() == null || user.getNickname().isBlank()
                ? username
                : user.getNickname().trim();
        return new LoginResponse(token, username, displayName, userRoles, userPermissions);
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
        if (currentUsername.isEmpty()) {
            throw new BusinessException("Invalid username");
        }

        SysUser user = userService.findByUsername(currentUsername);
        if (user == null) {
            throw new BusinessException("User not found");
        }

        String nickname = user.getNickname() == null ? "" : user.getNickname().trim();
        String displayName = nickname.isEmpty() ? currentUsername : nickname;

        return new CurrentUserResponse(
                user.getId(),
                currentUsername,
                displayName,
                nickname,
                user.getAvatar(),
                user.getEmail(),
                user.getStatus(),
                user.getCreateTime(),
                user.getUpdateTime(),
                roles == null ? List.of() : roles,
                permissions == null ? List.of() : permissions,
                authenticated
        );
    }
}
