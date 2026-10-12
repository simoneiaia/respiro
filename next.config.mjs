/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statico: compatibile con Cloudflare Pages senza runtime server.
  // Tutto lo scoring e la persistenza avvengono lato client (Supabase JS).
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
