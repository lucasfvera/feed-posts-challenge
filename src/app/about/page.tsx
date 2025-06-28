export default function About() {
	return (
		<div className="flex flex-col gap-8 w-full max-w-2xl items-center text-center">
			<h1 className="text-4xl font-bold text-gray-900">
				About Sublime Feed
			</h1>

			<div className="space-y-6 text-gray-700">
				<p className="text-lg leading-relaxed">
					Welcome to Sublime Feed, a curated collection of inspiring
					content from across the web. We bring together articles,
					social posts, images, and videos that spark creativity and
					encourage meaningful conversations.
				</p>

				<p className="text-lg leading-relaxed">
					Our platform is designed to help you discover serendipitous
					content that might not appear in your usual feeds. Whether
					you&apos;re looking for productivity tips, wellness
					inspiration, or just something thought-provoking, we&apos;ve
					got you covered.
				</p>
			</div>
		</div>
	);
}
