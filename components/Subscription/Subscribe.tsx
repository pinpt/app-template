import { PrebuiltSubscriptionSubscribe, ISite, useSubscriptionCreator } from '@pinpt/react';
import { useRouter } from 'next/router';
import config from '../../pinpoint.config';
import Footer from '../Footer';
import Header from '../Header';
import { useCallback } from 'react';

const SubscriptionSubscribe = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const { query } = useSubscriptionCreator(site);

	const handleSubmit = useCallback(
		async (email: string) => {
			const res = await query(email, config);
			return res.subscribed;
		},
		[query]
	);

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

export default SubscriptionSubscribe;
