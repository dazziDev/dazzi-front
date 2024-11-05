// next.config.mjs
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dazzitest.s3.ap-northeast-1.amazonaws.com', // 수정된 부분
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
