package com.mumulbox.server.domain.sample.repository;

import com.mumulbox.server.domain.sample.entity.SampleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SampleRepository extends JpaRepository<SampleEntity, Long> {
    // 뼈대 인터페이스이므로 기본 CRUD 메서드는 자동으로 제공됩니다.
    // 필요 시 findByTitleContaining() 같은 메서드를 추가합니다.
}
