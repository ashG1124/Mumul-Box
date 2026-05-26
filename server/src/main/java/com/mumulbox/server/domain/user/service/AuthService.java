package com.mumulbox.server.domain.user.service;

import com.mumulbox.server.domain.user.dto.AuthResponse;
import com.mumulbox.server.domain.user.dto.LoginRequest;
import com.mumulbox.server.domain.user.dto.SignUpRequest;
import com.mumulbox.server.domain.user.dto.SignUpResponse;
import com.mumulbox.server.domain.user.entity.User;
import com.mumulbox.server.domain.user.repository.UserRepository;
import com.mumulbox.server.global.exception.CustomException;
import com.mumulbox.server.global.exception.ErrorCode;
import com.mumulbox.server.global.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 회원가입
     */
    @Transactional
    public SignUpResponse signUp(SignUpRequest request) {
        // 1. 이메일 중복 확인
        if (userRepository.existsByUserId(request.getEmail())) {
            throw new CustomException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        // 2. 닉네임 중복 확인
        if (userRepository.existsByNickname(request.getNickname())) {
            throw new CustomException(ErrorCode.NICKNAME_ALREADY_EXISTS);
        }

        // 3. 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 4. 공유 토큰 생성
        String shareToken = generateShareToken();

        // 5. User 생성 및 저장
        User user = User.builder()
                .userId(request.getEmail())  // user_id = 이메일
                .email(request.getEmail())
                .password(encodedPassword)
                .nickname(request.getNickname())
                .shareToken(shareToken)
                .build();

        userRepository.save(user);
        log.info("회원가입 성공: {}", user.getUserId());

        // 6. 응답 반환 (명세 형식에 맞춰 userID는 dummy 값 1L 사용)
        return SignUpResponse.of(1L, user.getEmail());
    }

    /**
     * 로그인
     */
    public AuthResponse login(LoginRequest request) {
        // 1. 이메일로 유저 조회
        User user = userRepository.findByUserId(request.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }

        // 3. 정지된 유저 확인
        if (user.getSuspendedUntil() != null
                && user.getSuspendedUntil().isAfter(java.time.LocalDateTime.now())) {
            throw new CustomException(ErrorCode.USER_SUSPENDED);
        }

        // 4. JWT 토큰 발급
        String accessToken = jwtTokenProvider.createToken(user.getUserId(), user.getRole().name());
        log.info("로그인 성공: {}", user.getUserId());

        return AuthResponse.of(accessToken, user.getUserId(), user.getNickname());
    }

    /**
     * 공유 토큰 생성 (UUID 기반)
     */
    private String generateShareToken() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}