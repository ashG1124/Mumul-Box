# MuMul Box — 프런트엔드

익명 질문 서비스 **MuMul Box**의 프런트엔드입니다.

## 기술 스택

| 항목 | 버전 |
|---|---|
| React | 19 |
| Vite | 8 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| React Router | 7 |
| 패키지 매니저 | pnpm |

## 코드 품질 도구

| 도구 | 역할 |
|---|---|
| ESLint | 코드 정적 분석 |
| Prettier | 코드 포맷 통일 |
| Husky | Git 훅 관리 |
| lint-staged | 커밋 시 변경 파일만 검사 |

커밋할 때마다 `pre-commit` 훅이 자동으로 ESLint + Prettier를 실행합니다.

---

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/<your-org>/mumul-box.git
cd mumul-box/client
```

### 2. 패키지 설치

```bash
pnpm install
```

> `pnpm`이 없으면 먼저 설치: `npm install -g pnpm`

### 3. 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열어 값을 확인합니다.

| 변수 | 설명 | 기본값 |
|---|---|---|
| `VITE_API_BASE_URL` | Spring Boot API 서버 주소 | `http://localhost:8080` |

### 4. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

---

## GitHub 푸시 방법

```bash
# 변경 파일 확인
git status

# 스테이징
git add .

# 커밋 (pre-commit 훅이 자동으로 린트 + 포맷 실행)
git commit -m "feat: 커밋 메시지"

# 푸시
git push origin (branchname)
```

커밋 메시지는 해당 태그 뒤에 (fe)를 붙여서 작성합니다.

| 태그 | 용도 |
|---|---|
| `feat:` | 새 기능 추가 |
| `fix:` | 버그 수정 |
| `refactor:` | 기능 변경 없는 코드 개선 |
| `style:` | 포맷, 세미콜론 등 코드 외형만 변경 |
| `chore:` | 빌드, 설정 파일 변경 |
| `docs:` | 문서 수정 |

---

## 폴더 구조

```
src/
├── pages/        # 라우트 단위 페이지 컴포넌트
├── components/   # 공유 UI 컴포넌트 (버튼, 모달, 네비게이션 등)
├── features/     # 도메인별 api / hooks / types
│   ├── auth/       로그인, 회원가입
│   ├── question/   익명 질문 전송, 조회
│   └── answer/     답변 작성, 조회
├── hooks/        # 범용 커스텀 훅 (useDebounce 등)
├── lib/          # fetch 래퍼, 유틸 함수
└── styles/       # 추가 전역 스타일 (필요 시)
```
