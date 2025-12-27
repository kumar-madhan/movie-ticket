/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'image.tmdb.org', 
      'images.unsplash.com',
      'res.cloudinary.com',
      'localhost',
    ],
  },
};

module.exports = nextConfig;
