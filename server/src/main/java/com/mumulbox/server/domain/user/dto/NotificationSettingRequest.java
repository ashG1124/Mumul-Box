package com.mumulbox.server.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NotificationSettingRequest {

    @NotNull(message = "알림 설정 값은 필수입니다.")
    private Boolean isEnabled;
}