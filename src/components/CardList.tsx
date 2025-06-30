import { Card } from '@/app/api/services/cards';
import { getRandomCardTag } from '@/app/api/services/getRandomCardTag';
import { CardDisplay } from '@/components/CardDisplay';
import { EmptyState } from '@/components/EmptyState';

export const CardList = ({ cards }: { cards: Card[] }) => {
	// Show empty state if no cards
	if (!cards || cards.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className="flex flex-col gap-12 w-full items-center">
			{cards.map((post) => {
				post.content.tag = getRandomCardTag();
				return <CardDisplay key={post.id} card={post} />;
			})}
		</div>
	);
};
