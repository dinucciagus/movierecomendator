/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_OPENAI_ORGANIZATION:
      process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_OPENAI_ORGANIZATION:
      process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
  },
};

module.exports = nextConfig;
