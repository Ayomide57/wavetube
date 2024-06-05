/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,
  images: {
    domains: ["ipfs.io"],
  },

  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false };

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/verify-login",
        destination: "https://api.apillon.io/auth/verify-login",
      },
    ];
  },
};

export default nextConfig;
