import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Restant van de GoDaddy-parkeerperiode (4–8 sep 2026): die pagina stuurde
      // bezoekers via JS naar /lander. Browsers die dat script nog gecachet hebben
      // belanden anders op een 404 in plaats van op de homepage.
      { source: "/lander", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
