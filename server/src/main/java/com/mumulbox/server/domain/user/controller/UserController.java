package com.mumulbox.server.domain.user.controller;

import com.mumulbox.server.domain.user.dto.AuthResponse;
import com.mumulbox.server.domain.user.dto.LoginRequest;
import com.mumulbox.server.domain.user.dto.SignUpRequest;
import com.mumulbox.server.domain.user.dto.SignUpResponse;
import com.mumulbox.server.domain.user.service.AuthService;
import com.mumulbox.server.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    /**
     * 회원가입
     * POST /api/v1/users/signup
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignUpResponse>> signUp(
            @Valid @RequestBody SignUpRequest request
    ) {
        SignUpResponse response = authService.signUp(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("회원가입이 완료되었습니다.", response));
    }

    /**
     * 로그인
     * POST /api/v1/users/login
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request
    ) {
        AuthResponse response = authService.login(request);
        return ResponseEntity
                .ok(ApiResponse.ok("로그인되었습니다.", response));
    }
}