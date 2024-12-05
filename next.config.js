/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ujfncbfjalufspswkjny.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/recipe_photos/**",
      },
    ],
  },
};

module.exports = nextConfig;
