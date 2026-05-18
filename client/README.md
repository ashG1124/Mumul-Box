# MuMul Box — 프런트엔드

익명 질문 서비스 **MuMul Box**의 프런트엔드입니다.

## 기술 스택

| 항목          | 버전 |
| ------------- | ---- |
| React         | 19   |
| Vite          | 8    |
| TypeScript    | 6    |
| Tailwind CSS  | 4    |
| React Router  | 7    |
| 패키지 매니저 | pnpm |

## 코드 품질 도구

| 도구        | 역할                     |
| ----------- | ------------------------ |
| ESLint      | 코드 정적 분석           |
| Prettier    | 코드 포맷 통일           |
| Husky       | Git 훅 관리              |
| lint-staged | 커밋 시 변경 파일만 검사 |

### 스크립트 alias

자주 쓰는 작업은 아래 alias로 바로 실행할 수 있습니다.

| 명령어              | 동작                                 |
| ------------------- | ------------------------------------ |
| `pnpm lint`         | ESLint 검사                          |
| `pnpm lint:fix`     | ESLint 검사 + 자동 수정              |
| `pnpm format`       | Prettier 포맷 전체 적용              |
| `pnpm format:check` | Prettier 포맷 검사만 (수정 없음)     |
| `pnpm check`        | `lint` + `format:check` 한 번에 실행 |

### ESLint — 정적 분석

```bash
pnpm lint        # 검사
pnpm lint:fix    # 검사 + 자동 수정
```

규칙은 `eslint.config.js`에서 관리합니다.  
`eslint-config-prettier`가 마지막에 적용되어 Prettier와 충돌하는 ESLint 포맷 규칙은 자동으로 비활성화됩니다.

### Prettier — 코드 포맷

```bash
pnpm format        # 전체 파일 포맷 적용 (파일 직접 수정)
pnpm format:check  # 포맷 검사만, 파일은 건드리지 않음
```

`format:check`는 파일을 수정하지 않고 **포맷이 규칙대로 되어 있는지만 검사**합니다.  
포맷이 맞지 않으면 어떤 파일이 문제인지 출력하고 종료 코드 1을 반환합니다.  
로컬에서는 `pnpm format`으로 바로 고치면 되고, `format:check`는 주로 CI에서 사용합니다.

포맷 규칙은 `.prettierrc`에서 관리합니다. 주요 설정은 아래와 같습니다.

| 항목          | 값               |
| ------------- | ---------------- |
| 최대 줄 길이  | 80               |
| 들여쓰기      | 스페이스 2칸     |
| 세미콜론      | 사용             |
| 문자열 따옴표 | 작은따옴표 (`'`) |
| JSX 따옴표    | 큰따옴표 (`"`)   |
| 후행 쉼표     | 모든 위치        |
| 줄 끝         | LF               |

### Husky + lint-staged — Git 훅

`pnpm install` 시 `prepare` 스크립트가 자동으로 Husky를 초기화합니다.  
커밋할 때마다 `pre-commit` 훅이 **스테이징된 파일에 한해** 아래 작업을 자동 실행합니다.

| 대상                      | 실행 명령                           |
| ------------------------- | ----------------------------------- |
| `*.ts`, `*.tsx`           | `eslint --fix` → `prettier --write` |
| `*.json`, `*.css`, `*.md` | `prettier --write`                  |

훅 설정 파일: `.husky/pre-commit`  
lint-staged 설정: `package.json`의 `"lint-staged"` 항목

> 훅을 임시로 건너뛰고 싶을 때는 `git commit --no-verify`를 사용할 수 있습니다.  
> 단, CI에서는 항상 검사가 실행되므로 push 전에 반드시 수정해야 합니다.

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

### 3. 개발 서버 실행

```bash
pnpm run dev
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

| 태그        | 용도                               |
| ----------- | ---------------------------------- |
| `feat:`     | 새 기능 추가                       |
| `fix:`      | 버그 수정                          |
| `refactor:` | 기능 변경 없는 코드 개선           |
| `style:`    | 포맷, 세미콜론 등 코드 외형만 변경 |
| `chore:`    | 빌드, 설정 파일 변경               |
| `docs:`     | 문서 수정                          |

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
