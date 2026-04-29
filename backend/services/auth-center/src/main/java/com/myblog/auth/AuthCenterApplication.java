package com.myblog.auth;
// 认证中心服务
// 负责用户认证、授权、登录等操作
// 提供认证相关的接口服务
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 认证中心服务启动类
 * 负责启动认证中心服务，加载配置，初始化组件，启动 Tomcat 服务器，对外提供接口服务
 * @author Lijianhua
 * @date 2023-12-10
 * @version 1.0
 * @description 认证中心服务启动类
 * @see com.myblog.auth.AuthCenterApplication
 * @since 1.0
 */
@SpringBootApplication(scanBasePackages = "com.myblog")
public class AuthCenterApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(AuthCenterApplication.class, args);
    }
}
