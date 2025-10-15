// module.css 가 기본임 (시작페이지)
import styles from "@/app/(with-search)/page.module.css";
import GoodItem from "@/components/GoodItem";
import GoodItemListSkeleton from "@/components/skeleton/gooditemlistskeleton";
import GoodItemSkeleton from "@/components/skeleton/gooditemskeleton";
import { GoodDataType } from "@/types/type";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// Dynamic Page 로 강제로 설정 (권장하지 않음, 수업이라서)
// export const dynamic = "force-dynamic";

// 1. 전체 제품 목록 가져오기
async function AllGoods() {
  // 수업을 위해서 강제로 delay 시킴
  // await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=10`,
    {
      next: { revalidate: 3600 },
    }
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

// 2. 추천 상품 목록
async function RecommendGoods() {
  // 위와 같이 js 의 내장 fetch 가 아니고, Next.js 의 내장 fetch 임
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=3`,
    {
      cache: "force-cache",
    }
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

function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        <Suspense fallback={<GoodItemListSkeleton count={3} />}>
          <RecommendGoods />
        </Suspense>
      </section>
      <section>
        <h3>전체 상품</h3>
        <Suspense fallback={<GoodItemListSkeleton count={5} />}>
          <AllGoods />
        </Suspense>
      </section>
    </div>
  );
}

export default Home;
