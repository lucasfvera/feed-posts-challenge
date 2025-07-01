export const CardLoadingSkeleton = () => (
	<div
		className={`bg-(--color-bg-card) w-full sm:max-w-[600px] min-h-[200px] rounded-2xl p-6 flex flex-col justify-center`}
	>
		<div className="animate-pulse flex flex-col gap-4">
			<div className="h-4 w-full bg-(--color-primary) rounded-full"></div>
			<div className="h-4 w-full bg-(--color-primary) rounded-full"></div>
			<div className="h-4 w-full bg-(--color-primary) rounded-full"></div>
			<div className="h-4 w-full bg-(--color-primary) rounded-full"></div>
		</div>
	</div>
);
