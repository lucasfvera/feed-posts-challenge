import { getIndividualPost, getRelatedPosts } from '@/app/api/services/actions';
import { CardDisplay } from '@/components/Molecules/CardDisplay/CardDisplay';
import { CardList } from '@/components/Molecules/CardList/CardList';
import Link from 'next/link';

export default async function Page({
	params,
}: {
	params: Promise<{ cardId: string }>;
}) {
	const { cardId } = await params;
	// We could grab this from a cached data since we already fetched the whole list
	// in the home page.
	const card = await getIndividualPost(Number(cardId));
	const relatedCards = await getRelatedPosts(Number(cardId), {
		page: 1,
		size: 10,
	});

	// We could handle this states better like showing the user some call to action
	// to ensure they don't just see and empty page
	if (!card || !relatedCards) return;
	return (
		<div className="flex flex-col gap-16 items-center">
			<div className="flex flex-col gap-4 w-full items-center">
				<div className="w-full flex justify-start">
					<Link
						href="/"
						className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
					>
						<span className="mr-2">←</span> Back to Home
					</Link>
				</div>
				<CardDisplay card={card} />
			</div>
			<div className="border-t-2 border-gray-300 w-full"></div>
			{relatedCards.results.length > 0 && (
				<div className="flex flex-col gap-12">
					<p className="text-4xl">
						{'Grab inspiration from these related cards'}
					</p>
				</div>
			)}
			<CardList
				cards={relatedCards.results}
				cardsFetcherAction={async (page, page_size) => {
					'use server';
					return getRelatedPosts(Number(cardId), {
						page,
						size: page_size,
					});
				}}
			/>
		</div>
	);
}
