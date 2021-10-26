import {
	PrebuiltSubscriptionSubscribe,
	fetchContentPaginated,
	ISite,
	executeAPI,
	getRouterAbsolutePath,
	useSubscriptionCreator,
} from '@pinpt/react';
import { useRouter } from 'next/router';
import config from '../pinpoint.config';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useCallback, useState } from 'react';

const Subscribe = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const { loading, query } = useSubscriptionCreator(site);
	const [subscribed, setSubscribed] = useState<boolean>(false);

	const handleSubmit = useCallback(
		async (email: string) => {
			const res = await query(email, config);
			setSubscribed(res.subscribed);
		},
		[query]
	);

	console.log(loading);

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
