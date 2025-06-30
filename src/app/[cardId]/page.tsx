import { SublimeService } from '@/app/api/services/sublimeService';
import { CardDisplay } from '@/components/CardDisplay';
import { CardList } from '@/components/CardList';
import { EmptyState } from '@/components/EmptyState';

export default async function Page({
	params,
}: {
	params: Promise<{ cardId: string }>;
}) {
	const service = new SublimeService({
		baseUrl: 'http://54.198.139.161',
	});
	const { cardId } = await params;
	const { data: card } = await service.api.cardsRetrieve(Number(cardId));
	const {
		data: { results: relatedCards },
	} = await service.api.cardsRelatedCardsList(Number(cardId));
	return (
		<div className="flex flex-col gap-16">
			<CardDisplay card={card} />
			<div className="border-t-2 border-gray-300"></div>
			{relatedCards.length > 0 ? (
				<div className="flex flex-col gap-12">
					<p className="text-4xl">
						{'Grab inspiration from these related cards'}
					</p>
					<CardList cards={relatedCards} />
				</div>
			) : (
				<EmptyState />
			)}
		</div>
	);
}
