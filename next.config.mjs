/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
        "https://mldueodzggqqwjvkyalt.supabase.co/storage/v1/object/public/product-images/**"
      ),
    ],
  },
};

export default nextConfig;
