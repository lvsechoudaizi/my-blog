package com.myblog.blog.controller;

import com.myblog.common.api.ApiResponse;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
/**
 * 博客控制器
 * 1. 提供博客相关 API
 * 2. 保护 API 路由
 * 3. 提供当前用户信息接口
 */
@RestController
@RequestMapping("/api/blog")
public class BlogController {
    /**
     * 获取博客文章列表接口
     * 1. 返回所有已发布的博客文章
     */
    @GetMapping("/posts")
    public ApiResponse<List<Map<String, Object>>> posts() {
        return ApiResponse.success(List.of(
                Map.of("id", 1, "title", "Hello My Blog", "status", "PUBLISHED"),
                Map.of("id", 2, "title", "Roadmap", "status", "DRAFT")
        ));
    }
    /**
     * 获取项目列表接口
     * 1. 返回所有已发布的项目
     */
    @GetMapping("/projects")
    public ApiResponse<List<Map<String, Object>>> projects() {
        return ApiResponse.success(List.of(
                Map.of("id", 101, "name", "Personal Site", "stack", List.of("Vue3", "Spring Cloud Alibaba")),
                Map.of("id", 102, "name", "Admin Console", "stack", List.of("Vue3", "TypeScript"))
        ));
    }

    /**
     * 获取当前用户信息接口
     * 1. 返回当前登录用户的用户名、角色、认证状态
     */
    @GetMapping("/me")
    public ApiResponse<Map<String, Object>> currentUser(
            Authentication authentication
    ) {
        String username = authentication == null ? "" : String.valueOf(authentication.getPrincipal());
        List<String> authorities = authentication == null
                ? List.of()
                : authentication.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .toList();
        return ApiResponse.success(Map.of(
                "username", username,
                "authorities", authorities,
                "authChecked", authentication != null && authentication.isAuthenticated()
        ));
    }
}
