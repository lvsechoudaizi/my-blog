package com.myblog.auth.service;

import com.myblog.auth.dto.CurrentUserResponse;
import com.myblog.auth.dto.LoginRequest;
import com.myblog.auth.dto.LoginResponse;
import com.myblog.common.exception.BusinessException;
import com.myblog.common.util.JwtUtils;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

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

    public CurrentUserResponse buildCurrentUser(
            String username,
            String rolesHeader,
            String permissionsHeader,
            boolean authChecked
    ) {
        String currentUsername = username == null ? "" : username.trim();
        String displayName = DEMO_USERNAME.equals(currentUsername) ? DEMO_DISPLAY_NAME : currentUsername;

        return new CurrentUserResponse(
                currentUsername,
                displayName,
                splitHeaderValues(rolesHeader),
                splitHeaderValues(permissionsHeader),
                authChecked
        );
    }

    private List<String> splitHeaderValues(String headerValue) {
        if (headerValue == null || headerValue.isBlank()) {
            return List.of();
        }

        return Arrays.stream(headerValue.split(","))
                .map(String::trim)
                .filter(item -> !item.isEmpty())
                .toList();
    }
}
