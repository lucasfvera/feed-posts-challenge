import { LinkButton } from '@/components/Atoms/Button';
import { PackageOpen } from 'lucide-react';

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
				<div className="mb-6">
					<div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
						<PackageOpen size={32} />
					</div>
				</div>
				<h2 className="text-2xl font-abhaya font-medium text-gray-900 mb-3">
					{title}
				</h2>
				<p className="text-gray-600 mb-8 leading-relaxed">{message}</p>
				<LinkButton href={ctaHref}>
					{ctaText}
					<span className="ml-2">→</span>
				</LinkButton>
			</div>
		</div>
	);
};
