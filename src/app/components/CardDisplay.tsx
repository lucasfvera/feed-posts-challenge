'use client';

import { HTMLAttributes, ReactNode, useState } from 'react';
import {
	Card,
	CardTypeEnum,
	ArticleCard,
	SocialCard,
	SublimeImageCard,
	SublimePostCard,
	SublimeVideoCard,
} from '../api/services/cards';
import Image from 'next/image';
import { getEmbedUrl } from '@/app/helpers/getEmbedUrl';

const GenericCardDisplay = ({
	children,
	extendClassName,
}: {
	children: ReactNode;
	extendClassName?: HTMLAttributes<HTMLDivElement>['className'];
}) => {
	return (
		<div
			className={`relative max-w-[600px] max-h-[700px] overflow-clip bg-gray-300 rounded-2xl p-6 min-h-[200px] flex flex-col gap-4 hover:shadow-xl transition-shadow hover:scale-102 transition-transform cursor-pointer ${extendClassName}`}
		>
			{children}
		</div>
	);
};

const ArticleCardDisplay = ({ articleCard }: { articleCard: ArticleCard }) => {
	const { content } = articleCard;

	// TODO: Should we show the thumbnail? Is it relevant to trigger interest?
	return (
		<GenericCardDisplay>
			{content.title && <p>{content.title}</p>}
			{content.description && <p>{content.description}</p>}
		</GenericCardDisplay>
	);
};

// TODO: handle the url to show a link (this differentiates it from the sublime post type)
const SocialCardDisplay = ({ socialCard }: { socialCard: SocialCard }) => {
	const { content } = socialCard;

	return (
		<GenericCardDisplay>
			{content.text}
			{content.videos &&
				content.videos.length > 0 &&
				content.videos.map((video, i) => (
					<video
						key={i}
						controls
						preload="none"
						poster={video.thumbnail || ''}
					>
						<source src={video.video_url} />
						{'Your browser does not support the video tag.'}
					</video>
				))}
			{/* TODO: Define how to handle multiple images scenarios, like 2 imgs */}
			{content.images &&
				content.images.length > 0 &&
				content.images.map((image, i) => <img key={i} src={image} />)}
		</GenericCardDisplay>
	);
};

const SublimeImageCardDisplay = ({
	sublimeImageCard,
}: {
	sublimeImageCard: SublimeImageCard;
}) => {
	const [hasError, setHasError] = useState(false);
	const { content } = sublimeImageCard;

	if (hasError)
		return (
			<GenericCardDisplay>
				{'There was an error while loading the image'}
			</GenericCardDisplay>
		);
	// TODO: Check what alt text we can add
	return (
		<GenericCardDisplay extendClassName="items-center">
			<Image
				onError={() => setHasError(true)}
				alt="Image Card"
				src={content.url}
				width={500}
				height={500}
			/>
		</GenericCardDisplay>
	);
};

const SublimePost = ({
	sublimePostCard,
}: {
	sublimePostCard: SublimePostCard;
}) => {
	const { content } = sublimePostCard;

	return (
		<GenericCardDisplay>
			{content.text && <p>{content.text}</p>}
			{content.videos &&
				content.videos.length > 0 &&
				content.videos.map((video, i) => (
					<video
						key={i}
						controls
						preload="none"
						poster={video.thumbnail || ''}
					>
						<source src={video.video_url} />
						{'Your browser does not support the video tag.'}
					</video>
				))}
			{/* TODO: Define how to handle multiple images scenarios, like 2 imgs */}
			{content.images &&
				content.images.length > 0 &&
				content.images.map((image, i) => <img key={i} src={image} />)}
		</GenericCardDisplay>
	);
};

const SublimeVideo = ({
	sublimeVideoCard,
}: {
	sublimeVideoCard: SublimeVideoCard;
}) => {
	const { content } = sublimeVideoCard;

	const embedUrl = getEmbedUrl(content.url);

	if (!embedUrl) return;
	return (
		<GenericCardDisplay extendClassName="items-center">
			<iframe
				loading="lazy"
				src={embedUrl}
				referrerPolicy="same-origin"
				width={500}
				height={500}
			></iframe>
		</GenericCardDisplay>
	);
};

export const CardDisplay = ({ card }: { card: Card }) => {
	switch (card.card_type) {
		case CardTypeEnum.Social:
			return <SocialCardDisplay socialCard={card} />;

		case CardTypeEnum.Article:
			return <ArticleCardDisplay articleCard={card} />;

		case CardTypeEnum.SublimeImage:
			return <SublimeImageCardDisplay sublimeImageCard={card} />;

		case CardTypeEnum.SublimePost:
			return <SublimePost sublimePostCard={card} />;

		case CardTypeEnum.SublimeVideo:
			return <SublimeVideo sublimeVideoCard={card} />;

		default:
			return null;
	}
};
