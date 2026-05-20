package com.mumulbox.server.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터 체인을 활성화
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // REST API 서버는 기본적으로 CSRF를 비활성화합니다.
                .csrf(csrf -> csrf.disable())

                // HTTP 요청에 대한 권한 설정
                .authorizeHttpRequests(auth -> auth
                        // 스웨거 UI 및 API 문서 관련 경로는 모두 접근 허용 (비로그인 허용)
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // 개발 초기 단계이므로 나머지 모든 API도 일단 통과시켜 줍니다.
                        // (나중에 JWT 로그인 기능을 본격적으로 붙일 때 권한을 제어하면 됩니다!)
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
