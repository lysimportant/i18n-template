/** @type {import('next').NextConfig} */
// import "./src/i18n"
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.faiusr.com',
            },
            {
                protocol: 'https',
                hostname: 'images.wallpaperscraft.com',
            },
            {
                protocol: "https",
                hostname: "lianghj.top"
            }
        ]
    },
    reactStrictMode: false,
}

module.exports = nextConfig
