'use client';

import { useEffect, useRef } from 'react';

export function PanContainer() {
	const containerRef = useRef<HTMLDivElement>(null);

	let isDown = false;
	let startX: number, startY: number, scrollLeft: number, scrollTop: number;
	useEffect(() => {
		if (!containerRef.current) return;

		containerRef.current.scrollTo(
			containerRef.current.scrollWidth / 2 -
				containerRef.current.clientWidth / 2,
			containerRef.current.scrollHeight / 2 -
				containerRef.current.clientHeight / 2
		);
	}, [containerRef]);

	const handleMouseMove = (e: MouseEvent) => {
		if (!containerRef.current) return;

		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - containerRef.current.offsetLeft;
		const y = e.pageY - containerRef.current.offsetTop;
		const walkX = x - startX;
		const walkY = y - startY;
		containerRef.current.scrollLeft = scrollLeft - walkX;
		containerRef.current.scrollTop = scrollTop - walkY;
	};

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;

		isDown = true;
		containerRef.current.classList.add('cursor-grabbing');
		startX = e.pageX - containerRef.current.offsetLeft;
		startY = e.pageY - containerRef.current.offsetTop;
		scrollLeft = containerRef.current.scrollLeft;
		scrollTop = containerRef.current.scrollTop;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	};

	const onMouseUp = () => {
		if (!containerRef.current) return;

		isDown = false;
		containerRef.current.classList.remove('cursor-grabbing');
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	};

	const BOX_SIZE = 100;
	const GRID = `grid-cols-10 grid-col-[repeat(10,100px)] grid-rows-[repeat(10,100px)] gap-[100px]`;
	const BOX = `w-[${BOX_SIZE}px] h-[${BOX_SIZE}px]`;

	return (
		<div
			ref={containerRef}
			className="w-full h-screen overflow-auto cursor-grab"
			onMouseDown={onMouseDown}
			style={{ userSelect: 'none' }}
		>
			<div className="w-[3000px] h-[3000px] relative">
				<div
					className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid ${GRID}`}
				>
					{Array.from({ length: 100 }).map((_, i) => (
						<div
							key={i}
							className={`${BOX} bg-(--color-bg-card) border-2 flex items-center justify-center text-xl font-bold`}
						>
							{i + 1}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
