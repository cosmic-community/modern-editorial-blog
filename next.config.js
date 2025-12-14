/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imgix.cosmicjs.com', 'cdn.cosmicjs.com'],
  },
  typescript: {
    // We run type checking in prebuild script
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig