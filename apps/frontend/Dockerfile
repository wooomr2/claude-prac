# Stage 1: Build
FROM node:20-alpine AS builder

RUN npm install -g pnpm turbo

WORKDIR /app

# 워크스페이스 설정 파일 복사
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

# 각 패키지의 package.json만 먼저 복사 (레이어 캐싱)
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/shared/package.json ./packages/shared/

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY apps/frontend/ ./apps/frontend/
COPY packages/shared/ ./packages/shared/

# shared 빌드 후 frontend 빌드
RUN turbo build --filter=@repo/frontend

# Stage 2: Serve with nginx
FROM nginx:1.27-alpine

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
