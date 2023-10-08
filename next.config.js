/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/dashboard",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
