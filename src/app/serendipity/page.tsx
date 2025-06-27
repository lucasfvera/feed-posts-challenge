import { SublimeService } from '@/app/api/services/sublimeService';
import { PanContainer } from '@/app/components/Pan';

export default async function Home() {
	const service = new SublimeService({
		baseUrl: 'http://54.198.139.161',
	});
	const { data } = await service.api.cardsList({ page_size: 100 });
	const posts = data.results;
	return (
		<>
			<PanContainer />
		</>
	);
}
