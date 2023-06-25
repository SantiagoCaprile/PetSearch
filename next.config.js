/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.redd.it", "www.purina.com.ar", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
