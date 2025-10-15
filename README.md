# Error 처리

- Next.js 에서 Error 를 처리하는 `error.tsx` 가 존재함
- 파일명이 고정되어 있음
- 각 페이지 라우터 별로 `error.tsx` 를 생성 가능함

## 1. 파일 생성

- /src/app/(with-search)/error.tsx 파일 생성

## 2. 주의 사항

- 반드시 서버 뿐만 아니라, 클라이언트 측 Error 에도 처리하도록 한다
- `use Client` 를 반드시 넣어 줘야함

```tsx
"use Client";

function Error() {
  return <div>Error 가 발생했습니다.</div>;
}

export default Error;
```

## 3. 자동으로 Error 메세지를 출력하는 경우

```tsx
"use client";

function Error({ error }: { error: Error }) {
  return <div>{error.message} 에러가 발생했습니다.</div>;
}

export default Error;
```

## 4. 에러가 발생하면 다시 실행하도록 함수도 전달해줌

- reset 함수 : 용도가 제한 되어져 있음
- server 를 다시 실행하는 것이 아님
- 오로지 리랜더링만 실행함 (BE 데이터 호출 없음)
- Error 상태만 초기화 하고 컴포넌트를 리랜더링만 함
- 추천하지 않음

```tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3> {error.message} 에러가 발생했습니다.</h3>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}

export default Error;
```

## 5. 강제로 새로고침을 권장함

- 웹브라우저를 새로고침하도록 하여 데이터 호출부터 다시 시작
- `window.location.reload()` 권장

```tsx
{
  /* <button onClick={reset}>다시 시도</button> */
}
<button onClick={() => window.location.reload()}>다시 시도</button>;
```

- 전체 Error.tsx

```tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3> {error.message} 에러가 발생했습니다.</h3>
      {/* <button onClick={reset}>다시 시도</button> */}
      <button onClick={() => window.location.reload()}>다시 시도</button>
    </div>
  );
}

export default Error;
```

## 6. router.refresh() 활용해 보기

- 웹브라우저 강제 새로고침은 state 가 초기화 될 소지 있음
- Next 서버에게 현재 페이지에 필요로 한 `server component 들을 다시 실행하도록` 함
- 비동기로 작동됨 (await 은 안됨)
- reset() 을 통해 Error 상태를 초기화 하고 다시 컴포넌트를 리랜더링 해줌

- /src/app/(with-search)/error.tsx

```tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}
function Error({ error, reset }: ErrorProps) {
  const router = useRouter(); // next/navigation

  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>{error.message} 에러가 발생했습니다.</h3>
      {/* <button onClick={reset}>다시 시도</button> */}
      {/* <button onClick={() => window.location.reload()}>다시 시도</button> */}
      <button
        onClick={() => {
          router.refresh(); // 서버 컴포넌트 다시 실행
          reset(); // 에러 초기화, 리랜더링
        }}
      >
        다시 시도
      </button>
    </div>
  );
}

export default Error;
```

## 7. startTransition 활용해 보기

- React 18 버전 후반에 추가된 기능
- callback 함수를 인자로 callback 함수 안쪽에 UI 작업을 다시 동시에 처리해줌

- 최종 기본 모양.

```tsx
"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}
function Error({ error, reset }: ErrorProps) {
  const router = useRouter(); // next/navigation

  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>{error.message} 에러가 발생했습니다.</h3>
      {/* <button onClick={reset}>다시 시도</button> */}
      {/* <button onClick={() => window.location.reload()}>다시 시도</button> */}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 서버 컴포넌트 다시 실행
            reset(); // 에러 초기화, 리랜더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}

export default Error;
```
