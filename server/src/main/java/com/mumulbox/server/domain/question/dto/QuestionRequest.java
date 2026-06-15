package com.mumulbox.server.domain.question.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuestionRequest {

    @NotBlank(message = "질문 내용을 입력해주세요.")
    private String content;

    @NotNull(message = "익명 여부를 선택해주세요.")
    private Boolean isAnonymous;
}
