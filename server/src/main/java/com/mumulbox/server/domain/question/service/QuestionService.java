package com.mumulbox.server.domain.question.service;

import com.mumulbox.server.domain.question.dto.QuestionRequest;
import com.mumulbox.server.domain.question.dto.QuestionResponse;
import com.mumulbox.server.domain.question.entity.Question;
import com.mumulbox.server.domain.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Transactional
    public QuestionResponse sendQuestion(String receiverId, String senderId, QuestionRequest request) {
        // 1. DTO 데이터를 바탕으로 엔티티 생성
        Question question = Question.builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .content(request.getContent())
                .isAnonymous(request.getIsAnonymous())
                .build();

        // 2. DB에 저장
        Question savedQuestion = questionRepository.save(question);

        // 3. 응답용 DTO로 변환하여 반환
        return new QuestionResponse(savedQuestion);
    }
}