/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ["img.freepik.com", "images.pexels.com"],
  },
};

module.exports = nextConfig
