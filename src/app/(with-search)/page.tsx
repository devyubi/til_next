// module.css 가 기본임 (시작페이지)
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
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=3`
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
