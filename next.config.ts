import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Login and posting were removed; send old URLs to the top page
  async redirects() {
    return ['/login', '/register', '/post', '/post/:path*', '/profile'].map((source) => ({
      source,
      destination: '/',
      permanent: true,
    }));
  },
};

export default nextConfig;
