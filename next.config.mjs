/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dazzitest.s3.ap-northeast-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
