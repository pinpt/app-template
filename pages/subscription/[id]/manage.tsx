import { PrebuiltSubscriptionManage, fetchContentPaginated, ISite, Loader, useSubscriptionList } from '@pinpt/react';
import config from '../../../pinpoint.config';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { useRouter } from 'next/router';

const Manage = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const subscriptionId = (router.query.id ?? '') as string;
	const { result, loading, fileApi } = useSubscriptionList(subscriptionId, site, config);

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
