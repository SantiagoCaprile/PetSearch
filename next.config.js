/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API_KEY: process.env.API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dprm5aerx/**',
      },
    ],
  },
};

module.exports = nextConfig;
