"use server";

import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

// Action 용 함수
// useActionState 활용 시 : Action 의 상태도 전달을 하는 형태로 적용 필요
export async function createReviewAction(_state: any, formData: FormData) {
  "use server";

  const title = formData.get("title")?.toString();
  const price = formData.get("price")?.toString();
  const description = formData.get("description")?.toString();
  const image = formData.get("image")?.toString();
  const category = formData.get("category")?.toString();

  // 간단한 예외처리
  if (!title || !price || !description || !image || !category) {
    // 업데이트 함
    // 아래는 호출 한 곳으로 전달하고 싶은 내용 객체를 생성함
    return { status: false, message: "각 항목을 채워주세요." };
  }

  try {
    // 테스트를 위한 시간 늘리기
    delay(10000); // 10초를 걸어줌

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        method: "POST",
        body: JSON.stringify({ title, price, description, image, category }),
      }
    );

    // 서버에서 출력됨
    console.log("상품 리뷰 등록 성공", response);
    const { id } = await response.json();
    console.log("상품 리뷰 등록 결과 id : ", id);

    /**
     * 새로운 리뷰가 등록이 되었을 경우, 리랜더링으로 출력을 시켜야 함.
     * - 서버에서 호출해야함
     * - 지금까지 가지고 있던 cache 를 무효화 시켜야함.
     * - /src/app/good/[id]/page.tsx */

    // revalidatePath(`/good/${id}`);
    revalidateTag(`good-${id}`);
    // 기존과는 다르게 호출한 곳에 전달함
    return { status: true, message: "등록에 성공했습니다." };
  } catch (error) {
    // 서버에서 에러 메시지 출력(웹브라우저 아님)
    console.log(error);
    return { status: false, message: "리뷰 등록에 실패했습니다." };
  }
}
