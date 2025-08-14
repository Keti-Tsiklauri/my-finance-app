/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // static HTML export
  basePath: isProd ? "/my-finance-app" : "", // GitHub Pages repo path
  assetPrefix: isProd ? "/my-finance-app/" : "", // ensures assets load correctly

  images: {
    unoptimized: true, // needed for static export
  },
};

module.exports = nextConfig;
