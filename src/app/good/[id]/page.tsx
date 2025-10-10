interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  return <div>{id}번 상품</div>;
}

export default Page;
