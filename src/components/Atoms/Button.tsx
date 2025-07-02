import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkButtonProps {
	children: ReactNode;
	href: string;
}

// TODO: Extend props to accept the same or most of original Link props
export const LinkButton = ({ children, href }: LinkButtonProps) => {
	return (
		<Link
			href={href}
			className="inline-flex gap-2 items-center px-4 py-2 bg-(--color-primary-button) text-black font-medium rounded-full hover:bg-(--color-primary-button-hover) transition-colors duration-200"
		>
			{children}
		</Link>
	);
};
