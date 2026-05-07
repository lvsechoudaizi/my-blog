package com.myblog.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.myblog.auth.entity.SysUser;
import com.myblog.auth.mapper.SysUserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserService extends ServiceImpl<SysUserMapper, SysUser> {

    public SysUser findByUsername(String username) {
        if (username == null || username.isBlank()) {
            return null;
        }
        return getOne(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getUsername, username.trim())
                .last("LIMIT 1"));
    }
}
