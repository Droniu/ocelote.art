/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["127.0.0.1", "images.unsplash.com"],
  },
}

module.exports = nextConfig
