// 이미지 최적화
const nextConfig = {
  images: {
    domains: ["example.com", "cdn.myapp.com"], // 외부 이미지 허용 도메인
    formats: ["image/avif", "image/webp"], // 고효율 포맷 사용
    minimumCacheTTL: 60, // 캐시 유지 시간(초)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 캐싱 상태 콘솔 출력
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // 압축 및 빌드 최적화

  //  compress: true, // gzip 압축 활성화
  // webpack(config) {
  //   // 콘솔 로그 제거 (프로덕션 빌드 시)
  //   if (process.env.NODE_ENV === "production") {
  //     config.optimization.minimize = true;
  //   }
  //   return config;
  // },

  // React 렌더링 최적화
  reactStrictMode: true, // 개발 중 불필요한 리렌더링 감지
  swcMinify: true, // SWC(Next 전용 빌드러)로 JS 최적화

  // 캐시 정책 (Headers & Caching)
  async headers() {
    return [
      {
        source: "/(.*).(js|css|svg|png|jpg|webp)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1년 캐시
          },
        ],
      },
    ];
  },

  // 환경 변수 및 보안
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  poweredByHeader: false, // "x-powered-by: Next.js" 제거 → 보안 강화
  // 추가로 자주 쓰는 최적화 세팅
};
export default nextConfig;

// 추가로 자주 쓰는 최적화 세팅 예시
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   compress: true,
//   poweredByHeader: false,
//   images: {
//     domains: ["images.unsplash.com", "cdn.pixabay.com"],
//     formats: ["image/avif", "image/webp"],
//   },
//   experimental: {
//     scrollRestoration: true, // 페이지 이동 시 스크롤 위치 복원
//   },
// };
// export default nextConfig;
