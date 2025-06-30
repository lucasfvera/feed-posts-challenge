import type { Metadata } from 'next';
import { Raleway, Bitter } from 'next/font/google';
import './globals.css';
import NavigationBar from '@/components/NavigationBar';

const raleway = Raleway({
	variable: '--font-raleway-sans',
	subsets: ['latin'],
});

const bitter = Bitter({
	variable: '--font-bitter-serif',
	subsets: ['latin'],
});
export const metadata: Metadata = {
	title: 'Sublime Feed',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${raleway.variable} ${bitter.variable} font-bitter antialiased py-16 px-4 sm:p-16 flex flex-col items-center bg-(--color-bg-feed)`}
			>
				<NavigationBar />
				{children}
			</body>
		</html>
	);
}
