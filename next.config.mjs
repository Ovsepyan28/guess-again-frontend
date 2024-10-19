/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://194.226.49.191:5555/api/:slug*',
      },
    ];
  },
};

export default nextConfig;
