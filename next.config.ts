import withBundleAnalyzer from "@next/bundle-analyzer";
import "./src/libs/Env";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true", 
});

/** @type {import('next').NextConfig} */
const nextConfig = bundleAnalyzer({
  eslint: {
    dirs: ["."], 
  },
  poweredByHeader: false, 
  reactStrictMode: true, 
});

export default nextConfig;
