package com.myblog.common.security;

import com.myblog.common.util.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
/**
 * JWT 认证过滤器
 * 1. 从请求头中获取 Authorization 字段
 * 2. 校验 token 是否有效
 * 3. 解析 token 中的用户名和角色
 * 4. 设置 SecurityContextHolder 上的认证信息
 * 5. 继续处理请求
 * */   
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_PREFIX = "Bearer ";
    private static final String CLAIM_ROLES = "roles";
    private static final String CLAIM_PERMISSIONS = "permissions";

    private final WebAuthenticationDetailsSource authenticationDetailsSource = new WebAuthenticationDetailsSource();
    private final String jwtSecret;

    public JwtAuthenticationFilter(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith(AUTHORIZATION_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.substring(AUTHORIZATION_PREFIX.length());
        if (!JwtUtils.isTokenValid(token, jwtSecret)) {
            filterChain.doFilter(request, response);
            return;
        }

        Claims claims;
        try {
            claims = JwtUtils.parseToken(token, jwtSecret);
        } catch (Exception ex) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = claims.getSubject();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.addAll(toRoleAuthorities(claims.get(CLAIM_ROLES)));
        authorities.addAll(toAuthorities(claims.get(CLAIM_PERMISSIONS)));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                username == null ? "" : username.trim(),
                null,
                authorities
        );
        authentication.setDetails(authenticationDetailsSource.buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    private List<SimpleGrantedAuthority> toRoleAuthorities(Object value) {
        return toStringList(value).stream()
                .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    private List<SimpleGrantedAuthority> toAuthorities(Object value) {
        return toStringList(value).stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    private List<String> toStringList(Object value) {
        if (value == null) {
            return List.of();
        }
        if (value instanceof Collection<?> collection) {
            return collection.stream()
                    .map(String::valueOf)
                    .map(String::trim)
                    .filter(item -> !item.isEmpty())
                    .toList();
        }
        String textValue = String.valueOf(value);
        if (textValue.isBlank()) {
            return List.of();
        }
        return Arrays.stream(textValue.split(","))
                .map(String::trim)
                .filter(item -> !item.isEmpty())
                .toList();
    }
}
