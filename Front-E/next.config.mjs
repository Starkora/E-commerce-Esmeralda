/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    domains: ['images.unsplash.com'],
  },
};

// En desarrollo usar 127.0.0.1 para evitar resolución a ::1 (IPv6) que causa ECONNREFUSED
if (process.env.NODE_ENV === 'development') {
  nextConfig.rewrites = async () => [
    {
      source: '/api/:path*',
      destination: 'http://127.0.0.1:8000/api/:path*',
    },
    {
      source: '/sanctum/:path*',
      destination: 'http://127.0.0.1:8000/sanctum/:path*',
    },
    {
      source: '/debug-csrf',
      destination: 'http://127.0.0.1:8000/debug-csrf',
    },
    {
      source: '/debug-auth',
      destination: 'http://127.0.0.1:8000/debug-auth',
    },
    {
      source: '/login',
      destination: 'http://127.0.0.1:8000/login',
    },
    {
      source: '/logout',
      destination: 'http://127.0.0.1:8000/logout',
    },
  ];
}

export default nextConfig;
