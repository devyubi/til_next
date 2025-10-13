import React from "react";
import "./globals.css";
import styles from "@/app/layout.module.css";
import Link from "next/link";

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.container}>
          <header>
            <Link href={"/"}>Yubi&apos;s Shopping Mall</Link>
          </header>
          <main>{children}</main>
          <footer>하단</footer>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
