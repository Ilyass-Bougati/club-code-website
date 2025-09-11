// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("http://res.cloudinary.com/**")], // ✅ add this line
  },
};

export default nextConfig;
