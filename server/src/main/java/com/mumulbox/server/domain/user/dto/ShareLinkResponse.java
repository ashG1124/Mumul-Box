package com.mumulbox.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ShareLinkResponse {

    private final String userId;
    private final String shareUrl;

    public static ShareLinkResponse of(String userId, String shareUrl) {
        return new ShareLinkResponse(userId, shareUrl);
    }
}