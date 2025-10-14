import styles from "@/app/(with-search)/search/page.module.css";
import GoodItem from "@/components/GoodItem";
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
