/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin()

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

export default withNextIntl(nextConfig)
