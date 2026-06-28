import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Prisma's engine out of the bundle so it loads from node_modules.
  serverExternalPackages: ["@prisma/client", ".prisma/client", "prisma"],
};

export default nextConfig;
