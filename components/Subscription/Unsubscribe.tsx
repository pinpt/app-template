import {
	PrebuiltSubscriptionUnsubscribe,
	ISite,
	useSubscription,
	Loader,
	useSubscriptionUpdater,
	getRouterRelativePath,
} from '@pinpt/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import config from '../../pinpoint.config';
import Footer from '../Footer';
import Header from '../Header';

const SubscriptionUnsubscribe = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const subscriptionId = router.query.id as string;
	const { subscription, loading, refetch } = useSubscription(subscriptionId, site, config);
	const { query } = useSubscriptionUpdater(subscriptionId, site, config);
	const [pending, setPending] = useState(false);

	const handleSubscribe = useCallback(async () => {
		try {
			setPending(true);
			await query({ subscribed: true });
			await refetch();
		} finally {
			setPending(false);
		}
	}, [query, refetch]);

	const handleUnSubscribe = useCallback(async () => {
		try {
			setPending(true);
			await query({ subscribed: false });
			await refetch();
		} finally {
			setPending(false);
		}
	}, [query, refetch]);

	const handleManageSubscriptions = useCallback(() => {
		router.push(getRouterRelativePath(site, `/subscription/${subscriptionId}/manage`));
	}, [router, subscriptionId, site]);

	if (loading) {
		return <Loader />;
	}

	return (
		<PrebuiltSubscriptionUnsubscribe
			site={site}
			email={subscription.email}
			renderHeader={(site) => <Header site={site} noSubscribe />}
			renderFooter={(site) => <Footer site={site} noSubscribe />}
			handleSelectHome={() => router.push(getRouterRelativePath(site, '/'))}
			handleSubscribe={handleSubscribe}
			handleUnsubscribe={handleUnSubscribe}
			subscribed={subscription.subscribed}
			manageSubscriptions={handleManageSubscriptions}
			className="flex flex-col h-screen"
			pending={pending}
		/>
	);
};

export default SubscriptionUnsubscribe;
