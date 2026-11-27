/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statico pubblicato su Firebase Hosting.
  // Scoring nel browser; storico opzionale su Firestore.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
