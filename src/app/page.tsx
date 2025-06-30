import { CardTypeEnum } from '@/app/api/services/cards';
import { getCardsByType } from '@/helpers/cardsFilters';
import { SublimeService } from '@/app/api/services/sublimeService';
import { CardList } from '@/components/CardList';

export default async function Home() {
	const service = new SublimeService({
		baseUrl: 'http://54.198.139.161',
	});
	const { data } = await service.api.cardsList({ page: 1, page_size: 100 });
	const { data: data2 } = await service.api.cardsList({
		page: 2,
		page_size: 200,
	});
	const { data: data3 } = await service.api.cardsList({
		page: 3,
		page_size: 200,
	});
	const posts = [...data.results, ...data2.results, ...data3.results];

	const newPosts = [
		...getCardsByType(CardTypeEnum.Article, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.Social, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.SublimeImage, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.SublimePost, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.SublimeVideo, posts).slice(0, 5),
	];

	return <CardList cards={newPosts} />;
}
