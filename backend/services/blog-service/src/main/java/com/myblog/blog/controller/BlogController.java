package com.myblog.blog.controller;

import com.myblog.common.api.ApiResponse;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @GetMapping("/posts")
    public ApiResponse<List<Map<String, Object>>> posts() {
        return ApiResponse.success(List.of(
                Map.of("id", 1, "title", "Hello My Blog", "status", "PUBLISHED"),
                Map.of("id", 2, "title", "Roadmap", "status", "DRAFT")
        ));
    }

    @GetMapping("/projects")
    public ApiResponse<List<Map<String, Object>>> projects() {
        return ApiResponse.success(List.of(
                Map.of("id", 101, "name", "Personal Site", "stack", List.of("Vue3", "Spring Cloud Alibaba")),
                Map.of("id", 102, "name", "Admin Console", "stack", List.of("Vue3", "TypeScript"))
        ));
    }

    // 示例接口：演示 blog-service 如何读取网关透传过来的用户信息
    @GetMapping("/me")
    public ApiResponse<Map<String, Object>> currentUser(
            @RequestHeader(value = "X-User-Name", required = false) String username,
            @RequestHeader(value = "X-User-Roles", required = false) String roles
    ) {
        return ApiResponse.success(Map.of(
                "username", username == null ? "" : username,
                "roles", roles == null ? "" : roles,
                "authChecked", true
        ));
    }
}
