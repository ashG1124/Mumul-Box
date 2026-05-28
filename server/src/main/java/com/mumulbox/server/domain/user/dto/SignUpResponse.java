package com.mumulbox.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpResponse {

    private final String userId;
    private final String email;

    public static SignUpResponse of(String userId, String email) {
        return new SignUpResponse(userId, email);
    }
}