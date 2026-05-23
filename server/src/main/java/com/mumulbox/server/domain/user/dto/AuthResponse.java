package com.mumulbox.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private String accessToken;
    private String tokenType;
    private String userId;
    private String nickname;

    public static AuthResponse of(String accessToken, String userId, String nickname) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .userId(userId)
                .nickname(nickname)
                .build();
    }
}