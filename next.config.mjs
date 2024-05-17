/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  output: "export",
  images: {
    unoptimized: true, // This is needed because GitHub Pages does not support Next.js optimized images
  },
  basePath: "/only-peers-client",
};

export default nextConfig;
