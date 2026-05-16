package com.mumulbox.server.domain.sample.controller;

import com.mumulbox.server.domain.sample.dto.SampleRequest;
import com.mumulbox.server.domain.sample.dto.SampleResponse;
import com.mumulbox.server.domain.sample.service.SampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/samples")
@RequiredArgsConstructor
public class SampleController {

    private final SampleService sampleService;

    // 1. 데이터 등록 엔드포인트
    @PostMapping
    public ResponseEntity<Long> create(@RequestBody SampleRequest request) {
        Long createdId = sampleService.createSample(request);
        return ResponseEntity.ok(createdId);
    }

    // 2. 데이터 단건 조회 엔드포인트
    @GetMapping("/{id}")
    public ResponseEntity<SampleResponse> getOne(@PathVariable Long id) {
        SampleResponse response = sampleService.getSample(id);
        return ResponseEntity.ok(response);
    }
}
