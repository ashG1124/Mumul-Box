package com.mumulbox.server.domain.sample.service;

import com.mumulbox.server.domain.sample.dto.SampleRequest;
import com.mumulbox.server.domain.sample.dto.SampleResponse;
import com.mumulbox.server.domain.sample.entity.SampleEntity;
import com.mumulbox.server.domain.sample.repository.SampleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor // final이 붙은 멤버변수의 생성자를 자동으로 생성 (생성자 주입)
@Transactional(readOnly = true) // 읽기 작업 전용 트랜잭션으로 기본 설정 (성능 최적화)
public class SampleService {

    private final SampleRepository sampleRepository;

    // 1. 등록 기능
    @Transactional // 쓰기 작업이 있으므로 별도 선언
    public Long createSample(SampleRequest request) {
        SampleEntity sample = SampleEntity.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .build();

        return sampleRepository.save(sample).getId();
    }

    // 2. 단건 조회 기능
    public SampleResponse getSample(Long id) {
        SampleEntity sample = sampleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 데이터가 존재하지 않습니다. id=" + id));

        return new SampleResponse(sample);
    }
}
