import SearchBar from "@/components/SearchBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <SearchBar />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
