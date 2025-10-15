/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

if (process.env.NODE_ENV === 'development') {
  nextConfig.rewrites = async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8000/:path*',
    },
    {
      source: '/sanctum/:path*',
      destination: 'http://localhost:8000/sanctum/:path*',
    },
    {
      source: '/debug-csrf',
      destination: 'http://localhost:8000/debug-csrf',
    },
    {
      source: '/debug-auth',
      destination: 'http://localhost:8000/debug-auth',
    },
    {
      source: '/login',
      destination: 'http://localhost:8000/login',
    },
    {
      source: '/logout',
      destination: 'http://localhost:8000/logout',
    },
  ];
}

export default nextConfig;
