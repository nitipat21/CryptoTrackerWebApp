/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: false,
  typescript:{
    ignoreBuildErrors:true
  },
  images: {
    domains: ['assets.coingecko.com'],
  },
  env: {
    FIREBASE_API_KEY: "AIzaSyAtxs_mE9ZP-hwbpq2YY3jy75QOcvrNI58",
    FIREBASE_AUTH_DOMAIN: "cryptotrackerwebapp.firebaseapp.com",
    FIREBASE_PROJECT_ID: "cryptotrackerwebapp",
    FIREBASE_STORAGE_BUCKET: "cryptotrackerwebapp.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "912887911450",
    FIREBASE_APP_ID: "1:912887911450:web:4a49000d166bf940ce6da3",
    FIREBASE_MEASUREMENT_ID: "G-SRNFC7M730",
    TWITTER_BEARER_TOKEN: "AAAAAAAAAAAAAAAAAAAAAIMsiAEAAAAArTWsfW1Bk2DA2GeDdAuBhuZ79uc%3DGCStpFo9LORD2w93XM0HljthPrBsLCAVsdQdNpU3KNO3510GjB"
  }
}

module.exports = nextConfig
