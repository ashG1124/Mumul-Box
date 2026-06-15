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

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/{userId}/questions")
    public ResponseEntity<QuestionResponse> sendQuestion(
            @PathVariable("userId") String receiverId,
            @Valid @RequestBody QuestionRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String senderID = userDetails.getUsername();

        QuestionResponse response = questionService.sendQuestion(receiverId, senderID, request);
        return ResponseEntity.ok(response);
    }
}
