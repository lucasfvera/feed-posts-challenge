'use server';

import { Card } from '@/app/api/services/cards';
import { mockCards } from '@/app/api/services/mockCards';
import { PaginatedCardList } from '@/app/api/services/sublimeService';

const MOCK_MIN_DELAY_MS = 300;
const MOCK_MAX_DELAY_MS = 900;

const simulateNetworkDelay = () =>
	new Promise<void>((resolve) => {
		const delay =
			MOCK_MIN_DELAY_MS +
			Math.random() * (MOCK_MAX_DELAY_MS - MOCK_MIN_DELAY_MS);
		setTimeout(resolve, delay);
	});

const paginate = (
	cards: Card[],
	page: number,
	size: number
): PaginatedCardList => {
	const safePage = Math.max(1, Math.floor(page) || 1);
	const safeSize = Math.max(1, Math.floor(size) || 1);
	const start = (safePage - 1) * safeSize;
	const results = cards.slice(start, start + safeSize);

	return {
		count: cards.length,
		next:
			start + safeSize < cards.length
				? `http://mock.local/api/cards/?page=${safePage + 1}`
				: null,
		previous:
			safePage > 1
				? `http://mock.local/api/cards/?page=${safePage - 1}`
				: null,
		results,
	};
};

export const getInfinitePosts = async (
	page: number,
	size: number
): Promise<PaginatedCardList> => {
	await simulateNetworkDelay();
	return paginate(mockCards, page, size);
};

export const getIndividualPost = async (id: number) => {
	await simulateNetworkDelay();
	return mockCards.find((card) => card.id === id) ?? null;
};

export const getRelatedPosts = async (
	id: number,
	options: { page: number; size: number }
) => {
	await simulateNetworkDelay();
	const card = mockCards.find((mockCard) => mockCard.id === id);
	const relatedIds = new Set(card?.related ?? []);
	const relatedCards = mockCards.filter((mockCard) =>
		relatedIds.has(mockCard.id)
	);

	return paginate(relatedCards, options.page, options.size);
};
