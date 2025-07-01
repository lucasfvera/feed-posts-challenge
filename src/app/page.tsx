import { CardList } from '@/components/Molecules/CardList/CardList';
import { getInfinitePosts } from '@/app/api/services/actions';
import Image from 'next/image';

export default async function Home() {
	const data = await getInfinitePosts(1, 10);
	if (!data) return;

	return (
		<>
			<div className="flex flex-col gap-8 w-full max-w-2xl items-center text-center">
				<Image
					src={'/sublime-logo-ground_low-res.avif'}
					alt=""
					width={600}
					height={200}
					priority
					placeholder="blur"
					blurDataURL={'/sublime-logo-ground_placeholder.avif'}
				/>
				<h1 className="text-4xl font-bold text-gray-900">
					Welcome to Sublime
				</h1>

				<div className="space-y-6 text-gray-700">
					<p className="text-lg leading-relaxed">
						This is a curated collection of inspiring content from
						across the web saved by users. We bring together
						articles, social posts, images, and videos that spark
						creativity and encourage meaningful conversations.
					</p>
				</div>
			</div>
			<CardList
				cards={data.results}
				cardsFetcherAction={getInfinitePosts}
			/>
		</>
	);
}
