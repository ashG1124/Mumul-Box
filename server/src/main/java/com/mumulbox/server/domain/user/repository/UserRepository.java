package com.mumulbox.server.domain.user.repository;

import com.mumulbox.server.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    // 이메일(userId)로 유저 찾기
    Optional<User> findByUserId(String userId);

    // 닉네임으로 유저 찾기
    Optional<User> findByNickname(String nickname);

    // 공유 토큰으로 유저 찾기 (공유 링크 접속 시)
    Optional<User> findByShareToken(String shareToken);

    // 이메일 중복 확인
    boolean existsByUserId(String userId);

    // 닉네임 중복 확인
    boolean existsByNickname(String nickname);

    // 유저 검색 (닉네임 또는 userId로 검색)
    @Query("SELECT u FROM User u WHERE " +
            "u.status = com.mumulbox.server.domain.user.entity.UserStatus.ACTIVE AND " +
            "(LOWER(u.nickname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.userId) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<User> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}