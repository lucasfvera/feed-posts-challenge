import Link from 'next/link';

interface EmptyStateProps {
	title?: string;
	message?: string;
	ctaText?: string;
	ctaHref?: string;
}

export const EmptyState = ({
	title = 'No cards found',
	message = 'It looks like there are no cards related to this one.',
	ctaText = 'Try Serendipity Mode',
	ctaHref = '/serendipity',
}: EmptyStateProps) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
			<div className="max-w-md">
				{/* Icon */}
				<div className="mb-6">
					<div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
						<span className="text-2xl">📭</span>
					</div>
				</div>

				{/* Title */}
				<h2 className="text-2xl font-abhaya font-medium text-gray-900 mb-3">
					{title}
				</h2>

				{/* Message */}
				<p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

				{/* CTA Button */}
				<Link
					href={ctaHref}
					className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
				>
					{ctaText}
					<span className="ml-2">→</span>
				</Link>
			</div>
		</div>
	);
};
