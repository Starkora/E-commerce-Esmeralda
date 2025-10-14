import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,js,jsx,tsx,mdx}',
    './components/**/*.{ts,js,jsx,tsx,mdx}',
    './app/**/*.{ts,js,jsx,tsx,mdx}',
  ],
  
  plugins: [],
};

export default config;
