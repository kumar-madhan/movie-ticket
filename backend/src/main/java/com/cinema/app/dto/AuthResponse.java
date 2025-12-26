package com.cinema.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Response DTO returned after successful login or token refresh.
 */
@Getter
@AllArgsConstructor
public class AuthResponse {
    private final String accessToken;
    private final String refreshToken;
}

