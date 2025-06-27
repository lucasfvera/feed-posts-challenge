import { Card, CardTypeEnum } from '@/app/api/services/cards';

// Helper function to get mock cards by type
export const getCardsByType = (
	cardType: CardTypeEnum,
	cards: Card[]
): Card[] => {
	return cards.filter((card) => card.card_type === cardType);
};

// Helper function to get a single mock card by type
export const getCardByType = (
	cardType: CardTypeEnum,
	cards: Card[]
): Card | undefined => {
	return cards.find((card) => card.card_type === cardType);
};

// Helper function to get a mock card by ID
export const getCardById = (id: number, cards: Card[]): Card | undefined => {
	return cards.find((card) => card.id === id);
};
