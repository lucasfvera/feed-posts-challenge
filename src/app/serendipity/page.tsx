import { getInfinitePosts } from '@/app/api/services/actions';
import { PanContainer } from '@/components/Pan';

export default async function Home() {
	await getInfinitePosts(1, 100);
	return (
		<>
			<PanContainer />
		</>
	);
}
