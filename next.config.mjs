// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */

const allowedHostnames = [
  "example.com",
  "img.icons8.com",
  "s3-alpha.figma.com",
  "cdn.prod.website-files.com",
  "c8.alamy.com",
  "i.vimeocdn.com",
  "toolset.com",
  "lreclvqyoujucqaggxfy.supabase.co",
  "dev.windwardsailingclub.com",
  "pknbhkxuqdmghngwniok.supabase.co",
  "lpflijrmgfjwrcvpdvpi.supabase.co",
  "source.unsplash.com",
  "plus.unsplash.com",
];

const nextConfig = {
  images: {
    remotePatterns: allowedHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),

    // loader: "custom",
    // loaderFile: "./supabase-image-loader.ts",

    // unoptimized: true,
  },
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/products/:id", // This matches the current products route
  //       destination: "/items/:id", // This is the new route you want to redirect to
  //       permanent: false, // Set to true for a 301 redirect, or false for a 302 redirect
  //     },
  //   ];
  // },

  // compiler: {
  //   removeConsole: { exclude: ["error"] },
  // },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
