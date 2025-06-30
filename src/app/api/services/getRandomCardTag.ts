import { TagTypeEnum } from '@/app/api/services/cards';

export const getRandomCardTag = (): TagTypeEnum | undefined => {
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
