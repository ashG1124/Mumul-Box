package com.mumulbox.server.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final int code;
    private final String message;
    private final T data;

    // 성공 응답 (데이터 O)
    public static <T> ApiResponse<T> success(int code, String message, T data) {
        return new ApiResponse<>(code, message, data);
    }

    // 성공 응답 (데이터 X)
    public static <T> ApiResponse<T> success(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }

    // 200 OK 기본 성공 응답
    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(200, message, data);
    }

    // 201 Created 기본 성공 응답
    public static <T> ApiResponse<T> created(String message, T data) {
        return new ApiResponse<>(201, message, data);
    }
}