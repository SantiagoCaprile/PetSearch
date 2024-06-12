/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API_KEY: process.env.API_KEY,
    ALLOW_ADS: process.env.ALLOW_ADS,
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
