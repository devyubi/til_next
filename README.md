# Data Fetching

- 사용자가 데이터를 사전에 호출하는 방식
- Next.js 에 독특한 외부 DB 데이터 호출 방식
- Page Router 방식과 완전 다름 (Server Component 도입)
- Demo API : https://fakestoreapi.com/docs
- `Data 는 필요한 곳에서 직접 불러서 사용하라` 는 컨셉

## 1. Data Fetching 실습

- /src/app/(with-search)/page.tsx 업데이트

```tsx
// module.css 가 기본임 (시작페이지)
import goods from "@/mock/good.json";
import styles from "@/app/(with-search)/page.module.css";
import GoodItem from "@/components/GoodItem";
import { GoodDataType } from "@/types/type";

/**
 * Data Fetching : 데이터를 불러오면 Next.js 서버가 Data를 보관함(Cache:캐시)
 * 기본값은 Data를 불러들이면 Cache 해서 업데이트를 하지 않음 (자료 호출 다신 하지 X)
 * BE 호출이 줄어드는 장점과 화면 출력이 상당히 빠르고, HTML 을 미리 생성하므로 SEO 가 좋음
 */

// 1. 전체 제품 목록 가져오기
async function AllGoods() {
  // 하단의 fetch 함수는 js 내장 함수가 아니라, Next.js 의 내장 함수임.
  const response = await fetch("https://fakestoreapi.com/products?limit=10");
  const allGoods: GoodDataType[] = await response.json();
  // console.log(allGoods);
  return (
    <div>
      {allGoods.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </div>
  );
}

// 2. 추천 상품 목록
async function RecommendGoods() {
  // 위와 같이 js 의 내장 fetch 가 아니고, Next.js 의 내장 fetch 임
  const response = await fetch("https://fakestoreapi.com/products?limit=3");
  const allGoods: GoodDataType[] = await response.json();
  // console.log(allGoods);
  return (
    <div>
      {allGoods.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        <RecommendGoods />
      </section>
      <section>
        <h3>전체 상품</h3>
        <AllGoods />
      </section>
    </div>
  );
}

export default Home;
```

## 2. 환경 설정 파일 생성 (.env)

- `/` 에 `.env` 로 생성함
- `.gitignore` 에 env 파일 확인

```txt
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

- /src/app/(with-search)/page.tsx 일부 업데이트

```tsx
// 1. 전체 제품 목록 가져오기
async function AllGoods() {
  // 하단의 fetch 함수는 js 내장 함수가 아니라, Next.js 의 내장 함수임.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=10`
  );
  const allGoods: GoodDataType[] = await response.json();
  // console.log(allGoods);
  return (
    <div>
      {allGoods.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </div>
  );
}
```

## 3. Search page 작업

- Client Component 에서 활용
- /src/components/SearchBar.tsx 업데이트

```tsx
"use client";
import styles from "@/components/SearchBar.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  // 동적 라우팅
  const router = useRouter(); // 상단 import 를 `next/navigation` 으로.

  const searchParams = useSearchParams();

  const q = searchParams.get("keyword");
  useEffect(() => {
    setSearch(q || ""); // q = query(쿼리)
  }, [q]);

  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    // 같은 검색어를 다시 검색할 필요는 없음
    if (!search.trim() || q === search) {
      return;
    }
    router.push(`/search?keyword=jewelery`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={search}
        onChange={(e) => onChangeSearch(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
```

- /src/app/(with-search)/search/page.tsx 업데이트

```tsx
import styles from "@/app/(with-search)/search/page.module.css";
import GoodItem from "@/components/GoodItem";
import goods from "@/mock/good.json";
import { GoodDataType } from "@/types/type";

interface PageProps {
  searchParams: Promise<{ keyword: string }>;
}

async function Page({ searchParams }: PageProps) {
  const { keyword } = await searchParams;

  // fetch 를 활용한 검색
  // js 내장 fetch 아님!! Next.js fetch 임!!
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/category/${keyword}`
  );

  const allGoods: GoodDataType[] = await response.json();

  return (
    <div className={styles.container}>
      <h4>
        <strong>{keyword}</strong> : 검색 페이지
      </h4>
      <div>
        <div>
          {allGoods.map((item) => (
            <GoodItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
```

## 4. 상세 페이지 작업

- /src/app/good/[id]/page.tsx 업데이트

```tsx
import { GoodDataType } from "@/types/type";
import styles from "@/app/good/[id]/page.module.css";
import Image from "next/image";

const mockData: GoodDataType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  rating: { rate: 3.9, count: 120 },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;
  // fetch 를 이용한 자료 출력
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
  );
  const good: GoodDataType = await response.json();

  const { category, description, image, rating, title } = good;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      >
        <Image src={image} alt={title} width={245} height={350} />
      </div>
      <div className={styles.category}>{category}</div>
      <div className={styles.rating}>
        Rating: {rating.rate} | {rating.count}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

export default Page;
```

## 5. 데이터 캐시 (Data Caching)

- `Next 는 데이터 캐싱을 개발자가 직접 설정 할 수 있다` (자유롭게 컨트롤은 가능하지만, 완전히 무제한은 아님.)
- fetch method 를 활용해 불러온 데이터를 Next 서버에서 보관하는 기능
- 영구적으로 데이터를 보관하거나, 특정 시간을 주기로 갱신 시키는 기능
- 불필요한 데이터 요청의 수를 줄여서 웹 서비스의 성능을 개선 시킴

### 5.1. 데이터 캐시 옵션 종류 (4가지)

- `{ cache: "force-cache" }`
  - 자주 변하지 않는 정적 데이터(ex. 소개글, 정적 페이지 등)에 사용
  - force-cache : 강제로 보관함 (기본값 - Page Router 에서는 14 버전에서는 기본값이었음.)
  - 요청의 결과를 무조건 캐싱함
  - 한번 호출된 이후에는 다시는 호출하지 않음

```tsx
const response = await fetch("주소", { cache: "force-cache" });
```

- `{ cache: "no-force" }`
  - 실시간으로 바뀌는 데이터(ex. 게시글 목록, 주식 가격, 채팅 등)에 사용
  - App Router 에서는 기본값으로 적용됨 (15 버전에서는 기본값.)
  - 데이터 패칭의 결과를 저장하지 않는 옵션
  - 캐싱을 하지 않도록 설정함
  - 계속 호출함

```tsx
const response = await fetch("주소", { cache: "no-force" });
```

- `{ next: { revalidate: 갱신시간 } }`
  - 정적 + 동적 섞인 경우(ex. 하루에 몇 번만 바뀌는 공지사항)에 사용
  - 갱신 시간 안에 데이터 호출하면 캐싱 되어져 있던 데이터를 돌려줌
  - 갱신 시간 이후에는 새로운 데이터 호출 및 HTML 생성을 반환함

```tsx
const response = await fetch("주소", { next: { revalidate: 10 } });
```

- `{ next: { tags: ["태그"] } }`
  - 데이터 호출에 특정 태그를 붙이고 원하는 경우에 태그로 재호출 가능

```tsx
const response = await fetch("주소", { next: { tags: ["태그"] } });
```

- `{ next: { tags: ["tag이름"] } }`
  - 특정 데이터만 갱신하고 싶을 때 (ex. 상품 목록만 새로고침)에 사용

```tsx
const res = await fetch("https://api.com/data", {
  next: { tags: ["products"] },
});
```

### 5.2. 옵션을 적용한 상태의 logging 확인 해 보기

- `/next.config.ts` 에 옵션 세팅 가능 (캐싱 상태 확인 시 작성)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  // 외부 사이트 이미지 활용 적용
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 캐싱 상태 콘솔 출력
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
```

```bash
 GET / 200 in 4913ms
 │ GET https://fakestoreapi.com/products?limit=10 200 in 399ms (cache skip)
 │ │ Cache skipped reason: (auto no cache)
 │ GET https://fakestoreapi.com/products?limit=3 200 in 863ms (cache skip)
 │ │ Cache skipped reason: (auto no cache)
```
