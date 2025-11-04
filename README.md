## Architecture — Next.js App Router + FSD (Feature‑Sliced Design)

본 프로젝트는 Next.js 14 App Router를 루트 `app/`에 두고, FSD 도메인 계층은 `src/` 하위에 배치합니다. FSD의 `app` 레이어는 비즈니스 오케스트레이션만 담당하며 `src/app/`에 존재합니다(라우팅 파일 금지). 라우팅은 항상 루트 `app/`에서만 정의합니다.

### Folder Layout

```
app/                       # Next.js App Router (Routing/Layout/Streaming)
src/
  shared/                  # 공용 유틸, UI primitives, env, http, cache
  entities/                # 엔티티 모델/서비스 (ex. user)
  features/                # 사용자 시나리오 단위의 기능 조합
  widgets/                 # 페이지에 배치되는 자족 컴포넌트 블록
  processes/               # 복합 프로세스(선택)
  pages/                   # 장면/페이지 조립(선택, App Router와 병행)
  app/                     # FSD app layer(비즈니스 오케스트레이션; 라우팅 금지)
```

경로 별칭: `@/* → src/*`

### Dependency Direction (one‑way)

`shared → entities → features → widgets → (pages|processes|app) → app-router`

- 상위는 하위에만 의존 가능. 역의존 금지
- 클라이언트 컴포넌트에서 서버 전용 모듈 임포트 금지 (`server-only`, `use server`)

### Data Flow

`Server Action / Route Handler → Service(entities/features) → UI`

### Caching

- `fetch` 캐시 전략과 태그 기반 무효화 사용
- 태그/키는 중앙에서 관리(`src/shared/cache/keys.ts`)

### Providers

- 전역 Provider는 루트 레이아웃(`src/app/layout.tsx`)에 배치
- 영역 전용 Provider는 해당 `(group)/layout.tsx`

자세한 팀 규칙은 `.cursor/rules`를 참고하세요.

## Scripts

```bash
npm run dev      # 개발 서버
npm run build    # 빌드
npm run start    # 프로덕션 실행
npm run lint     # ESLint
npm run format   # Biome format
```
