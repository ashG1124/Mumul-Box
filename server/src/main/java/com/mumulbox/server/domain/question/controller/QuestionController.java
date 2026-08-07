package com.mumulbox.server.domain.question.controller;

import com.mumulbox.server.domain.question.dto.QuestionRequest;
import com.mumulbox.server.domain.question.dto.QuestionResponse;
import com.mumulbox.server.domain.question.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.constraints.Email;
import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Validated
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/{userId}/questions")
    public ResponseEntity<QuestionResponse> sendQuestion(
            @PathVariable("userId") @Email(message = "수신자 ID는 유효한 이메일 형식이어야 합니다.") String receiverId,
            @Valid @RequestBody QuestionRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String senderId = userDetails.getUsername();

        QuestionResponse response = questionService.sendQuestion(receiverId, senderId, request);
        return ResponseEntity.ok(response);
    }
}
