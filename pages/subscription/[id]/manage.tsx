import {
	PrebuiltSubscriptionManage,
	fetchContentPaginated,
	ISite,
	Loader,
	useSubscriptionList,
	useSubscriptionUpdater,
} from '@pinpt/react';
import config from '../../../pinpoint.config';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const Manage = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const subscriptionId = (router.query.id ?? '') as string;
	const { result, loading, fileApi, refetch } = useSubscriptionList(subscriptionId, site, config);
	const { query } = useSubscriptionUpdater(subscriptionId, site, config);

	const handleUnsubscribe = useCallback(
		async (id: string) => {
			await query({ subscribed: false }, id);
			await refetch();
		},
		[query, refetch]
	);

	const handleResubscribe = useCallback(
		async (id: string) => {
			await query({ subscribed: true }, id);
			await refetch();
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
		/>
	);
};

export default Manage;

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
