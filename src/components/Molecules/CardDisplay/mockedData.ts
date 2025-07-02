import {
	ArticleCard,
	CardTypeEnum,
	SocialCard,
	SublimeImageCard,
	SublimePostCard,
	SublimeVideoCard,
	TagTypeEnum,
} from '@/app/api/services/cards';

export const mockArticleCard: ArticleCard = {
	id: 1,
	card_type: CardTypeEnum.Article,
	content: {
		title: 'Test Article Title',
		description: 'Test article description',
		url: 'https://example.com/article',
		author: 'Test Author',
		tag: TagTypeEnum.Productivity,
	},
	created_at: '2023-01-01T00:00:00Z',
	updated_at: '2023-01-01T00:00:00Z',
	related: [],
	notes: [],
	slug: 'test-article',
};

export const mockSocialCard: SocialCard = {
	id: 2,
	card_type: CardTypeEnum.Social,
	content: {
		text: 'Test social post content',
		url: 'https://example.com/social',
		author: 'Social Author',
		tag: TagTypeEnum.JustForFun,
		images: [
			'https://example.com/image1.jpg',
			'https://example.com/image2.jpg',
		],
		videos: [
			{
				video_url: 'https://example.com/video.mp4',
				thumbnail: 'https://example.com/thumbnail.jpg',
			},
		],
	},
	created_at: '2023-01-00T00:00:00Z',
	updated_at: '2023-01-01T00:00:00Z',
	related: [],
	notes: [],
	slug: 'test-social',
};

export const mockSublimeImageCard: SublimeImageCard = {
	id: 3,
	card_type: CardTypeEnum.SublimeImage,
	content: {
		url: 'https://example.com/sublime-image.jpg',
		author: 'Image Author',
		tag: TagTypeEnum.Inspiration,
	},
	created_at: '2023-01-01T00:00:00Z',
	updated_at: '2023-01-01T00:00:00Z',
	related: [],
	notes: [],
	slug: 'test-image',
};

export const mockSublimePostCard: SublimePostCard = {
	id: 4,
	card_type: CardTypeEnum.SublimePost,
	content: {
		text: 'Test sublime post text',
		author: 'Post Author',
		tag: TagTypeEnum.ThoughtProvoking,
		images: ['https://example.com/post-image.jpg'],
		videos: [
			{
				video_url: 'https://example.com/post-video.mp4',
				thumbnail: 'https://example.com/post-thumbnail.jpg',
			},
		],
	},
	created_at: '2023-01-01T00:00:00Z',
	updated_at: '2023-01-01T00:00:00Z',
	related: [],
	notes: [],
	slug: 'test-post',
};

export const mockSublimeVideoCard: SublimeVideoCard = {
	id: 5,
	card_type: CardTypeEnum.SublimeVideo,
	content: {
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		thumbnail: 'https://example.com/video-thumbnail.jpg',
		author: 'Video Author',
		tag: TagTypeEnum.Wellness,
	},
	created_at: '2023-01-01T00:00:00Z',
	updated_at: '2023-01-01T00:00:00Z',
	related: [],
	notes: [],
	slug: 'test-video',
};
