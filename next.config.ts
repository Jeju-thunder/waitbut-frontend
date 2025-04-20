import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/kakao/redirect",
        destination: "/auth",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
