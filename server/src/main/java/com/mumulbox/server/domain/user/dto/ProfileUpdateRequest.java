package com.mumulbox.server.domain.user.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProfileUpdateRequest {

    @Size(min = 2, max = 20, message = "닉네임은 2~20자여야 합니다.")
    private String nickname;

    @Size(max = 255, message = "소개글은 255자 이하여야 합니다.")
    private String bio;

    private String profileImageUrl;
}