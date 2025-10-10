interface PageProps {
  searchParams: Promise<{ keyword: string }>;
}

async function Page({ searchParams }: PageProps) {
  const { keyword } = await searchParams;
  return <div>{keyword} : 검색페이지</div>;
}

export default Page;
