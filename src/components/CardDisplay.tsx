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
} from '@/app/api/services/cards';
import Image from 'next/image';
import { getEmbedUrl } from '@/helpers/getEmbedUrl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

const GenericCardDisplay = ({
	children,
	card,
	extendClassName,
}: {
	children: ReactNode;
	card: Card;
	extendClassName?: HTMLAttributes<HTMLDivElement>['className'];
}) => {
	const {
		content: { author, tag },
	} = card;
	const pathname = usePathname();
	const router = useRouter();
	const isSelected = pathname.includes(card.id.toString());

	return (
		<button
			onClick={() => {
				router.push(`/${card.id}`);
			}}
			className={`relative w-full sm:max-w-[600px] min-h-[200px] overflow-visible ${
				isSelected
					? 'bg-(--color-bg-card-active)'
					: 'bg-(--color-bg-card)'
			} rounded-2xl rounded-br-none  p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow hover:scale-102 transition-transform cursor-pointer ${extendClassName}`}
		>
			{/* TODO: Add a CTA to let the user label the element which will help us get better labels */}
			{tag && (
				<p className="text-sm absolute top-0 left-4 -translate-y-1/2 px-4 py-1 bg-blue-300 rounded-2xl">
					{tag}
				</p>
			)}
			<p className="text-sm absolute bottom-0 right-0 translate-y-full px-4 pb-2 bg-inherit rounded-b-lg">
				author: {author || 'Unknown'}
			</p>
			{children}
		</button>
	);
};

const ArticleCardDisplay = ({ articleCard }: { articleCard: ArticleCard }) => {
	const {
		content: { title, description, url },
	} = articleCard;

	// TODO: Should we show the thumbnail? Is it relevant to trigger interest?
	return (
		<GenericCardDisplay card={articleCard}>
			{title && <p className="text-2xl">{title}</p>}
			{description && <p>{description}</p>}
			<Link
				className="cursor-pointer w-fit flex gap-2 items-center text-blue-600 z-20"
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				onClick={(e) => e.stopPropagation()}
			>
				{'Read the full article'}
				<ExternalLink size={14} />
			</Link>
		</GenericCardDisplay>
	);
};

// TODO: handle the url to show a link (this differentiates it from the sublime post type)
const SocialCardDisplay = ({ socialCard }: { socialCard: SocialCard }) => {
	const { content } = socialCard;

	return (
		<GenericCardDisplay card={socialCard}>
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
			<GenericCardDisplay card={sublimeImageCard}>
				{'There was an error while loading the image'}
			</GenericCardDisplay>
		);
	// TODO: Check what alt text we can add
	return (
		<GenericCardDisplay
			card={sublimeImageCard}
			extendClassName="items-center"
		>
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
		<GenericCardDisplay card={sublimePostCard}>
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
		<GenericCardDisplay
			card={sublimeVideoCard}
			extendClassName="items-center"
		>
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
