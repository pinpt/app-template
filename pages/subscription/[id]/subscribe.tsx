import { PrebuiltSubscriptionSubscribe, fetchContentPaginated, ISite } from '@pinpt/react';
import { useRouter } from 'next/router';
import config from '../../../pinpoint.config';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { useCallback } from 'react';

const Subscribe = ({ site }: { site: ISite }) => {
	const router = useRouter();

	const handleSubmit = useCallback(async (email: string) => {
		console.log(email, 'submitting');
	}, []);

	return (
		<PrebuiltSubscriptionSubscribe
			site={site}
			renderHeader={(site) => <Header site={site} noSubscribe />}
			renderFooter={(site) => <Footer site={site} noSubscribe />}
			handleSelectHome={() => router.push('/')}
			className="flex flex-col h-screen"
			contentClassName="flex-grow"
			handleSubmit={handleSubmit}
		/>
	);
};

export default Subscribe;

export async function getServerSideProps() {
	const pageSize = config.pageSize ?? 11;
	const { site } = await fetchContentPaginated(config, {
		limit: pageSize,
		after: true,
		site: true,
	});

	return {
		props: {
			site,
		},
	};
}
