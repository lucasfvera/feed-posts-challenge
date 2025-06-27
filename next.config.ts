import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL('https://*.*/**'), new URL('http://*.*.*/**')],
	},
};

export default nextConfig;
