/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow builds to complete even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
};


export default nextConfig;
