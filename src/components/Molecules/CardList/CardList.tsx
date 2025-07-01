'use client';

import { Card } from '@/app/api/services/cards';
import { getRandomCardTagById } from '@/app/api/services/getRandomCardTag';
import { CardDisplay } from '@/components/Molecules/CardDisplay/CardDisplay';
import { CardLoadingSkeleton } from '@/components/Atoms/CardLoading';
import { EmptyState } from '@/components/Molecules/CardList/EmptyState';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const PAGE_SIZE = 10;

export const CardList = ({
	cards,
	cardsFetcherAction,
}: {
	cards: Card[];
	cardsFetcherAction: (page: number, page_size: number) => Promise<any>;
}) => {
	const [offset, setOffset] = useState(0);
	const [posts, setPosts] = useState(cards);
	const [isLoading, setIsLoading] = useState(false);
	const { ref, inView, entry } = useInView();

	const loadMorePosts = async () => {
		setIsLoading(true);
		const nextPagePosts = await cardsFetcherAction(offset + 2, PAGE_SIZE);
		if (!nextPagePosts) return;
		setPosts((posts) => [...posts, ...nextPagePosts.results]);
		setOffset((offset) => offset + 1);
	};

	useEffect(() => {
		if (inView) {
			loadMorePosts().finally(() => setIsLoading(false));
		}
	}, [inView, entry]);

	// Show empty state if no cards
	if (!cards || cards.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className="flex flex-col gap-12 w-full items-center relative">
			{posts.map((post, index) => {
				post.content.tag = getRandomCardTagById(post.id);
				return (
					<CardDisplay
						key={post.id}
						// We set the observer to the element in the
						// middle of the list to ensure we have
						// the next page before the user gets to the bottom
						ref={
							Math.floor(5 + PAGE_SIZE * offset) === index + 1
								? ref
								: null
						}
						card={post}
					/>
				);
			})}
			{isLoading && <CardLoadingSkeleton />}
			{/* TODO: We could add a message for when the user reaches the end
			of the list of posts to ensure that they know there are no more
			posts */}
		</div>
	);
};
