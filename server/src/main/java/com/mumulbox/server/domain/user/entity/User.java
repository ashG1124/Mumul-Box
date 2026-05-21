package com.mumulbox.server.domain.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "User")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @Column(name = "user_id", length = 50)
    private String userId;  // 이메일 형식

    @Column(name = "nickname", length = 50, unique = true, nullable = false)
    private String nickname;

    @Column(name = "profile_img", columnDefinition = "TEXT")
    private String profileImg;

    @Column(name = "bio", length = 255)
    private String bio;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private UserStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "email", columnDefinition = "TEXT", nullable = false)
    private String email;

    @Column(name = "password", length = 255, nullable = false)
    private String password;  // BCrypt 암호화 (스키마는 25지만 실제론 60자 필요)

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "suspended_until")
    private LocalDateTime suspendedUntil;

    @Column(name = "is_nori_enabled", nullable = false)
    private Boolean isNoriEnabled;

    @Column(name = "share_token", columnDefinition = "TEXT", nullable = false)
    private String shareToken;

    @Builder
    private User(String userId, String nickname, String email, String password,
                 String shareToken) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.shareToken = shareToken;
        this.status = UserStatus.ACTIVE;
        this.role = UserRole.USER;
        this.isNoriEnabled = true;  // 알림 기본 ON
    }

    // 프로필 수정
    public void updateProfile(String nickname, String bio, String profileImg) {
        if (nickname != null) this.nickname = nickname;
        if (bio != null) this.bio = bio;
        if (profileImg != null) this.profileImg = profileImg;
    }

    // 알림 설정 변경
    public void updateNotificationSetting(Boolean isEnabled) {
        this.isNoriEnabled = isEnabled;
    }

    // 공유 링크 토큰 재발급
    public void updateShareToken(String newToken) {
        this.shareToken = newToken;
    }
}