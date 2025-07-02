import { getIndividualPost, getRelatedPosts } from '@/app/api/services/actions';
import { LinkButton } from '@/components/Atoms/Button';
import { CardDisplay } from '@/components/Molecules/CardDisplay/CardDisplay';
import { CardList } from '@/components/Molecules/CardList/CardList';
// We could select a set of params to be pre-generated if we want to
// (like the first 10) to ensure that those first posts would be
// delivered instantly without needing to render them (they would be
// generated at build time).
export async function generateStaticParams() {
	return [];
}

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
			<div className="flex flex-col gap-6 w-full items-center">
				<div className="w-full flex justify-start">
					<LinkButton href="/">
						<span className="mr-2">←</span> Back to Home
					</LinkButton>
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
