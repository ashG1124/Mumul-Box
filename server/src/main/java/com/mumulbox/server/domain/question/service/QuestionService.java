package com.mumulbox.server.domain.question.service;

import com.mumulbox.server.domain.question.dto.QuestionRequest;
import com.mumulbox.server.domain.question.dto.QuestionResponse;
import com.mumulbox.server.domain.question.entity.Question;
import com.mumulbox.server.domain.question.repository.QuestionRepository;
import com.mumulbox.server.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Transactional
    public QuestionResponse sendQuestion(String receiverId, String senderId, QuestionRequest request) {

        // 1. 수신자가 DB에 존재하는지 검증
        if (!userRepository.existsById(receiverId)) {
            throw new IllegalArgumentException("존재하지 않는 유저입니다.");
        }

        // 2. 자신에게하는 질문 방지
        if (senderId.equals(receiverId)) {
            throw new IllegalArgumentException("자신에게 질문을 보낼 수 없습니다.");
        }
        // 3. DTO 데이터를 바탕으로 엔티티 생성
        Question question = Question.builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .content(request.getContent())
                .isAnonymous(request.getIsAnonymous())
                .build();

        // 4. DB에 저장
        Question savedQuestion = questionRepository.save(question);

        // 5. 응답용 DTO로 변환하여 반환
        return new QuestionResponse(savedQuestion);
    }
}