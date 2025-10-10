import React from "react";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <div className="wrap">
          <header>상단</header>
          <main>{children}</main>
          <footer>하단</footer>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
