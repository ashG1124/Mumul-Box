# MuMul Box (무물박스 / SecretAsk) — Copilot Instructions

> 이 파일은 GitHub Copilot Chat / Workspace가 프로젝트 맥락을 자동으로 읽도록 두는 표준 위치 파일입니다.
> 코드 제안 시 아래 규칙을 **반드시** 따르세요. 규칙과 충돌하는 흔한 패턴(좋아요, 카테고리 등)은 **금지** 섹션에 명시돼 있습니다.

---

## 1. 프로젝트 한 줄 요약

**MuMul Box** — 닉네임으로 검색한 다른 유저에게 **익명으로 질문을 보내고 답변을 받는** 웹 서비스. 답변자는 자신의 질문함을 운영하고, 받은 익명 질문에 답하거나 거절(=신고)할 수 있다.

목적은 **학습 & 포트폴리오**. 실제 런칭이 아니라 풀스택 + 클린 코드 + 보안 학습이 핵심.

---

## 2. 기술 스택 (변경 금지)

| 레이어 | 스택 | 비고 |
|---|---|---|
| Frontend | **React 19 + Vite + Tailwind CSS** | (또는 Next.js 14 App Router) |
| Polyfill 폰트 | **Pretendard (CDN)** | `'Pretendard', system-ui` |
| Backend | **Spring Boot 3 (Java 17+)** | Gradle |
| ORM | **JPA / Hibernate** (프로젝트 기획서의 "JSP"는 JPA 오기) | |
| DB | **MySQL 8** | UTF-8MB4 |
| Auth | **JWT (Access) + Refresh Token (HttpOnly Cookie)** | |
| Infra | **Docker** + **AWS (EC2 / RDS / S3)** | |
| CI/CD | **GitHub Actions** | |

> Spring Security, Spring Data JPA, springdoc-openapi(Swagger UI), validation, Lombok 사용. 그 외 라이브러리는 **반드시 이유를 설명한 후** 제안할 것.

---

## 3. 폴더 구조 (제안)

```
mumul-box/
├── frontend/                 # React + Vite + Tailwind
│   ├── public/
│   └── src/
│       ├── pages/            # 라우트 단위 페이지 컴포넌트
│       ├── components/       # 공유 UI 컴포넌트 (Modal, Card, Avatar...)
│       ├── features/         # 도메인별 폴더 (auth, question, answer, admin)
│       │   └── question/
│       │       ├── api.ts
│       │       ├── hooks.ts
│       │       └── types.ts
│       ├── hooks/            # 범용 hook (useDebounce, useToast...)
│       ├── lib/              # fetch wrapper, 유틸
│       └── styles/
├── backend/                  # Spring Boot
│   └── src/main/java/com/mumulbox/
│       ├── auth/             # 인증·인가
│       ├── user/             # 유저 도메인
│       ├── question/         # 질문 (+ 익명 발신 처리)
│       ├── answer/
│       ├── report/           # 신고·거절 사유
│       ├── admin/
│       ├── moderation/       # 차단 키워드·Rate Limit·Anti-abuse
│       └── common/           # 글로벌 예외, DTO base, util
├── docker/
├── .github/workflows/
└── docs/                     # ADR, ERD, API 명세 보강
```

도메인 패키지 안에는 `controller / service / repository / dto / entity` 5개 클래스/하위패키지를 두는 **레이어드 + 패키지-바이-피처** 혼합 구조.

---

## 4. 핵심 디자인 원칙 (절대 무시 금지)

### 4-1. 익명성이 최우선
- 질문에는 **발신자 ID·이메일·IP를 절대 저장하지 않는다.**
- 어뷰징 추적용으로만 `anon_hash = HMAC(secret, ip + userAgent + date)` 같은 비가역 해시 1개를 둔다.
- API 응답 DTO에는 `email`, `phone`, `ip`, `senderId` 같은 필드를 **절대 노출하지 않는다.** `User` 엔티티와 `UserSearchDto / UserPublicDto`를 분리할 것.

### 4-2. 미니멀 — 사회적 신호 제거
이 서비스는 의도적으로 다음 기능을 **모두 빼고 출발했다.** 임의로 다시 넣지 말 것.
- ❌ 좋아요(♡) / 추천
- ❌ 댓글
- ❌ 카테고리 / 태그
- ❌ 인기순 정렬 / 인기 피드
- ❌ 답변 북마크·저장(MVP 범위 외)
- ❌ 일반 사용자용 필터 UI (※ 운영자 모더레이션 필터는 다름)

기본 정렬은 **`created_at DESC` 한 종류만.** 검색은 닉네임 LIKE + `last_active_at DESC` 보조.

### 4-3. 클린 코드 + 이유 설명
- 새 라이브러리·아키텍처 패턴을 제안할 때는 **왜 이걸 쓰는지 한 줄 이상 설명**을 코드 주석 또는 PR 설명에 포함할 것.
- 매직 넘버 금지. 상수는 `application.yml` 또는 `Constants` 클래스로.
- 한국어 도메인 용어는 변수명을 영어로 매핑해 두되, 주석으로 한국어 의미를 남길 것 (예: `// 무물 = anonymous question`).

---

## 5. 도메인 모델 (확정)

### 5-1. Entity (Spring/JPA)

```java
// User
class User {
  Long id;
  String slug;              // 공유 URL용 (예: starlight-anonymous-2026) — 재생성 가능
  String nickname;          // 표시용 (최대 12자)
  String bio;               // 최대 100자
  String passwordHash;      // BCrypt
  String emailHash;         // 이메일을 직접 저장하지 말고 해시. 비밀번호 찾기는 별도 흐름
  Visibility visibility;    // PUBLIC | LINK_ONLY
  boolean acceptingQuestions; // OFF면 신규 질문 접수 중지
  LocalDateTime lastActiveAt;
  LocalDateTime createdAt;
}

// Question — 익명 발신
class Question {
  Long id;
  Long recipientUserId;     // 받는 사람
  String body;              // 최대 500자
  boolean isAnonymous;      // 기본 true
  String anonHash;          // HMAC(secret, ip+ua+date). 추적 X, 같은 날 같은 사용자 매칭만
  QuestionStatus status;    // PENDING | ANSWERED | REJECTED | HIDDEN
  LocalDateTime createdAt;
  // ※ senderId / senderIp 같은 컬럼 절대 추가 금지
}

// Answer
class Answer {
  Long id;
  Long questionId;          // 1:1
  String body;              // 최대 2000자
  AnswerVisibility visibility; // PUBLIC | LINK_ONLY | PRIVATE
  LocalDateTime createdAt;
  LocalDateTime updatedAt;
}

// Report — 거절 사유 + 모더레이션 신고를 통합
class Report {
  Long id;
  TargetType targetType;    // QUESTION | ANSWER
  Long targetId;
  RejectReason reason;      // ABUSE | SPAM | PRIVACY | HATE | DECLINE | ETC
  String detail;            // 선택 사유 텍스트, 최대 500자
  Long reporterUserId;      // 신고자 (= 보통 질문함 주인). DECLINE 사유일 땐 reporter만 있고 운영자 알림 X
  Source source;            // USER | AUTO_FILTER
  ReportStatus status;      // PENDING | REVIEWING | RESOLVED
  LocalDateTime createdAt;
  LocalDateTime resolvedAt;
}

// BlockedKeyword — 운영자 차단 키워드 사전
class BlockedKeyword {
  Long id;
  String keyword;
  Severity severity;        // BLOCK | FLAG
  Long createdByAdminId;
  LocalDateTime createdAt;
}
```

### 5-2. Enum 매핑 (UI ↔ Backend)

| UI 라벨 | Enum |
|---|---|
| 욕설/비속어 | `RejectReason.ABUSE` |
| 스팸/홍보 | `RejectReason.SPAM` |
| 개인정보 노출 | `RejectReason.PRIVACY` |
| 혐오/차별 | `RejectReason.HATE` |
| 단순 거절 (답변하지 않음) | `RejectReason.DECLINE` |
| 기타 | `RejectReason.ETC` |

`DECLINE` 이외의 사유는 자동으로 `Report` 생성 → 운영자 큐로 들어간다. `DECLINE`은 `Question.status = REJECTED`만 변경, `Report` 생성하지 않는다.

---

## 6. API 명세 (REST)

기본 prefix: `/api`, 응답은 모두 JSON, 에러는 RFC 7807 (Problem Details) 권장.

```http
# 인증
POST   /api/auth/signup
POST   /api/auth/login              # 응답: access_token (헤더), refresh (HttpOnly)
POST   /api/auth/refresh
POST   /api/auth/logout

# 유저
GET    /api/users?q={kw}&page={n}   # 닉네임 검색
GET    /api/users/{slug}            # 공개 프로필 + 통계(답변 완료 수만)
GET    /api/users/{slug}/answers?page={n}   # 공개 답변 페이지네이션
PATCH  /api/me                      # 프로필 수정
POST   /api/me/slug/regenerate      # 공유 링크 재생성

# 질문 (익명 발신)
POST   /api/users/{slug}/questions  # body: { body, isAnonymous? }
GET    /api/me/inbox?status=PENDING&page={n}

# 답변
POST   /api/questions/{id}/answer   # body: { body, visibility }
GET    /api/questions/{id}          # 본인 또는 공개 질문 조회

# 거절 + 신고 통합 엔드포인트
POST   /api/questions/{id}/reject   # body: { reason: RejectReason, detail? }
                                    # reason != DECLINE 이면 Report 자동 생성

# 운영자
GET    /api/admin/stats             # KPI + 7일 추이
GET    /api/admin/reports?status=
PATCH  /api/admin/reports/{id}      # status 변경, target 숨김 처리
GET    /api/admin/users?riskOnly=true
PATCH  /api/admin/users/{id}        # 정지/해제
GET    /api/admin/filters/keywords
PUT    /api/admin/filters/keywords  # 일괄 갱신
```

### 응답 DTO 규칙
- `User`를 그대로 직렬화하지 말 것. **반드시 DTO 변환:**
  - `UserPublicDto` — 검색·프로필용 (`id, slug, nickname, bio, answeredCount, lastActiveAt`)
  - `UserMeDto` — 본인 정보 (`emailMasked, settings...`)
  - `UserAdminDto` — 운영자 전용 (`anonHashCount, reportCount`)
- 페이지네이션 응답: `{ items: [...], page, size, total }` 형식 통일.

---

## 7. 보안 / 익명성 / 모더레이션

### 7-1. 익명 질문 발신 시
- 클라이언트 → 서버: 인증 토큰 없이도 가능 (로그인 안 한 익명 유저도 질문 가능). Rate Limit으로 어뷰징 방지.
- 서버에서 받은 즉시:
  1. 키워드 차단 사전(`BlockedKeyword`) 매칭 → `severity=BLOCK`이면 400 응답, `FLAG`이면 저장 후 자동 `Report` 생성
  2. `anon_hash = HMAC(SECRET, ip + ua + yyyymmdd)` 계산. **DB에는 hash만 저장, raw 값은 메모리에서 즉시 폐기.**
  3. `Question` insert (senderId 컬럼 없음)
- HTML escape는 서버에서 무조건. 추가로 클라이언트에서도 `dangerouslySetInnerHTML` 사용 금지.

### 7-2. Rate Limit (모더레이션)
- 익명 질문 발송: 같은 IP 기준 **1분 10건 / 1시간 100건** 초과 시 임시 차단
- 닉네임 검색: 1분 60회 / 1시간 600회
- 신고 접수: 1분 5건
- 구현은 `Bucket4j` 또는 Redis 기반 token bucket 권장.

### 7-3. 자동 처리 규칙
- 같은 게시글에 신고 5건 누적 → 자동으로 `status = HIDDEN`으로 전환 (운영자 알림)
- 같은 `anon_hash`가 24시간 내 3건 이상 `REJECTED(reason=ABUSE)` → 자동 임시 차단 큐

### 7-4. SQL 안전
- 닉네임 검색은 LIKE 사용 시 `%`, `_` **반드시 escape.**
- JPA `@Query`에서 동적 검색 조건은 QueryDSL 또는 Specification 사용. 문자열 concat 금지.

---

## 8. UI / 디자인 시스템

### 8-1. 디자인 토큰 (CSS Variables → Tailwind 토큰으로 매핑)

`./design/01-home-logged.html` 또는 `design-system.html`을 **반드시 참고.** 색상 변수:

```css
--p-50:#F4F0FE; --p-100:#E8DFFE; --p-200:#D0BEFD; --p-300:#B89BFC;
--p-400:#A07BF9; --p-500:#8961F4;   /* Brand */
--p-600:#6E4FEA; --p-700:#5538C8;
--grad-main:   linear-gradient(135deg,#A07BF9 0%,#6E4FEA 100%);
--grad-bright: linear-gradient(135deg,#C9B6FF 0%,#8961F4 100%);
--grad-pink:   linear-gradient(135deg,#FF9FE0 0%,#B570F4 100%);

--bg:#F7F5FB; --surface:#FFFFFF;
--t-strong:#0E0E1A; --t-body:#1F1F2E; --t-muted:#6B6B7E; --t-soft:#9A9AAB;
--b-1:#EEEAF5; --b-2:#DCD3EB; --b-3:#C8BEDD;
--danger:#FF5A6E; --success:#22C29A; --warning:#FFB547;

--r-sm:10px; --r-md:14px; --r-lg:20px; --r-xl:28px; --r-full:999px;
--shadow-brand:0 14px 32px rgba(110,79,234,0.28);
```

Tailwind `theme.extend.colors`에 1:1로 노출 (`primary.500` 등) — `tailwind.config.ts`에서 한 곳에 정의.

### 8-2. 컴포넌트 패턴 (반드시 따를 것)
- **GNB(상단 네비)** — 80px 높이, sticky, 로고 + 검색바(form action=search) + 내 질문함 + 알림 + 아바타 + 로그아웃
- **카드 hover** — `transform:translateY(-2px); border-color:var(--p-400);` (브랜드 hover)
- **Modal** — 거절/공유 등 파괴적/중요 액션은 모달로. 닫기 경로 4종(오버레이 클릭 / X 버튼 / Esc / 취소 버튼) 모두 구현.
- **Toast** — 일반 피드백. 모달과 혼용하지 말 것.
- **Tab** — 같은 데이터를 상태별로 보는 화면(미답변/답변완료/신고됨)에만. 정렬·필터에 쓰지 않을 것.
- **Empty state** — 모든 리스트 페이지에 빈 상태 UI를 반드시 구현.

### 8-3. 접근성
- 모든 인터랙티브 요소에 `aria-label` 또는 가시 텍스트.
- 폼은 `<label>` 연결 필수.
- Modal: `role="dialog"`, `aria-modal="true"`, Esc 닫기, focus trap.
- 색만으로 의미 전달 금지(상태 배지엔 텍스트 라벨 반드시 함께).

---

## 9. 코딩 컨벤션

### 9-1. 공통
- 변수·함수: 영어 `camelCase`. 클래스·타입: `PascalCase`. 상수: `UPPER_SNAKE`.
- 한국어 도메인 용어 매핑:
  - 무물 / 익명 질문 → `anonymousQuestion` (또는 그냥 `question`)
  - 질문함 → `questionBox` / `inbox`
  - 거절 → `reject`
  - 신고 → `report`

### 9-2. Frontend (React + TS)
- 함수형 컴포넌트만. Class 컴포넌트 금지.
- 상태는 가능한 한 컴포넌트에 가깝게 배치. 전역 store(zustand/redux)는 `auth` 만으로 한정.
- 데이터 fetch: `@tanstack/react-query`. fetch 결과를 직접 useState에 담지 말 것.
- 페이지 컴포넌트는 *얇게* 유지(라우팅 매개변수 → feature 컴포넌트에 전달).
- 폼 검증: `react-hook-form` + `zod` 스키마. 같은 스키마를 서버 DTO와 공유하기 위해 `schemas/` 폴더 분리.

### 9-3. Backend (Spring Boot)
- DTO에 `@Valid` 적용, 글로벌 `@RestControllerAdvice`로 예외 → 일관된 Problem Detail 응답.
- 트랜잭션은 service 레이어에서만 `@Transactional`. controller, repository는 트랜잭션 어노테이션 금지.
- N+1 회피: 컬렉션 조회는 `@EntityGraph` 또는 fetch join.
- 응답 시간 측정: `@Timed` (Micrometer) — 모든 controller 메서드.
- 비밀번호: BCrypt(strength 12).
- 시크릿: `application.yml`이 아닌 환경변수 또는 AWS Parameter Store.

### 9-4. 커밋 메시지
Conventional Commits:
```
feat(question): add reject endpoint with reason enum
fix(security): escape LIKE wildcards in user search
refactor(inbox): extract tab panel into TabView component
docs(api): update OpenAPI spec for /reports
```

---

## 10. 금지된 패턴 (자주 실수하는 항목)

| 금지 | 이유 |
|---|---|
| 좋아요/♡/like 컬럼·필드·UI 추가 | Phase 3에서 제거. 익명성과 충돌 |
| 댓글(comment) 도입 | 동일 이유. 모더레이션 부담 폭증 |
| Question에 `senderId` / `senderEmail` / `senderIp` 컬럼 | 익명성 위반 |
| 카테고리/태그 enum 또는 컬럼 | Phase 5에서 제거. 단일 정렬·검색만 |
| 인기순/조회수 기반 정렬 | Phase 6에서 제거 |
| `DELETE` 물리 삭제 (운영자 batch 제외) | soft delete (`status` 전이)로 충분 |
| 응답 DTO에 비공개 필드 직접 노출 | `User` → `UserPublicDto` 변환 강제 |
| `application.yml`에 시크릿 평문 | ENV/Secret Manager |
| `eval`, `dangerouslySetInnerHTML` | XSS |
| 매직 넘버 (예: `if (count > 5)` 같은 비교) | 상수화 |

---

## 11. 참고 파일

| 파일 | 용도 |
|---|---|
| `design/01-home-logged.html` | GNB·hero·카드 디자인 기준 |
| `design/02-qbox.html` | 다른 유저 질문함 + 거절/신고 모달 UI 기준 |
| `design/03-inbox.html` | 내 질문함 + 탭 + 신고됨 패널 |
| `design/04-mypage.html` | 마이페이지(프로필·알림·설정) |
| `design/05-admin.html` | 운영자 대시보드(KPI·테이블·필터링 룰) |
| `design/06-search.html` | 유저 검색 결과 |
| `design/07-answers.html` | 전체 답변 목록 |
| `design/design-system.html` | 색·타이포·간격·shadow 토큰 |
| `tasks/작업요약.md` | 의사결정 히스토리 (Phase 1~8) |
| `docs/db-design.md` | DB 설계 초안 |
| `app-icon/app-icon.svg` | 앱·파비콘 원본 SVG |

> 의사 결정 배경이 궁금하면 `tasks/작업요약.md`의 **Phase** 섹션을 먼저 읽을 것.

---

## 12. Copilot에게 부탁하는 응답 스타일

1. **새 코드를 짤 때**: 위 11개 섹션을 위반하지 않는지 self-check.
2. **라이브러리 제안 시**: 이유 한 줄 + 대안 1개 비교를 함께 제시.
3. **잘 모르겠는 결정**: 추정하지 말고 "확인이 필요합니다 — A안 vs B안"으로 명시.
4. **한국어로 답변** — 사용자가 한국어로 질문하면 한국어로. 코드 주석은 한국어 OK, 변수·함수명은 영어.
5. **익명성 관련 코드**: 의심스러운 부분에 반드시 한국어 주석으로 "// 익명성 — senderId 저장 금지" 같은 가드 표시.

---

_Last updated: 2026-05-13 · Phase 8 반영 (답변 거절 = 신고 모달 통합)_
