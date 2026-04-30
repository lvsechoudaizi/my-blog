# 用户体系落地到 MySQL + Redis 实现方案

## 一、实施步骤概览

### 1. 数据库结构确认
### 2. 创建实体类与数据访问层
### 3. 实现业务服务层
### 4. 改造认证接口
### 5. 实现 Redis 令牌管理
### 6. 测试验证

---

## 二、详细实施步骤

### 1. 数据库结构确认

**sys_user表结构**（参考）：
```sql
CREATE TABLE `sys_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码（加密后）',
  `display_name` varchar(255) DEFAULT NULL COMMENT '显示名称',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `status` tinyint DEFAULT '1' COMMENT '状态：1-启用，0-禁用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统用户表';
```

### 2. 创建实体类与数据访问层

#### 2.1 创建用户实体类
```java
package com.myblog.auth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统用户实体类
 */
@Data
@TableName("sys_user")
public class SysUser {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String username;
    private String password;
    private String displayName;
    private String email;
    private Integer status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
```

#### 2.2 创建 MyBatis-Plus 配置类
```java
package com.myblog.auth.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.autoconfigure.ConfigurationCustomizer;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * MyBatis-Plus 配置类
 */
@Configuration
public class MyBatisPlusConfig {
    
    /**
     * 添加分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
    
    @Bean
    public ConfigurationCustomizer configurationCustomizer() {
        return configuration -> configuration.setUseDeprecatedExecutor(false);
    }
}
```

#### 2.3 创建 Mapper 接口
```java
package com.myblog.auth.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.myblog.auth.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户Mapper接口
 */
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {
    
    /**
     * 根据用户名查询用户
     * @param username 用户名
     * @return 用户信息
     */
    SysUser selectByUsername(String username);
}
```

#### 2.4 创建 Mapper XML 文件（可选）
- 文件名：`SysUserMapper.xml`
- 路径：`src/main/resources/mapper/SysUserMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.myblog.auth.mapper.SysUserMapper">
    
    <select id="selectByUsername" resultType="com.myblog.auth.entity.SysUser">
        SELECT * FROM sys_user WHERE username = #{username} AND status = 1
    </select>
    
</mapper>
```

### 3. 实现业务服务层

#### 3.1 创建 Service 接口
```java
package com.myblog.auth.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.myblog.auth.entity.SysUser;

/**
 * 用户服务接口
 */
public interface SysUserService extends IService<SysUser> {
    
    /**
     * 根据用户名获取用户信息
     * @param username 用户名
     * @return 用户信息
     */
    SysUser getUserByUsername(String username);
    
    /**
     * 验证密码是否正确
     * @param user 用户信息
     * @param rawPassword 原始密码
     * @return 是否匹配
     */
    boolean validatePassword(SysUser user, String rawPassword);
}
```

#### 3.2 创建 Service 实现类
```java
package com.myblog.auth.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.myblog.auth.entity.SysUser;
import com.myblog.auth.mapper.SysUserMapper;
import com.myblog.auth.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public SysUser getUserByUsername(String username) {
        return baseMapper.selectByUsername(username);
    }
    
    @Override
    public boolean validatePassword(SysUser user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
```

### 4. 改造认证接口

#### 4.1 改造 AuthService
```java
package com.myblog.auth.service;

import com.myblog.auth.dto.LoginRequest;
import com.myblog.auth.dto.LoginResponse;
import com.myblog.auth.entity.SysUser;
import com.myblog.auth.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 认证服务实现
 */
@Service
public class AuthService {
    
    @Autowired
    private SysUserService userService;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Autowired
    private TokenService tokenService;
    
    /**
     * 用户登录
     * @param request 登录请求
     * @return 登录响应
     */
    public LoginResponse login(LoginRequest request) {
        // 1. 根据用户名查询用户
        SysUser user = userService.getUserByUsername(request.username());
        
        // 2. 验证用户是否存在且密码正确
        if (user == null || !userService.validatePassword(user, request.password())) {
            throw new BadCredentialsException("用户名或密码错误");
        }
        
        // 3. 生成JWT令牌
        String token = jwtUtils.generateToken(user.getUsername());
        
        // 4. 保存令牌到Redis（支持单点登录）
        tokenService.saveToken(user.getUsername(), token);
        
        // 5. 构建登录响应
        return new LoginResponse(
            token,
            user.getUsername(),
            user.getDisplayName(),
            List.of("ROLE_ADMIN"), // TODO: 从数据库查询角色
            List.of("user:read", "user:write") // TODO: 从数据库查询权限
        );
    }
    
    // 其他方法...
}
```

### 5. 实现 Redis 令牌管理

#### 5.1 创建 TokenService
```java
package com.myblog.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * Token管理服务
 */
@Service
public class TokenService {
    
    @Autowired
    private StringRedisTemplate redisTemplate;
    
    @Value("${auth.token.redis-key-prefix}")
    private String tokenPrefix;
    
    @Value("${auth.token.blacklist-key-prefix}")
    private String blacklistPrefix;
    
    @Value("${app.jwt.expiration-seconds}")
    private Long expirationSeconds;
    
    /**
     * 保存令牌到Redis
     * @param username 用户名
     * @param token 令牌
     */
    public void saveToken(String username, String token) {
        String key = tokenPrefix + username;
        redisTemplate.opsForValue().set(key, token, expirationSeconds, TimeUnit.SECONDS);
    }
    
    /**
     * 验证令牌是否有效
     * @param username 用户名
     * @param token 令牌
     * @return 是否有效
     */
    public boolean validateToken(String username, String token) {
        // 1. 检查令牌是否在黑名单
        if (redisTemplate.hasKey(blacklistPrefix + token)) {
            return false;
        }
        
        // 2. 检查Redis中存储的令牌是否匹配
        String storedToken = redisTemplate.opsForValue().get(tokenPrefix + username);
        return token.equals(storedToken);
    }
    
    /**
     * 用户登出
     * @param username 用户名
     * @param token 令牌
     */
    public void logout(String username, String token) {
        // 1. 从Redis删除令牌
        redisTemplate.delete(tokenPrefix + username);
        
        // 2. 将令牌加入黑名单
        redisTemplate.opsForValue().set(
            blacklistPrefix + token,
            "1",
            expirationSeconds, TimeUnit.SECONDS
        );
    }
    
    /**
     * 单点登录：使该用户的其他令牌失效
     * @param username 用户名
     * @param currentToken 当前令牌（保持有效）
     */
    public void invalidateOtherTokens(String username, String currentToken) {
        String key = tokenPrefix + username;
        String storedToken = redisTemplate.opsForValue().get(key);
        
        // 如果存储的令牌与当前令牌不同，则将存储的令牌加入黑名单
        if (storedToken != null && !storedToken.equals(currentToken)) {
            redisTemplate.opsForValue().set(
                blacklistPrefix + storedToken,
                "1",
                expirationSeconds, TimeUnit.SECONDS
            );
        }
        
        // 更新Redis中存储的令牌为当前令牌
        redisTemplate.opsForValue().set(key, currentToken, expirationSeconds, TimeUnit.SECONDS);
    }
}
```

#### 5.2 创建 JwtUtils 工具类
```java
package com.myblog.auth.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JWT工具类
 */
@Component
public class JwtUtils {
    
    @Value("${app.jwt.secret}")
    private String secret;
    
    @Value("${app.jwt.expiration-seconds}")
    private Long expirationSeconds;
    
    /**
     * 生成JWT令牌
     * @param username 用户名
     * @return JWT令牌
     */
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationSeconds * 1000);
        
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    
    /**
     * 从令牌中获取用户名
     * @param token 令牌
     * @return 用户名
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    
    /**
     * 验证令牌是否有效
     * @param token 令牌
     * @return 是否有效
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * 获取令牌剩余有效期（秒）
     * @param token 令牌
     * @return 剩余时间（秒）
     */
    public Long getRemainingTime(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        Date expiration = claims.getExpiration();
        return (expiration.getTime() - System.currentTimeMillis()) / 1000;
    }
}
```

#### 5.3 添加登出接口
```java
package com.myblog.auth.controller;

import com.myblog.auth.api.ApiResponse;
import com.myblog.auth.service.AuthService;
import com.myblog.auth.service.TokenService;
import com.myblog.auth.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

/**
 * 认证控制器
 */
@RestController
public class AuthController {
    
    @Autowired
    private TokenService tokenService;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Value("${app.jwt.token-prefix}")
    private String tokenPrefix;
    
    /**
     * 用户登出
     * @param authorization 认证头
     * @return 响应结果
     */
    @PostMapping("/api/auth/logout")
    public ApiResponse<Void> logout(@RequestHeader("Authorization") String authorization) {
        // 提取令牌
        String token = authorization.substring(tokenPrefix.length()).trim();
        
        // 获取用户名
        String username = jwtUtils.getUsernameFromToken(token);
        
        // 登出处理
        tokenService.logout(username, token);
        
        return ApiResponse.success();
    }
    
    // 其他接口...
}
```

### 6. 测试验证

#### 6.1 数据库准备
插入测试用户数据：
```sql
-- 密码为 "123456"（使用 BCrypt 加密）
INSERT INTO sys_user (username, password, display_name, email, status) 
VALUES ('admin', '$2a$10$7u7v1g4JZ0eKQw5E7r8t9y', '管理员', 'admin@example.com', 1);
```

#### 6.2 功能测试
1. **登录测试**：
   ```bash
   curl -X POST http://localhost:8081/api/auth/login \
        -H "Content-Type: application/json" \
        -d '{"username":"admin","password":"123456"}'
   ```

2. **获取当前用户信息**：
   ```bash
   curl -X GET http://localhost:8081/api/auth/me \
        -H "Authorization: Bearer <token>"
   ```

3. **登出测试**：
   ```bash
   curl -X POST http://localhost:8081/api/auth/logout \
        -H "Authorization: Bearer <token>"
   ```

4. **单点登录测试**：
   - 使用同一账号在两个客户端登录
   - 验证第一个客户端的令牌是否失效

---

## 三、注意事项

1. **密码安全**：
   - 生产环境必须使用 BCrypt 等安全算法加密存储密码
   - 禁止明文存储密码

2. **Redis 配置**：
   - 确保 Redis 服务正常运行
   - 生产环境建议配置 Redis 密码和集群

3. **JWT 密钥**：
   - 生产环境中 JWT 密钥应使用强随机字符串
   - 建议通过环境变量或密钥管理服务注入

4. **错误处理**：
   - 添加适当的异常处理和日志记录
   - 提供友好的错误提示

5. **权限控制**：
   - 后续需实现完整的角色和权限管理
   - 目前代码中角色和权限为硬编码，需替换为数据库查询

6. **性能优化**：
   - 考虑使用 Redis 连接池
   - 优化数据库查询性能

---

## 四、后续扩展

1. **角色管理**：
   - 创建 `sys_role` 表和相关服务
   - 实现角色的增删改查

2. **权限管理**：
   - 创建 `sys_permission` 表和相关服务
   - 实现权限的增删改查

3. **用户-角色-权限关联**：
   - 创建 `sys_user_role` 和 `sys_role_permission` 表
   - 实现用户权限的动态分配

4. **密码重置**：
   - 实现密码找回功能
   - 添加密码强度验证

5. **用户注册**：
   - 实现用户自助注册功能
   - 添加邮件验证码验证

通过以上步骤，您可以完成用户体系从演示模式到基于 MySQL + Redis 的生产级实现。