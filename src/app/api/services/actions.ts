'use server';

import { SublimeService } from '@/app/api/services/sublimeService';

// This way we ensure we have a single instantiation of the service that
// would run on the server so we don't need to worry about sensible information
// being passed down to it like credentials
const service = new SublimeService({
	baseUrl: 'http://54.198.139.161',
});

export const getInfinitePosts = async (page: number, size: number) => {
	try {
		const { data } = await service.api.cardsList({ page, page_size: size });
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const getIndividualPost = async (id: number) => {
	try {
		const { data } = await service.api.cardsRetrieve(id);
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const getRelatedPosts = async (
	id: number,
	options: { page: number; size: number }
) => {
	try {
		const { data } = await service.api.cardsRelatedCardsList(id, {
			...options,
		});
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};
