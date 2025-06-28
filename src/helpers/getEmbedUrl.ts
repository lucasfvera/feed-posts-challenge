/**
 * Converts a normal media URL to its embeddable version for YouTube, Vimeo, or SoundCloud.
 * @param url - The original media URL.
 * @returns The embeddable URL or null if unsupported.
 */
export function getEmbedUrl(url: string): string | null {
	if (!url || typeof url !== 'string') return null;

	try {
		const parsedUrl = new URL(url);
		const hostname = parsedUrl.hostname;

		// YouTube
		if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
			let videoId = null;

			// Short link: youtu.be/VIDEO_ID
			if (hostname === 'youtu.be') {
				videoId = parsedUrl.pathname.slice(1);
			}
			// Regular link: youtube.com/watch?v=VIDEO_ID
			else if (parsedUrl.searchParams.has('v')) {
				videoId = parsedUrl.searchParams.get('v');
			}
			// Share link format: youtube.com/embed/VIDEO_ID
			else if (parsedUrl.pathname.includes('/embed/')) {
				return url;
			}

			if (videoId) {
				return `https://www.youtube.com/embed/${videoId}`;
			}
		}

		// Vimeo
		if (hostname.includes('vimeo.com')) {
			const match = url.match(/vimeo\.com\/(\d+)/);
			if (match && match[1]) {
				return `https://player.vimeo.com/video/${match[1]}`;
			}
		}

		// SoundCloud
		if (hostname.includes('soundcloud.com')) {
			return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
				url
			)}`;
		}

		return null;
	} catch (error) {
		console.error('Invalid URL: ', error);
		return null;
	}
}
