package com.mumulbox.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import com.mumulbox.server.domain.user.dto.SignUpResponse;

@Getter
@AllArgsConstructor
public class SignUpResponse {

    private final Long userID;
    private final String email;

    public static SignUpResponse of(Long userID, String email) {
        return new SignUpResponse(userID, email);
    }
}