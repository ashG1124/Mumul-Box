package com.mumulbox.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyInfoResponse {

    private final String userId;
    private final String email;
    private final String nickname;
    private final String bio;
    private final String profileImageUrl;
    private final Boolean notificationEnabled;
    private final String shareUrl;

    public static MyInfoResponse of(
            String userId,
            String email,
            String nickname,
            String bio,
            String profileImageUrl,
            Boolean notificationEnabled,
            String shareUrl
    ) {
        return new MyInfoResponse(userId, email, nickname, bio, profileImageUrl, notificationEnabled, shareUrl);
    }
}