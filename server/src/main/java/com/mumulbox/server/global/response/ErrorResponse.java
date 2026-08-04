package com.mumulbox.server.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponse {

    private final String code;     // ErrorCode enum 이름 (예: "EMAIL_ALREADY_EXISTS")
    private final String message;

    public static ErrorResponse of(String code, String message) {
        return new ErrorResponse(code, message);
    }
}