/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['images.unsplash.com']
  },
  // 添加重定向配置
  async redirects() {
    return [
      {
        source: '/events',
        destination: '/',
        permanent: true,
      },
      {
        source: '/events/:id',
        destination: '/',
        permanent: true,
      }
    ]
  },
}

module.exports = nextConfig