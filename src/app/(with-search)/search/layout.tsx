function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>여기는 검색 레이아웃 입니다.</div>
      {children}
    </div>
  );
}

export default Layout;
