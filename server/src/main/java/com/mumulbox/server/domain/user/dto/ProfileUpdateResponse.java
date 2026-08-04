package com.mumulbox.server.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProfileUpdateResponse {

    private final String userId;
    private final String nickname;
    private final String bio;
    private final String profileImageUrl;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private final LocalDateTime updatedAt;

    public static ProfileUpdateResponse of(
            String userId,
            String nickname,
            String bio,
            String profileImageUrl,
            LocalDateTime updatedAt
    ) {
        return new ProfileUpdateResponse(userId, nickname, bio, profileImageUrl, updatedAt);
    }
}