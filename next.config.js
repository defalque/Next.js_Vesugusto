/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images: {
    qualities: [25, 50, 75],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      new URL(
        "https://mldueodzggqqwjvkyalt.supabase.co/storage/v1/object/public/product-images/**",
      ),
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
