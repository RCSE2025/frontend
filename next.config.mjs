/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // urlImports: ['https://users.fsp-hub.ru']
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: '*'
      }
    ]
  },
  reactStrictMode: false
}

export default nextConfig
