package com.myblog.common.util;
// JWT = 一段加密过的字符串，用来代替登录态（session），让后端知道 “你是谁”。
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
// } 这一串长长的乱码，就是 JWT！
// 后端验证这串字符串 = 识别你是谁 = 登录成功
// JWT 用来干嘛？（核心用途）
// 登录鉴权！
// 前端输入账号密码 → 登录
// 后端验证成功 → 生成 JWT 给前端
// 前端每次请求都带上 JWT
// 后端解析 JWT → 知道你是谁 → 允许访问

// JWT = 你的身份证
// Claims = 身份证上的姓名、身份证号、性别
// JWT 就是登录 token，Claims 就是 token 里存的用户信息

import io.jsonwebtoken.Claims; // 导入JWT声明类 JWT = 后端发给前端的 “身份证”
import io.jsonwebtoken.Jwts; // 导入JWT工具类
import io.jsonwebtoken.security.Keys; // 导入JWT密钥类
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import javax.crypto.SecretKey;


public final class JwtUtils {

    private JwtUtils() {
    }

    /**
     * 中文描述：生成JWT令牌
     * @param subject 令牌主题，通常是用户ID或用户名
     * @param claims 令牌声明，包含自定义的键值对
     * @param secret 用于签名令牌的密钥
     * @param expirationSeconds 令牌过期时间，单位秒
     * @return 生成的JWT令牌字符串
     */
    public static String generateToken(String subject, Map<String, Object> claims, String secret, long expirationSeconds) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(subject)
                .claims(claims)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(expirationSeconds)))
                .signWith(getSigningKey(secret))
                .compact();
    }

    /**
     * 中文描述：解析JWT令牌，返回包含声明的Claims对象
     * @param token JWT令牌字符串
     * @param secret 用于验证签名的密钥
     * @return Claims 包含令牌声明的对象
     */
    public static Claims parseToken(String token, String secret) {
        return Jwts.parser()
                .verifyWith(getSigningKey(secret))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * 中文描述：验证JWT令牌是否有效
     * @param token JWT令牌字符串
     * @param secret 用于验证签名的密钥
     * @return 如果令牌有效则返回true，否则返回false
     */
    public static boolean isTokenValid(String token, String secret) {
        try {
            Claims claims = parseToken(token, secret);
            return claims.getExpiration() != null && claims.getExpiration().after(new Date());
        } catch (Exception ex) {
            return false;
        }
    }

    /**
     * 中文描述：获取JWT签名密钥
     * @param secret 用于签名的密钥
     * @return 密钥对象
     */
    private static SecretKey getSigningKey(String secret) {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
