package com.myblog.auth.dto;

import java.util.List;

public record CurrentUserResponse(
        String username,
        String displayName,
        List<String> roles,
        List<String> permissions,
        boolean authChecked
) {
}
