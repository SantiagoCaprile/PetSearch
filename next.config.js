/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: [
      "i.redd.it",
      "firebasestorage.googleapis.com",
      "www.purina.com.ar",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
