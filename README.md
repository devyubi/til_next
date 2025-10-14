# Route Cache

- Next 서버에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능
- Next 에 Page 종류는 Static Page (정적 페이지 - 빠름) 와 Dynamic Page (동적 페이지 - Static Page 보다 느림) 가 있음
- 만들어둔건 정적 페이지 / 실시간으로 만들어지는건 동적 페이지

## 2. build 시 Dynamic Page 로 설정되는 기준

- Dynamic Page 로 빌드 되는 경우의 기준
- 특정 페이지가 접속 요청을 받을 때 마다 변화가 생기는 경우
- 특정 페이지가 접속 요청을 받을 때 마다 데이터가 달라지는 경우
  - 캐시되지 않은 Data Fetching 을 사용 할 경우
  - 동적 함수(쿠키, 헤더, 쿼리스트링 등)을 사용한 컴포넌트가 있을 때

## 3. build 시 Static Page 로 설정되는 기준

- Static Page 로 빌드 되는 경우의 기준
- Dynamic Page 가 아니라면 모두 Static Page 로 설정 됨

## 4. 빌드 오류 해결하기

```bash
npm run build
```

### 4.1. useSearchParams() 문제 해결

- `사용자가 어떤 데이터를 입력 할지 알 수 없는 경우`
- <Suspense></Suspense> 로 감싸줌.
- /src/app/(with-search)/layout.tsx

```tsx
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
```

- 다시 npm run build 하여, 아래 처럼 떴다.
- ○ : static Page / ƒ : dynamic page

```bash
Route (app)                                 Size  First Load JS  Revalidate  Expire

Route (app)                                 Size  First Load JS  Revalidate  Expire
Route (app)                                 Size  First Load JS  Revalidate  Expire
┌ ○ /                                      296 B         111 kB          1h      1y
┌ ○ /                                      296 B         111 kB          1h      1y
├ ○ /_not-found                            138 B         102 kB
├ ○ /good                                  138 B         102 kB
├ ○ /_not-found                            138 B         102 kB
├ ○ /good                                  138 B         102 kB
├ ○ /good                                  138 B         102 kB
├ ƒ /good/[id]                             295 B         108 kB
└ ƒ /search                                297 B         111 kB
+ First Load JS shared by all             102 kB
  ├ chunks/255-4efeec91c7871d79.js       45.7 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js  54.2 kB
  └ other shared chunks (total)          2.02 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## 5. Static 페이지로 구성 해보기

- /src/app/good/page.tsx 업데이트
- 아래 함수를 이용하면 SSR 페이지를 미리 생성해줌 (build 시 페이지 새로 생성함)

- SSR이란? (서버사이드 렌더링) : 페이지를 브라우저가 아니라 서버에서 미리 완성해서 보내주는 방식

  - 보통 React 앱은 이렇게 동작함
  - 클라이언트(브라우저)가 서버에 요청 → 서버는 빈 HTML을 보내고, 브라우저가 JS를 다운로드해서 렌더링을 `직접` 함.
  - 이게 CSR(Client Side Rendering) 임.

- 하지만 SSR은 다름

  - 서버가 요청을 받으면 이미 완성된 HTML을 만들어서 보냄
  - 브라우저는 바로 그려버림 (JS는 나중에 붙음)
  - 즉, `브라우저 대신 서버가 먼저 페이지를 렌더링한다` → 초기 로딩이 빠르고, SEO(검색엔진 노출)에 유리함

- SSG : Static Site Generation

```tsx
/**
 * 약속 된 Next 함수임 (미리 페이지를 Static Page(정적-SSG) 이고, SSR(서버사이드렌더링) Page 이다.)
 */
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
```

## 6. Router Page 는 Static 으로 만들 수 있으면 만들어주자.

- 동적 함수가 없고, Data cache 를 적용하면, Static Page 로 build 됨.
- 동적 함수가 있으면, Dynamic 으로 build 됨.
- Data cache 가 없으면, Dynamic 으로 build 됨.
- 동적 함수가 없고, cache 가 없으면 Dynamic 으로 빌드 됨.

## 7. 강제로 페이지의 유형을 설정하는 옵션

- 권장하지는 않음

```tsx
export const dynamic = "auto"; // 기본값, 아무것도 강제하지 않음
export const dynamic = "force-dynamic"; // 강제로 Dynamic 페이지로 설정
export const dynamic = "force-static"; // 강제로 Static 페이지로 설정
export const dynamic = "error"; // 강제로 Static 페이지로 설정하고, build 오류 발생 시킴.
```
