import { PrebuiltSubscriptionManage, ISite, Loader, useSubscriptionList, useSubscriptionUpdater } from '@pinpt/react';
import config from '../../pinpoint.config';
import Footer from '../Footer';
import Header from '../Header';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

const SubscriptionManage = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const subscriptionId = (router.query.id ?? '') as string;
	const { result, loading, fileApi, refetch } = useSubscriptionList(subscriptionId, site, config);
	const { query } = useSubscriptionUpdater(subscriptionId, site, config);
	const [pendingState, setPendingState] = useState<Record<string, boolean>>({});

	const handleUnsubscribe = useCallback(
		async (id: string) => {
			setPendingState((s) => ({ ...s, [id]: true }));
			await query({ subscribed: false }, id);
			await refetch();
			setPendingState((s) => ({ ...s, [id]: false }));
		},
		[query, refetch]
	);

	const handleResubscribe = useCallback(
		async (id: string) => {
			setPendingState((s) => ({ ...s, [id]: true }));
			await query({ subscribed: true }, id);
			await refetch();
			setPendingState((s) => ({ ...s, [id]: false }));
		},
		[query, refetch]
	);

	if (loading) {
		return <Loader />;
	}

	return (
		<PrebuiltSubscriptionManage
			site={site}
			subscriptions={result}
			renderHeader={(site) => <Header site={site} noSubscribe />}
			renderFooter={(site) => <Footer site={site} noSubscribe />}
			handleSelectHome={() => router.push('/')}
			handleClickUpdate={() => router.push(`/subscription/${subscriptionId}/verify`)}
			handleClickUnsubscribe={handleUnsubscribe}
			handleClickReSubscribe={handleResubscribe}
			className="flex flex-col h-screen"
			fileApi={fileApi}
			pendingState={pendingState}
		/>
	);
};

export default SubscriptionManage;
