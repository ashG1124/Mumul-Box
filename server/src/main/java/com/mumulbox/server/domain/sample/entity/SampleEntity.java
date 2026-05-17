package com.mumulbox.server.domain.sample.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "samples") // MySQL 예약어 방지를 위해 테이블명은 복수형 권장
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 지연로딩을 위한 기본 생성자
public class SampleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp //
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder // 엔티티 생성을 안전하게 하기 위한 빌더 패턴
    public SampleEntity(String title, String content) {
        this.title = title;
        this.content = content;
    }

    // 비즈니스 로직에 따른 데이터 수정(수정 메서드는 엔티티 내부에 작성)
    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
