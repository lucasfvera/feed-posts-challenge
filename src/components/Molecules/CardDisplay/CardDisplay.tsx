'use client';

import { HTMLAttributes, ReactNode, useRef, useState } from 'react';
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
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

const GenericCardDisplay = ({
	children,
	card,
	extendClassName,
	ref,
}: {
	children: ReactNode;
	card: Card;
	extendClassName?: HTMLAttributes<HTMLDivElement>['className'];
	ref?: React.Ref<HTMLButtonElement>;
}) => {
	const {
		content: { author, tag },
	} = card;
	const pathname = usePathname();
	const linkRef = useRef<HTMLAnchorElement | null>(null);
	const isSelected = pathname.includes(card.id.toString());

	return (
		<button
			ref={ref}
			onClick={() => {
				if (linkRef.current) linkRef.current.click();
			}}
			className={`relative w-full sm:max-w-[600px] min-h-[200px] overflow-visible ${
				isSelected
					? 'bg-(--color-bg-card-active)'
					: 'bg-(--color-bg-card)'
			} rounded-2xl rounded-br-none  p-6 flex flex-col gap-4 hover:shadow-xl transition-all hover:scale-102 cursor-pointer ${extendClassName}`}
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
			{/* To ensure a better loading experience we add this Link to pre-fetch the next page the user could navigate to.
			This serves an instant loading page to the user until they fetch the actual page*/}
			<Link href={`/${card.id}`} ref={linkRef} />
		</button>
	);
};

const ArticleCardContent = ({ articleCard }: { articleCard: ArticleCard }) => {
	const {
		content: { title, description, url },
	} = articleCard;

	// TODO: Should we show the thumbnail? Is it relevant to trigger interest?
	return (
		<>
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
		</>
	);
};

// TODO: handle the url to show a link (this differentiates it from the sublime post type)
const SocialCardContent = ({ socialCard }: { socialCard: SocialCard }) => {
	const { content } = socialCard;

	return (
		<>
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
		</>
	);
};

const SublimeImageCardContent = ({
	sublimeImageCard,
}: {
	sublimeImageCard: SublimeImageCard;
}) => {
	const [hasError, setHasError] = useState(false);
	const { content } = sublimeImageCard;

	if (hasError) return <>{'There was an error while loading the image'}</>;

	// TODO: Check what alt text we can add
	return (
		<Image
			onError={() => setHasError(true)}
			alt="Image Card"
			src={content.url}
			width={500}
			height={500}
		/>
	);
};

const SublimePostContent = ({
	sublimePostCard,
}: {
	sublimePostCard: SublimePostCard;
}) => {
	const { content } = sublimePostCard;

	return (
		<>
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
		</>
	);
};

const SublimeVideoContent = ({
	sublimeVideoCard,
}: {
	sublimeVideoCard: SublimeVideoCard;
}) => {
	const { content } = sublimeVideoCard;

	const embedUrl = getEmbedUrl(content.url);

	if (!embedUrl) return null;

	return (
		<iframe
			loading="lazy"
			src={embedUrl}
			referrerPolicy="same-origin"
			width={500}
			height={500}
		></iframe>
	);
};

export const CardDisplay = ({
	card,
	ref,
}: {
	card: Card;
	ref?: React.Ref<HTMLButtonElement>;
}) => {
	let content: ReactNode;
	let extendClassName: string | undefined;

	switch (card.card_type) {
		case CardTypeEnum.Social:
			content = <SocialCardContent socialCard={card} />;
			break;

		case CardTypeEnum.Article:
			content = <ArticleCardContent articleCard={card} />;
			break;

		case CardTypeEnum.SublimeImage:
			content = <SublimeImageCardContent sublimeImageCard={card} />;
			extendClassName = 'items-center';
			break;

		case CardTypeEnum.SublimePost:
			content = <SublimePostContent sublimePostCard={card} />;
			break;

		case CardTypeEnum.SublimeVideo:
			content = <SublimeVideoContent sublimeVideoCard={card} />;
			extendClassName = 'items-center';
			break;

		default:
			return null;
	}

	return (
		<GenericCardDisplay
			ref={ref}
			card={card}
			extendClassName={extendClassName}
		>
			{content}
		</GenericCardDisplay>
	);
};
