package com.mumulbox.server.domain.question.dto;
import com.mumulbox.server.domain.question.entity.Question;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class QuestionResponse {
    private final Long questionId;
    private final Boolean isAnonymous;
    private final LocalDateTime createdAt;

    public QuestionResponse(Question question) {
        this.questionId = question.getId();
        this.isAnonymous = question.getIsAnonymous();
        this.createdAt = question.getCreatedAt();
    }
}