readme

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
  views/                   # 장면/페이지 조립(선택, App Router와 병행)
  app/                     # FSD app layer(비즈니스 오케스트레이션; 라우팅 금지)
```

경로 별칭: `@/* → src/*`

### Dependency Direction (one‑way)

`shared → entities → features → widgets → (views|processes|app) → app-router`

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

## Supabase 연동

- 필수 패키지: `@supabase/supabase-js`, `@supabase/ssr`
- 환경 변수:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (선택, 서버 전용)
- 클라이언트/서버 유틸:
  - 클라이언트: `createSupabaseBrowserClient()` (`src/shared/supabase/browser-client.ts`)
  - 서버: `createSupabaseServerClient()` (`src/shared/supabase/server-client.ts`)
  - Provider & 훅: `SupabaseProvider`, `useSupabaseClient()` (`src/shared/supabase/provider.tsx`)
- 전역 Provider 구조: `app/providers.tsx`에서 `SupabaseProvider`와 `QueryProvider`가 중첩되어 동작합니다.

## 문의 메일 설정

- API 라우트: `POST /api/contact`
- 설정 방법: **관리자 페이지에서 설정하는 것을 권장합니다.** (`/admin/settings`)
  - 관리자 페이지에서 설정하면 DB에 저장되며, 우선적으로 사용됩니다.
  - 관리자 페이지에서 설정하지 않은 경우에만 환경 변수를 fallback으로 사용합니다.
- 필요한 설정 (관리자 페이지 또는 환경 변수):
  - `SMTP_HOST`: SMTP 서버 호스트
  - `SMTP_PORT`: SMTP 포트 (예: 465 또는 587)
  - `SMTP_USER`: SMTP 인증 사용자
  - `SMTP_PASS`: SMTP 인증 비밀번호
  - `CONTACT_RECIPIENT_EMAIL`: 문의 내용을 수신할 이메일 주소 (여러 명에게 보내려면 쉼표로 구분: `email1@example.com,email2@example.com`)
  - `CONTACT_FROM_EMAIL` (선택): 발신자 표시용 이메일 주소. 설정하지 않으면 `SMTP_USER`를 사용합니다.
  - `SMTP_SECURE` (선택): SSL 포트를 강제로 사용할지 여부 (`"true"` 또는 `"false"`). 미설정 시 포트가 `465`이면 SSL을 사용합니다.
- Supabase 테이블 설정:
  - `supabase/migrations/create_email_settings.sql` 파일을 Supabase SQL Editor에서 실행하여 `email_settings` 테이블을 생성하세요.
- 문의 폼은 `app/(public)/contact/page.tsx`에서 렌더링되며, 입력값은 서버에서 검증 후 지정된 주소로 전송됩니다. 설정이 없으면 500 에러가 반환됩니다.
