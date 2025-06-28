import { CardTypeEnum, TagTypeEnum } from '@/app/api/services/cards';
import { getCardsByType } from '@/app/helpers/cardsFilters';
import { SublimeService } from '@/app/api/services/sublimeService';
import { CardDisplay } from '@/app/components/CardDisplay';

const getRandomTag = (): TagTypeEnum | undefined => {
	const mockedTags = [
		'Productivity',
		'JustForFun',
		'Wellness',
		'Inspiration',
		'ThoughtProvoking',
	] as const;

	const randomIndex = Math.floor(Math.random() * 6);

	return randomIndex === 5 ? undefined : TagTypeEnum[mockedTags[randomIndex]];
};

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
	console.log(data.results.length);
	console.log(data2.results.length);
	console.log(data3.results.length);
	const posts = [...data.results, ...data2.results, ...data3.results];

	const newPosts = [
		...getCardsByType(CardTypeEnum.Article, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.Social, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.SublimeImage, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.SublimePost, posts).slice(0, 5),
		...getCardsByType(CardTypeEnum.SublimeVideo, posts).slice(0, 5),
	];

	return (
		<div className="flex flex-col gap-12 w-full items-center">
			{newPosts.map((post) => {
				post.content.tag = getRandomTag();
				return <CardDisplay key={post.id} card={post} />;
			})}
		</div>
	);
}
