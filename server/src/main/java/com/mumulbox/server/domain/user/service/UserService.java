package com.mumulbox.server.domain.user.service;

import com.mumulbox.server.domain.user.dto.MyInfoResponse;
import com.mumulbox.server.domain.user.dto.NotificationSettingRequest;
import com.mumulbox.server.domain.user.dto.NotificationSettingResponse;
import com.mumulbox.server.domain.user.dto.ProfileUpdateRequest;
import com.mumulbox.server.domain.user.dto.ProfileUpdateResponse;
import com.mumulbox.server.domain.user.dto.ShareLinkResponse;
import com.mumulbox.server.domain.user.entity.User;
import com.mumulbox.server.domain.user.repository.UserRepository;
import com.mumulbox.server.global.exception.CustomException;
import com.mumulbox.server.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Value("${app.share-base-url}")
    private String shareBaseUrl;

    /**
     * 내 정보 조회
     */
    public MyInfoResponse getMyInfo(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        String shareUrl = shareBaseUrl + "/" + user.getShareToken();

        return MyInfoResponse.of(
                user.getUserId(),
                user.getEmail(),
                user.getNickname(),
                user.getBio(),
                user.getProfileImg(),
                user.getIsNoriEnabled(),
                shareUrl
        );
    }

    /**
     * 프로필 수정
     */
    @Transactional
    public ProfileUpdateResponse updateProfile(String userId, ProfileUpdateRequest request) {
        // 1. 유저 조회
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 2. 닉네임 변경 시 중복 체크 (본인의 기존 닉네임과 같으면 skip)
        if (request.getNickname() != null
                && !request.getNickname().equals(user.getNickname())) {
            if (userRepository.existsByNickname(request.getNickname())) {
                throw new CustomException(ErrorCode.NICKNAME_ALREADY_EXISTS);
            }
        }

        // 3. 프로필 수정 (null 필드는 엔티티 메서드 내부에서 skip됨)
        user.updateProfile(
                request.getNickname(),
                request.getBio(),
                request.getProfileImageUrl()
        );

        log.info("프로필 수정 완료: {}", userId);

        // 4. 응답 반환 (변경감지로 updated_at 자동 갱신됨)
        return ProfileUpdateResponse.of(
                user.getUserId(),
                user.getNickname(),
                user.getBio(),
                user.getProfileImg(),
                user.getUpdatedAt()
        );
    }

    /**
     * 공유 링크 조회
     */
    public ShareLinkResponse getShareLink(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        String shareUrl = shareBaseUrl + "/" + user.getShareToken();

        return ShareLinkResponse.of(user.getUserId(), shareUrl);
    }

    /**
     * 공유 링크 재발급
     */
    @Transactional
    public ShareLinkResponse regenerateShareLink(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 새 토큰 생성 및 갱신
        String newShareToken = UUID.randomUUID().toString().replace("-", "");
        user.updateShareToken(newShareToken);

        log.info("공유 링크 재발급 완료: {}", userId);

        String shareUrl = shareBaseUrl + "/" + newShareToken;

        return ShareLinkResponse.of(user.getUserId(), shareUrl);
    }

    /**
     * 알림 설정 변경
     */
    @Transactional
    public NotificationSettingResponse updateNotificationSetting(
            String userId,
            NotificationSettingRequest request
    ) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        user.updateNotificationSetting(request.getIsEnabled());

        log.info("알림 설정 변경 완료: {} → {}", userId, request.getIsEnabled());

        return NotificationSettingResponse.of(user.getUserId(), user.getIsNoriEnabled());
    }
}