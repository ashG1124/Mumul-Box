package com.mumulbox.server.domain.user.controller;

import com.mumulbox.server.domain.user.dto.AuthResponse;
import com.mumulbox.server.domain.user.dto.LoginRequest;
import com.mumulbox.server.domain.user.dto.MyInfoResponse;
import com.mumulbox.server.domain.user.dto.ProfileUpdateRequest;
import com.mumulbox.server.domain.user.dto.ProfileUpdateResponse;
import com.mumulbox.server.domain.user.dto.ShareLinkResponse;
import com.mumulbox.server.domain.user.dto.SignUpRequest;
import com.mumulbox.server.domain.user.dto.SignUpResponse;
import com.mumulbox.server.domain.user.service.AuthService;
import com.mumulbox.server.domain.user.service.UserService;
import com.mumulbox.server.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    /**
     * 회원가입
     * POST /api/v1/users/signup
     */
    @PostMapping("/users/signup")
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
    @PostMapping("/users/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request
    ) {
        AuthResponse response = authService.login(request);
        return ResponseEntity
                .ok(ApiResponse.ok("로그인되었습니다.", response));
    }

    /**
     * 내 정보 조회
     * GET /api/v1/me
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<MyInfoResponse>> getMyInfo(
            @AuthenticationPrincipal User principal
    ) {
        MyInfoResponse response = userService.getMyInfo(principal.getUsername());
        return ResponseEntity
                .ok(ApiResponse.ok("내 정보를 조회했습니다.", response));
    }

    /**
     * 프로필 수정
     * PATCH /api/v1/me/profile
     */
    @PatchMapping("/me/profile")
    public ResponseEntity<ApiResponse<ProfileUpdateResponse>> updateProfile(
            @AuthenticationPrincipal User principal,
            @Valid @RequestBody ProfileUpdateRequest request
    ) {
        ProfileUpdateResponse response = userService.updateProfile(principal.getUsername(), request);
        return ResponseEntity
                .ok(ApiResponse.ok("프로필이 수정되었습니다.", response));
    }

    /**
     * 공유 링크 조회
     * GET /api/v1/me/share-link
     */
    @GetMapping("/me/share-link")
    public ResponseEntity<ApiResponse<ShareLinkResponse>> getShareLink(
            @AuthenticationPrincipal User principal
    ) {
        ShareLinkResponse response = userService.getShareLink(principal.getUsername());
        return ResponseEntity
                .ok(ApiResponse.ok("공유 링크를 조회했습니다.", response));
    }

    /**
     * 공유 링크 재발급
     * POST /api/v1/me/share-link/regenerate
     */
    @PostMapping("/me/share-link/regenerate")
    public ResponseEntity<ApiResponse<ShareLinkResponse>> regenerateShareLink(
            @AuthenticationPrincipal User principal
    ) {
        ShareLinkResponse response = userService.regenerateShareLink(principal.getUsername());
        return ResponseEntity
                .ok(ApiResponse.ok("공유 링크가 재발급되었습니다.", response));
    }
}