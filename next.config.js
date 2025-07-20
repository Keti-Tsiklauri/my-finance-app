/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/my-finance-app" : "",
  assetPrefix: isProd ? "/my-finance-app/" : "",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
