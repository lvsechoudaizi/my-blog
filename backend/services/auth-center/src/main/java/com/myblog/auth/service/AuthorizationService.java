package com.myblog.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.myblog.auth.entity.SysMenu;
import com.myblog.auth.entity.SysRole;
import com.myblog.auth.entity.SysRoleMenu;
import com.myblog.auth.entity.SysUserRole;
import com.myblog.auth.mapper.SysMenuMapper;
import com.myblog.auth.mapper.SysRoleMapper;
import com.myblog.auth.mapper.SysRoleMenuMapper;
import com.myblog.auth.mapper.SysUserRoleMapper;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    private final SysUserRoleMapper sysUserRoleMapper;
    private final SysRoleMapper sysRoleMapper;
    private final SysRoleMenuMapper sysRoleMenuMapper;
    private final SysMenuMapper sysMenuMapper;

    public AuthorizationService(
            SysUserRoleMapper sysUserRoleMapper,
            SysRoleMapper sysRoleMapper,
            SysRoleMenuMapper sysRoleMenuMapper,
            SysMenuMapper sysMenuMapper
    ) {
        this.sysUserRoleMapper = sysUserRoleMapper;
        this.sysRoleMapper = sysRoleMapper;
        this.sysRoleMenuMapper = sysRoleMenuMapper;
        this.sysMenuMapper = sysMenuMapper;
    }

    public List<String> getUserRoles(Long userId) {
        if (userId == null) {
            return List.of();
        }

        List<Long> roleIds = sysUserRoleMapper.selectList(new LambdaQueryWrapper<SysUserRole>()
                        .eq(SysUserRole::getUserId, userId))
                .stream()
                .map(SysUserRole::getRoleId)
                .distinct()
                .toList();
        if (roleIds.isEmpty()) {
            return List.of();
        }

        return sysRoleMapper.selectList(new LambdaQueryWrapper<SysRole>()
                        .in(SysRole::getId, roleIds)
                        .eq(SysRole::getStatus, 1))
                .stream()
                .map(SysRole::getRoleCode)
                .filter(value -> value != null && !value.isBlank())
                .map(String::trim)
                .distinct()
                .toList();
    }

    public List<String> getUserPermissions(Long userId) {
        if (userId == null) {
            return List.of();
        }

        List<Long> roleIds = sysUserRoleMapper.selectList(new LambdaQueryWrapper<SysUserRole>()
                        .eq(SysUserRole::getUserId, userId))
                .stream()
                .map(SysUserRole::getRoleId)
                .distinct()
                .toList();
        if (roleIds.isEmpty()) {
            return List.of();
        }

        List<Long> menuIds = sysRoleMenuMapper.selectList(new LambdaQueryWrapper<SysRoleMenu>()
                        .in(SysRoleMenu::getRoleId, roleIds))
                .stream()
                .map(SysRoleMenu::getMenuId)
                .distinct()
                .toList();
        if (menuIds.isEmpty()) {
            return List.of();
        }

        return sysMenuMapper.selectList(new LambdaQueryWrapper<SysMenu>()
                        .in(SysMenu::getId, menuIds)
                        .eq(SysMenu::getStatus, 1))
                .stream()
                .map(SysMenu::getPerms)
                .filter(value -> value != null && !value.isBlank())
                .map(String::trim)
                .distinct()
                .toList();
    }
}
