/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '5001', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'greatodeal.com', pathname: '/**' },
      { protocol: 'https', hostname: 'api.greatodeal.com', pathname: '/uploads/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/how-we-work', destination: '/about', permanent: true },
      { source: '/estimate', destination: '/contact', permanent: true },
      { source: '/industries/banking', destination: '/industries/fintech', permanent: true },
      { source: '/industries/investment', destination: '/industries/fintech', permanent: true },
      { source: '/industries/oil-gas', destination: '/industries/green-tech', permanent: true },
      { source: '/industries/construction', destination: '/industries/real-estate', permanent: true },
      { source: '/industries/public-sector', destination: '/industries/government', permanent: true },
      { source: '/industries/education', destination: '/industries', permanent: true },
      { source: '/industries/supply-chain', destination: '/industries', permanent: true },
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/portfolio/:path*', destination: '/work/:path*', permanent: true },

      // Legacy pre-rebuild URL scheme (/solutions/*, /focus-areas/*, /howwork, /blogs)
      { source: '/howwork', destination: '/about', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/solutions/:path*', destination: '/', permanent: true },
      { source: '/focus-areas/banking', destination: '/industries/fintech', permanent: true },
      { source: '/focus-areas/investment', destination: '/industries/fintech', permanent: true },
      { source: '/focus-areas/oil-gas', destination: '/industries/green-tech', permanent: true },
      { source: '/focus-areas/construction', destination: '/industries/real-estate', permanent: true },
      { source: '/focus-areas/public-sector', destination: '/industries/government', permanent: true },
      { source: '/focus-areas/education', destination: '/industries', permanent: true },
      { source: '/focus-areas/ecommerce', destination: '/industries', permanent: true },
      { source: '/focus-areas/logistics', destination: '/industries', permanent: true },
      { source: '/focus-areas/:path*', destination: '/industries', permanent: true },

      // Legacy app-style pages (dashboard/opportunities tool) with no current equivalent
      { source: '/pipeline', destination: '/', permanent: true },
      { source: '/dashboard', destination: '/', permanent: true },
      { source: '/rfp-analyzer', destination: '/', permanent: true },
      { source: '/opportunities', destination: '/', permanent: true },
      { source: '/go-no-go', destination: '/', permanent: true },
      { source: '/alerts', destination: '/', permanent: true },
      { source: '/questions', destination: '/', permanent: true },
    ];
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;
