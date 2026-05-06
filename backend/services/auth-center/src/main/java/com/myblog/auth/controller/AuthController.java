package com.myblog.auth.controller;

import com.myblog.auth.dto.CurrentUserResponse;
import com.myblog.auth.dto.LoginRequest;
import com.myblog.auth.dto.LoginResponse;
import com.myblog.auth.service.AuthService;
import com.myblog.common.api.ApiResponse;
import com.myblog.common.exception.BusinessException;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * 认证控制器
 * 1. 登录接口
 * 2. 获取当前用户信息接口
 * 3. 异常处理：登录失败、权限不足等
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success("Login success", authService.login(request));
    }

    @GetMapping("/me")
    public ApiResponse<CurrentUserResponse> currentUser(
            Authentication authentication
    ) {
        String username = authentication == null ? "" : String.valueOf(authentication.getPrincipal());
        List<String> authorities = authentication == null
                ? List.of()
                : authentication.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .toList();

        List<String> roles = authorities.stream()
                .filter(value -> value.startsWith("ROLE_"))
                .map(value -> value.substring("ROLE_".length()))
                .toList();
        List<String> permissions = authorities.stream()
                .filter(value -> !value.startsWith("ROLE_"))
                .toList();
        return ApiResponse.success(authService.buildCurrentUser(
                username,
                roles,
                permissions,
                authentication != null && authentication.isAuthenticated()
        ));
    }

    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse<Void> handleBusinessException(BusinessException exception) {
        return ApiResponse.failure(exception.getMessage());
    }
}
