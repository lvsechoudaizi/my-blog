import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",  // 👈 这一句必须加！才能生成 out 静态文件夹
};

export default nextConfig;
