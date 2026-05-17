package com.mumulbox.server.domain.sample.dto;

import com.mumulbox.server.domain.sample.entity.SampleEntity;
import lombok.Getter;

@Getter
public class SampleResponse {
    private final Long id;
    private final String title;
    private final String content;

    // 엔티티를 받아 DTO로 변환하는 생성자
    public SampleResponse(SampleEntity sample) {
        this.id = sample.getId();
        this.title = sample.getTitle();
        this.content = sample.getContent();
    }
}