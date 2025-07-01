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

export const getRandomCardTagById = (id: number): TagTypeEnum | undefined => {
	const mockedTags = [
		'Productivity',
		'JustForFun',
		'Wellness',
		'Inspiration',
		'ThoughtProvoking',
	] as const;

	const randomIndex = deterministicRange(id);

	return randomIndex === 5 ? undefined : TagTypeEnum[mockedTags[randomIndex]];
};

function deterministicRange(value: number, max: number = 5): number {
	const str = value.toString();
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	}
	const positiveHash = Math.abs(hash);
	return positiveHash % (max + 1);
}
