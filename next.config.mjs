/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL;

    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: allowedOrigin }, // Use variable for origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,OPTIONS,HEAD",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
