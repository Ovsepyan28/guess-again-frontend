/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:slug*',
        destination: 'http://localhost:5555/:slug*',
      },
    ];
  },
};

export default nextConfig;
