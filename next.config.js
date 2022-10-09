/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  typescript:{
    ignoreBuildErrors:true
  },
  images: {
    domains: ['assets.coingecko.com'],
  },
}

module.exports = nextConfig
