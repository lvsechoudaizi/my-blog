package com.myblog.auth.service;

public record RefreshTokenPayload(
        Long userId,
        String username,
        long issuedAtEpochSeconds
) {
}

