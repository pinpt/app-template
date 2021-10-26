import { PrebuiltSubscriptionManage, fetchContentPaginated, ISite } from '@pinpt/react';
import { SubscriptionInfo } from '@pinpt/react/dist/cjs/lib/types/subscription';
import config from '../../../pinpoint.config';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { useRouter } from 'next/router';

const Manage = ({ site }: { site: ISite }) => {
	const router = useRouter();

	return (
		<PrebuiltSubscriptionManage
			site={site}
			subscriptions={{ subscriptions: [], sites: {} } as SubscriptionInfo}
			renderHeader={(site) => <Header site={site} noSubscribe />}
			renderFooter={(site) => <Footer site={site} noSubscribe />}
			handleSelectHome={() => router.push('/')}
			className="flex flex-col h-screen"
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
