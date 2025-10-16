import React from "react";
import "./globals.css";
import styles from "@/app/layout.module.css";
import Link from "next/link";
import { Metadata } from "next";

// SEO 설정
export const metadata: Metadata = {
  title: "yubi's 쇼핑몰",
  description: "쇼핑몰 만드는 것에 대한 소개글 입니다.",
};

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
