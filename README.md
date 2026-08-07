# Mumul BOx

관심 있는 유저를 검색해 익명 질문을 남기거나, 로그인 없이 공개된 답변 피드를 둘러보세요.

---

## ⚠️ Notice
* 모든 작업 하기 전에 `git pull dev` 꼭 합시다.
* 제발 디렉토리 경로 잘 보세요. 특히 처음에 깃 클론할 때 파일 경로 잘 봐주세요. (경로랑 터미널 안 꼬이게)
* 머지할 때 base: dev 인 거 확인해주세요. (제발 main에 머지하지 말아주세요.)

## 📂 Project Structure

```text
.
├── client/                 # [FE] React + Tailwind CSS
│   ├── Dockerfile          # 프론트엔드 빌드 레시피
│   └── ...
├── server/                 # [BE] Spring Boot
│   ├── Dockerfile          # 백엔드 빌드 레시피
│   └── ...
├── shared/                 # [Shared] 공통 자원 및 설정\
│   ├── mock/               # 예시 데이터들
│   ├── Swagger.yaml        # API 명세
│   └── ...
├── docker-compose.yml      # 전체 서비스 오케스트레이션 (Root 위치)
├── .github/                # CI/CD (GitHub Actions)
└── README.md

```

세부 구조는 각 파트별로 만들어주세요. (각 파트별로 readme.md도 만들어주세요)

---

## 🛠 Tech Stack

| Category | Technology |
| --- | --- |
| **Frontend** | React, Tailwind CSS, TypeScript |
| **Backend** | Spring Boot, Spring Data JPA, MySQL |
| **DevOps** | Docker, Docker Compose, AWS (EC2/ECS/App Runner) |
| **Language** | Java 17+, TypeScript |

---

## ⚙️ Getting Started

### 1. Prerequisites

프로젝트 실행을 위해 아래 도구들이 설치되어 있어야 합니다. (본인들이 사용하는 버전으로 수정하세요.)

* Docker & Docker Compose
* Node.js (v18+)
* JDK 17+

### 2. Local Development (Docker)

별도의 설치 없이 도커를 통해 전체 환경을 즉시 실행할 수 있습니다.

```bash
# 전체 서비스 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d

# 서비스 종료
docker-compose down

```

### 3. Manual Run (Optional)

특정 파트만 개별적으로 수정하고 실행할 경우:

* **FE**: `cd client && pnpm install && pnpm run dev`
* **BE**: `cd server && ./gradlew bootRun`

---

## 🤝 Project Conventions

### 1. Commit Message Convention

`type(scope): subject` 형식을 따르며, 작업 영역을 명확히 구분합니다.

* **Type**: `feat`, `fix`, `refactor`, `docs`, `chore`, `style`
* **Scope**: `fe` (Frontend), `be` (Backend), `common` (Infra/Config)

> **Examples:**
> * `feat(fe): Tailwind 기반 공통 버튼 컴포넌트 추가`
> * `fix(be): 유저 회원가입 시 중복 검사 로직 수정`
> * `chore(common): Dockerfile 베이스 이미지 버전 업데이트`
> 
> 

### 2. Naming Convention

* **Frontend**:
* Components: `PascalCase` (`HeaderContainer.tsx`)
* Directories/Files: `kebab-case` (`user-profile/`)


* **Backend**:
* Classes: `PascalCase` (`UserService.java`)
* Methods/Variables: `camelCase` (`getUserById`)


* **API Response**: BE와 FE 간의 JSON 데이터는 `camelCase`로 통일합니다.

---

## 🐋 Docker & Deployment

### 1. Docker Multi-stage Build

각 디렉토리의 `Dockerfile`은 최적화된 이미지를 위해 멀티 스테이지 빌드를 사용합니다.

* **FE**: 빌드 후 Nginx를 통해 정적 파일 서빙
* **BE**: Gradle 빌드 후 JRE 환경에서 JAR 실행

### 2. AWS Deployment

이 프로젝트는 Docker 이미지를 기반으로 AWS에 배포됩니다.

1. **CI**: GitHub Actions가 코드를 빌드하고 테스트합니다.
2. **CD**: 빌드된 이미지를 **Amazon ECR**에 푸시합니다.
3. **Deploy**: **AWS ECS(Fargate)** 또는 **App Runner**를 통해 컨테이너를 실행합니다.

---

## 📜 Shared Rules & Rules of Conduct

1. **API Spec**: 모든 API 변경 사항은 [Swagger/Postman]에 즉시 반영합니다.
2. **Environment Variables**:
* `.env.example` 파일을 공유하며, 실제 기밀 정보는 `.env`에 로컬 관리합니다.
* AWS 배포 시에는 AWS Secrets Manager 또는 Parameter Store를 활용합니다.


3. **PR Policy**:\
* 팀장이랑 각 파트에 해당하는 사람 리뷰어로 등록해서 PR 날려주세요.
* 모든 코드는 최소 1명 이상의 리뷰어로부터 승인을 받아야 `dev`에 머지할 수 있습니다. **(코드 리뷰 꼭하기^^)**
* CI 빌드 및 테스트 통과는 필수입니다.


---