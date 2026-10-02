/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 390, 480, 640, 768, 1024, 1280, 1440, 1600, 1920],
  },
  poweredByHeader: false,
};

export default nextConfig;
