package com.mumulbox.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationSettingResponse {

    private final String userId;
    private final Boolean isEnabled;

    public static NotificationSettingResponse of(String userId, Boolean isEnabled) {
        return new NotificationSettingResponse(userId, isEnabled);
    }
}