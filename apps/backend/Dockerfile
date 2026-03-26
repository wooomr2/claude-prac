# Stage 1: Build
FROM node:20-alpine AS builder

RUN npm install -g pnpm turbo

WORKDIR /app

# 워크스페이스 설정 파일 복사
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

# 각 패키지의 package.json만 먼저 복사 (레이어 캐싱)
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY apps/backend/ ./apps/backend/
COPY packages/shared/ ./packages/shared/

# shared 빌드 후 backend 빌드
RUN turbo build --filter=@repo/backend

# Stage 2: Production runtime
FROM node:20-alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# 프로덕션 의존성만 설치
RUN pnpm install --frozen-lockfile --prod

# 빌드 결과물 복사
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["node", "dist/main"]
