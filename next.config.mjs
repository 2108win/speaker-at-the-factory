/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nmt.logit.id.vn",
        port: "5000",
        pathname: "/api/v1/**",
      },
    ],
  },
};

export default nextConfig;
