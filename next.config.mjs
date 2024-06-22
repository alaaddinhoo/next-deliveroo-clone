/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "rs-menus-api.roocdn.com",
      "co-restaurants.roocdn.com",
      "f.roocdn.com",
    ],
  },
  reactStrictMode: false, // DISABLE IT
  experimental: { missingSuspenseWithCSRBailout: false },
};

export default nextConfig;
