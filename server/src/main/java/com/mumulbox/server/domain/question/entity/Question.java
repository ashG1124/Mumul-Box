package com.mumulbox.server.domain.question.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String senderId; // 질문을 보내는 사람 (내부 기록용)

    @Column(nullable = false)
    private String receiverId; // 질문을 받는 사람

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private Boolean isAnonymous; // 익명 여부 (true: 익명, false: 실명)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Question(String senderId, String receiverId, String content, Boolean isAnonymous) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.isAnonymous = isAnonymous;
        this.status = QuestionStatus.PENDING; // 처음 생성될 때는 무조건 대기 상태
    }
}