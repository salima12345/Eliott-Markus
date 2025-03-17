/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.eliott-markus.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
    unoptimized: true 
  },
};

export default config;