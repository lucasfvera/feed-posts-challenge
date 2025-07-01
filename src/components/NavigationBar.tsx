'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
	const pathname = usePathname();

	const navItems = [
		{ href: '/', label: 'Home', icon: '🏠' },
		{ href: '/serendipity', label: 'Serendipity', icon: '🎲' },
	];

	return (
		<nav className="fixed right-8 top-1/4 transform -translate-y-1/2 z-50">
			<div className="relative flex flex-col gap-4 justify-end">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					const activeClass = isActive
						? 'text-white shadow-md bg-blue-300'
						: 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 hover:shadow-md';

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`relative flex items-center justify-center transition-all duration-200 text-center rounded-full min-w-[150px] ${activeClass}`}
							title={item.label}
						>
							<span className={`text-lg p-4`}>{item.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
