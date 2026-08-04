# ---- Build Stage ----
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

# 의존성 파일만 먼저 복사 → 소스만 바뀌면 install 레이어는 캐시 재사용
COPY package.json pnpm-lock.yaml ./
# prepare(husky)는 .git이 없는 빌드 환경에서 불필요하므로 건너뛴다
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm build

# ---- Run Stage ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
