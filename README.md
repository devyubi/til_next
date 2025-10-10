# Next.js

## 1. 프로젝트 생성

```bash
npx create-next-app@latest .
```

## 2. 프로젝트 생성 시 옵션 선택

- 해당 옵션은 수업용 옵션이므로, 자유롭게 세팅 하면 됨

- √ Would you like to use TypeScript? ... : Yes
- √ Which linter would you like to use? » ESLint
- √ Would you like to use Tailwind CSS? ... : No
- √ Would you like your code inside a `src/` directory? ... : Yes
- √ Would you like to use App Router? (recommended) ... : Yes
- √ Would you like to use Turbopack? (recommended) ... : No
- √ Would you like to customize the import alias (`@/*` by default)? ... : No

## 3. 프로젝트 실행하기

- `npm run dev` : 개발 모드 실행
- `npm run build` : 배포 빌드 모드 시뢩
- `npm run start` : Production 모드 실행

## 4. 프로젝트 최종 빌드 시, `서버가 반드시 필요`함

- React 는 그냥 빌드 파일을 주면 됨 (웹브라우저에서 실행 됨)
- Next 는 반드시 별도의 서버가 필요함 (서버에서 실행 됨)
- Next 는 일반적으로 Vercel 에 배포함
- 참고 사항 : AWS 는 깡통 PC 를 제공함 (운영체제도 없음. 보통 리눅스 설치함)

### 4.1 왜 next.js 만 쓰면 되지 react + spring을쓸까?

- Next.js 하나만으로도 `풀스택 개발`이 가능하지만, 더 복잡한 비즈니스 로직이나 보안이 필요한 서비스라면 React + Spring 조합을 쓰는 게 나음

### 4.2 React + Spring 구조

- `프론트엔드(React)` + `백엔드(Spring)` 를 완전히 분리해서 개발하는 방식.
- 구조 : React → 화면(UI) + 클라이언트 로직 / Spring → DB, API, 보안, 서버 로직 담당
- 즉, React는 사용자에게 보이는 부분, Spring은 데이터 처리, 로그인, 결제 같은 비즈니스 로직 담당. (React(프론트) ⇄ Spring(백엔드) ⇄ DB)
- 장점
  - 대규모, 복잡한 서비스에 강함 (기업용, 은행, 쇼핑몰 등)
  - API, 인증, 결제, 권한 제어 등 세밀한 로직 관리 가능
  - 팀 분업 구조에 유리 (FE팀/BE팀 따로)
- 단점
  - 서버를 따로 구축해야 함
  - 배포/연동 복잡
  - 초기 설정량 많고 학습비용 큼

### 4.3 Next.js 하나로 하는 경우

- Next.js는 `React + 서버 기능`이 합쳐진 풀스택 프레임워크
- 즉, React처럼 컴포넌트를 만들면서도, 서버 역할도 일부 가능

- 구조

  - pages/api 폴더 안에 서버(API) 코드를 직접 작성 가능
  - 별도 백엔드 없이 Supabase, Firebase, Prisma 등 연결 가능 (Next.js(프론트 + 간단 백엔드) ⇄ DB or 외부 API)

- 장점

  - 개발 구조 단순 → 프론트+백엔드 한 프로젝트로 끝남
  - 배포 간단 (Vercel에서 클릭 한 번)
  - SEO, 사전렌더링 자동 지원
  - 개인/스타트업/프로토타입 제작에 최적

- 단점

  - 복잡한 서버 로직(결제, 트랜잭션, 대규모 API 등)은 한계 있음
  - 대규모 트래픽, 보안 이슈에선 Spring보다 약함

- 결론 정리

✅ 작은 규모 / 빠른 개발 / 클라이언트 중심 서비스
→ Next.js만 써도 충분함.
(Supabase, Firebase로 DB까지 해결 가능)

✅ 복잡한 비즈니스 로직 / 금융·보안 / 기업용 시스템
→ React + Spring 조합이 유리함.
(Spring이 백엔드 로직과 보안에 강함)

- 한 줄 요약
  - Next.js = 프론트 + 간단 백엔드용 올인원 프레임워크
  - React + Spring = 대규모, 복잡한 서버 로직용 안정적인 분리 구조

## 5. 기본 파일 구조

- public 폴더 : 이미지 및 폰트 등의 리소스를 배치함 (static 파일들)

- /src/app 폴더 :

  - App Router 버전으로 진행 시, `app 폴더`가 존재함
  - Next 는 반드시 app 이라는 폴더가 있어야 함

- /src/app/page.tsx :

  - app 폴더에 page.tsx 가 화면에 보여줄 html 파일
  - index.html 의 역할을 함
  - `http://localhost:3000` 라우터 경로에서 보여짐

- /src/app/globals.css :
  - 앱 전체의 기본 css 역할

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}
a {
  color: #000;
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
html {
  font-size: 16px;
  overflow-x: hidden;
}
body {
  color: #000;
}
```

- /src/app/layout.tsx :

  - html 의 기본 구조용
  - 공통으로 적용 될 내용을 작성하고, 공통으로 적용할 구조를 작성함
  - `글로벌 레이아웃` 이라고 함
  - 추후 별도로 각 페이지 마다 `layout.tsx` 를 추가할 수 있음

- `/src/app/page.module.css` :

  - Next 는 기본적으로 module css 가 기본 형식

- /next.config.ts :
  - Next 앱의 설정을 관리함
  - 추후 이미지 등등의 외부 리소스를 실시간 활용시 보안인증 등 설정

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;
```

### 1. http://localhost:3000 : index

- /src/app/page.tsx

```tsx
// module.css 가 기본임
import styles from "./page.module.css";
function page() {
  return <div className={styles.page}>page</div>;
}

export default page;
```

### 2. http://localhost:3000/search

- /src/app/search 폴더 생성
- /src/app/search/page.tsx 파일 생성

```tsx
function page() {
  return <div>검색페이지</div>;
}

export default page;
```

### 3. http://localhost:3000/search?keyword=yubi

- URL Search Param 방식

```tsx
async function page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  return <div>{keyword} : 검색페이지</div>;
}

export default page;
```

### 4. http://localhost:3000/good/1

- URI Params 처리 (동적 라우팅 (Dynamic Route))
- /src/app/good 폴더 생성
- /src/app/good/page.tsx 파일 생성

```tsx
function page() {
  return <div>상품</div>;
}

export default page;
```

- /src/app/good/[id] 폴더 생성
- /src/app/good/[id]/page.tsx 파일 생성

```tsx
async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <div>{id}번 상품</div>;
}

export default page;
```

### 5. Not Found Page

- /src/app/not-found.tsx 파일 생성
- 폴더명은 약속 되어 있는 거라, 파일 내부의 not-found 를 NotFound 로 교체함

```tsx
import React from "react";

function NotFound() {
  return <div>not-found</div>;
}

export default NotFound;
```

## layout.tsx 의 이해

### 1. global layout

- /src/app/layout.tsx

### 2. 페이지별 layout

- /src/app/페이지/layout.tsx
- /src/app/search/layout.tsx 파일 생성

```tsx
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>여기는 검색 레이아웃 입니다.</div>
      {children}
    </div>
  );
}

export default Layout;
```

- /src/app/good/layout.tsx 파일 생성

```tsx
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      제품소개
      {children}
    </div>
  );
}

export default Layout;
```

## 3. Layout Group : 레이아웃 그룹

- 시나리오 :
- http://localhost:3000/ 에는 `검색창 출력`
- http://localhost:3000/search 에도 `검색창 출력`
- http://localhost:3000/good 에는 `검색창 없음`

### 3.1. Layout Group 을 이용한 검색창 있는 layout 생성

- /src/app/(with-search) 폴더 생성 (()소괄호 안에 있는 폴더명은 임의로 with-search 로 생성함)
- /src/app/(with-search)/layout.tsx 파일 생성

### 3.2 Layout Group 적용

- 적용하고 싶은 라우터 경로 폴더 및 page.tsx 를 이동해줌
- search 폴더 이동했음
- /app/page.tsx 이동했음
- /app/page.module.css 이동했음

```tsx
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div>검색창</div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
```

- 지금까지 만든 컴포넌트들은 서버용 (클라이언트x) 컴포넌트임.
