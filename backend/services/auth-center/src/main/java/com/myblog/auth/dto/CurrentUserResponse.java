package com.myblog.auth.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CurrentUserResponse(
        Long id,
        String username,
        String displayName,
        String nickname,
        String avatar,
        String email,
        Integer status,
        LocalDateTime createTime,
        LocalDateTime updateTime,
        List<String> roles,
        List<String> permissions,
        boolean authChecked
) {
}
