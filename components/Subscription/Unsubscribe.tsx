import { PrebuiltSubscriptionUnsubscribe, ISite, useSubscription, Loader, useSubscriptionUpdater } from '@pinpt/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import config from '../../pinpoint.config';
import Footer from '../Footer';
import Header from '../Header';

const SubscriptionUnsubscribe = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const subscriptionId = router.query.id as string;
	const { subscription, loading, refetch } = useSubscription(subscriptionId, site, config);
	const { query } = useSubscriptionUpdater(subscriptionId, site, config);

	const handleSubscribe = useCallback(async () => {
		await query({ subscribed: true });
		await refetch();
	}, [query, refetch]);

	const handleUnSubscribe = useCallback(async () => {
		await query({ subscribed: false });
		await refetch();
	}, [query, refetch]);

	const handleManageSubscriptions = useCallback(() => {
		router.push(`/subscription/${subscriptionId}/manage`);
	}, [router, subscriptionId]);

	if (loading) {
		return <Loader />;
	}

	return (
		<PrebuiltSubscriptionUnsubscribe
			site={site}
			email={subscription.email}
			renderHeader={(site) => <Header site={site} noSubscribe />}
			renderFooter={(site) => <Footer site={site} noSubscribe />}
			handleSelectHome={() => router.push('/')}
			handleSubscribe={handleSubscribe}
			handleUnsubscribe={handleUnSubscribe}
			subscribed={subscription.subscribed}
			manageSubscriptions={handleManageSubscriptions}
			className="flex flex-col h-screen"
		/>
	);
};

export default SubscriptionUnsubscribe;
