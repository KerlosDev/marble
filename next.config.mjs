/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.graphassets.com', 'images.unsplash.com','ap-south-1.graphassets.com'], // Allow Hygraph and Unsplash image domains
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;
