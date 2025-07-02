import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardDisplay } from '../CardDisplay';
import { CardTypeEnum, ArticleCard } from '@/app/api/services/cards';
import { getEmbedUrl } from '@/helpers/getEmbedUrl';
import {
	mockArticleCard,
	mockSocialCard,
	mockSublimeImageCard,
	mockSublimePostCard,
	mockSublimeVideoCard,
} from '@/components/Molecules/CardDisplay/mockedData';

jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
}));

jest.mock('next/image', () => {
	return function MockImage({ src, alt, ...props }: any) {
		return <img src={src} alt={alt} {...props} />;
	};
});

jest.mock('next/link', () => {
	return function MockLink({ children, href, ...props }: any) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	};
});

jest.mock('@/helpers/getEmbedUrl');

describe('CardDisplay', () => {
	beforeEach(() => {
		const mockUsePathname = jest.requireMock('next/navigation').usePathname;
		mockUsePathname.mockReturnValue('/');
		(getEmbedUrl as jest.Mock).mockReturnValue(
			'https://www.youtube.com/embed/dQw4w9WgXcQ'
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Article Card', () => {
		it('should render article card with title, description, and external link', () => {
			// Act
			render(<CardDisplay card={mockArticleCard} />);

			// Assert
			const titleElement = screen.getByText('Test Article Title');
			const descriptionElement = screen.getByText(
				'Test article description'
			);
			const authorElement = screen.getByText('author: Test Author');
			const tagElement = screen.getByText('Productivity');
			const externalLink = screen.getByText('Read the full article');

			expect(titleElement).toBeInTheDocument();
			expect(descriptionElement).toBeInTheDocument();
			expect(authorElement).toBeInTheDocument();
			expect(tagElement).toBeInTheDocument();
			expect(externalLink).toBeInTheDocument();
			expect(externalLink).toHaveAttribute(
				'href',
				'https://example.com/article'
			);
			expect(externalLink).toHaveAttribute('target', '_blank');
		});

		it('should handle article card without title and description', () => {
			// Arrange
			const cardWithoutTitle = {
				...mockArticleCard,
				content: {
					...mockArticleCard.content,
					title: null,
					description: null,
				},
			};

			// Act
			render(<CardDisplay card={cardWithoutTitle} />);

			// Assert
			const externalLink = screen.getByText('Read the full article');
			expect(externalLink).toBeInTheDocument();
		});

		it('should handle article card without author', () => {
			// Arrange
			const cardWithoutAuthor = {
				...mockArticleCard,
				content: {
					...mockArticleCard.content,
					author: null,
				},
			};

			// Act
			render(<CardDisplay card={cardWithoutAuthor} />);

			// Assert
			const authorElement = screen.getByText('author: Unknown');
			expect(authorElement).toBeInTheDocument();
		});

		it('should handle article card without tag', () => {
			// Arrange
			const cardWithoutTag = {
				...mockArticleCard,
				content: {
					...mockArticleCard.content,
					tag: undefined,
				},
			};

			// Act
			render(<CardDisplay card={cardWithoutTag} />);

			// Assert
			const tagElement = screen.queryByText('Productivity');
			expect(tagElement).not.toBeInTheDocument();
		});
	});

	describe('Social Card', () => {
		it('should render social card with text, images, and videos', () => {
			// Act
			render(<CardDisplay card={mockSocialCard} />);

			// Assert
			const textElement = screen.getByText('Test social post content');
			const authorElement = screen.getByText('author: Social Author');
			const tagElement = screen.getByText('Just for Fun');
			const images = screen.getAllByRole('img');
			const videos = screen.getAllByTestId('video-element');

			expect(textElement).toBeInTheDocument();
			expect(authorElement).toBeInTheDocument();
			expect(tagElement).toBeInTheDocument();
			expect(images).toHaveLength(2);
			expect(videos).toHaveLength(1);
			expect(images[0]).toHaveAttribute(
				'src',
				'https://example.com/image1.jpg'
			);
			expect(images[1]).toHaveAttribute(
				'src',
				'https://example.com/image2.jpg'
			);
			expect(videos[0]).toHaveAttribute(
				'poster',
				'https://example.com/thumbnail.jpg'
			);
		});

		it('should handle social card without images and videos', () => {
			// Arrange
			const cardWithoutMedia = {
				...mockSocialCard,
				content: {
					...mockSocialCard.content,
					images: null,
					videos: null,
				},
			};

			// Act
			render(<CardDisplay card={cardWithoutMedia} />);

			// Assert
			const textElement = screen.getByText('Test social post content');
			const images = screen.queryAllByRole('img');
			const videos = screen.queryAllByRole('video');

			expect(textElement).toBeInTheDocument();
			expect(images).toHaveLength(0);
			expect(videos).toHaveLength(0);
		});
	});

	describe('Sublime Image Card', () => {
		it('should render sublime image card with image', () => {
			// Arrange
			const user = userEvent.setup();

			// Act
			render(<CardDisplay card={mockSublimeImageCard} />);

			// Assert
			const imageElement = screen.getByRole('img');
			const authorElement = screen.getByText('author: Image Author');
			const tagElement = screen.getByText('Inspiration');

			expect(imageElement).toBeInTheDocument();
			expect(imageElement).toHaveAttribute(
				'src',
				'https://example.com/sublime-image.jpg'
			);
			expect(imageElement).toHaveAttribute('alt', 'Image Card');
			expect(authorElement).toBeInTheDocument();
			expect(tagElement).toBeInTheDocument();
		});

		it('should show error message when image fails to load', async () => {
			// Arrange
			const user = userEvent.setup();

			// Act
			render(<CardDisplay card={mockSublimeImageCard} />);

			const imageElement = screen.getByRole('img');
			fireEvent.error(imageElement);

			// Assert
			const errorMessage = await screen.findByText(
				'There was an error while loading the image'
			);
			expect(errorMessage).toBeInTheDocument();
		});
	});

	describe('Sublime Post Card', () => {
		it('should render sublime post card with text, images, and videos', () => {
			// Arrange
			const user = userEvent.setup();

			// Act
			render(<CardDisplay card={mockSublimePostCard} />);

			// Assert
			const textElement = screen.getByText('Test sublime post text');
			const authorElement = screen.getByText('author: Post Author');
			const tagElement = screen.getByText('Thought-Provoking');
			const images = screen.getAllByRole('img');
			const videos = screen.getAllByTestId('video-element');

			expect(textElement).toBeInTheDocument();
			expect(authorElement).toBeInTheDocument();
			expect(tagElement).toBeInTheDocument();
			expect(images).toHaveLength(1);
			expect(videos).toHaveLength(1);
			expect(images[0]).toHaveAttribute(
				'src',
				'https://example.com/post-image.jpg'
			);
			expect(videos[0]).toHaveAttribute(
				'poster',
				'https://example.com/post-thumbnail.jpg'
			);
		});

		it('should handle sublime post card without text', () => {
			// Arrange
			const cardWithoutText = {
				...mockSublimePostCard,
				content: {
					...mockSublimePostCard.content,
					text: null,
				},
			};

			// Act
			render(<CardDisplay card={cardWithoutText} />);

			// Assert
			const textElement = screen.queryByText('Test sublime post text');
			expect(textElement).not.toBeInTheDocument();
		});
	});

	describe('Sublime Video Card', () => {
		it('should render sublime video card with embedded iframe', () => {
			// Arrange
			const user = userEvent.setup();

			// Act
			render(<CardDisplay card={mockSublimeVideoCard} />);

			// Assert
			const iframeElement = screen.getByTestId('video-iframe');
			const authorElement = screen.getByText('author: Video Author');
			const tagElement = screen.getByText('Wellness');

			expect(iframeElement).toBeInTheDocument();
			expect(iframeElement).toHaveAttribute(
				'src',
				'https://www.youtube.com/embed/dQw4w9WgXcQ'
			);
			expect(iframeElement).toHaveAttribute('loading', 'lazy');
			expect(iframeElement).toHaveAttribute(
				'referrerPolicy',
				'same-origin'
			);
			expect(authorElement).toBeInTheDocument();
			expect(tagElement).toBeInTheDocument();
		});

		it('should not render iframe when getEmbedUrl returns null', () => {
			// Arrange
			(getEmbedUrl as jest.Mock).mockReturnValue(null);

			// Act
			render(<CardDisplay card={mockSublimeVideoCard} />);

			// Assert
			const iframeElement = screen.queryByRole('iframe');
			expect(iframeElement).not.toBeInTheDocument();
		});
	});

	describe('Card Selection State', () => {
		it('should apply active background when card is selected', () => {
			// Arrange
			const mockUsePathname =
				jest.requireMock('next/navigation').usePathname;
			mockUsePathname.mockReturnValue('/1');

			// Act
			render(<CardDisplay card={mockArticleCard} />);

			// Assert
			const cardButton = screen.getByRole('button');
			expect(cardButton).toHaveClass('bg-(--color-bg-card-active)');
		});

		it('should apply default background when card is not selected', () => {
			// Arrange
			const mockUsePathname =
				jest.requireMock('next/navigation').usePathname;
			mockUsePathname.mockReturnValue('/');

			// Act
			render(<CardDisplay card={mockArticleCard} />);

			// Assert
			const cardButton = screen.getByRole('button');
			expect(cardButton).toHaveClass('bg-(--color-bg-card)');
		});
	});

	describe('Card Interactions', () => {
		it('should navigate to card detail page when clicked', async () => {
			// Arrange
			const user = userEvent.setup();

			// Act
			render(<CardDisplay card={mockArticleCard} />);

			const cardButton = screen.getByRole('button');
			await user.click(cardButton);

			// Assert
			const linkElement = screen.getByTestId('navigation-link');
			expect(linkElement).toHaveAttribute('href', '/1');
		});

		it('should not trigger navigation when external link is clicked', async () => {
			// Arrange
			const user = userEvent.setup();

			// Act
			render(<CardDisplay card={mockArticleCard} />);

			const externalLink = screen.getByText('Read the full article');
			await user.click(externalLink);

			// Assert
			expect(externalLink).toHaveAttribute('target', '_blank');
			expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
		});
	});

	describe('Edge Cases', () => {
		it('should return null for unknown card type', () => {
			// Arrange
			const unknownCard = {
				...mockArticleCard,
				card_type: 'unknown' as any,
			};

			// Act
			const { container } = render(<CardDisplay card={unknownCard} />);

			// Assert
			expect(container.firstChild).toBeNull();
		});

		it('should handle card with missing content properties', () => {
			// Arrange
			const incompleteCard: ArticleCard = {
				id: 6,
				card_type: CardTypeEnum.Article,
				content: {
					url: 'https://example.com',
				},
				created_at: '2023-01-01T00:00:00Z',
				updated_at: '2023-01-01T00:00:00Z',
				related: [],
				notes: [],
				slug: 'incomplete-card',
			};

			// Act
			render(<CardDisplay card={incompleteCard} />);

			// Assert
			const externalLink = screen.getByText('Read the full article');
			const authorElement = screen.getByText('author: Unknown');
			expect(externalLink).toBeInTheDocument();
			expect(authorElement).toBeInTheDocument();
		});
	});
});
