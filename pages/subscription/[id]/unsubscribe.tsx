import { PrebuiltSubscriptionUnsubscribe, fetchContentPaginated, ISite } from '@pinpt/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import config from '../../../pinpoint.config';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

const Unsubscribe = ({ site }: { site: ISite }) => {
	const [email, setEmail] = useState<string>('');
	const [subscribed, setSubscribed] = useState<boolean>(false);
	const router = useRouter();

	const handleSubscribe = useCallback(async () => {
		setSubscribed(true);
	}, []);

	const handleUnSubscribe = useCallback(async () => {
		setSubscribed(false);
	}, []);

	const handleManageSubscriptions = useCallback(() => {
		const subscriptionId = router.query.id;
		router.push(`/subscription/${subscriptionId}/manage`);
	}, [router]);

	return (
		<PrebuiltSubscriptionUnsubscribe
			site={site}
			email={email}
			renderHeader={(site) => <Header site={site} noSubscribe />}
			renderFooter={(site) => <Footer site={site} noSubscribe />}
			handleSelectHome={() => router.push('/')}
			handleSubscribe={handleSubscribe}
			handleUnsubscribe={handleUnSubscribe}
			subscribed={subscribed}
			manageSubscriptions={handleManageSubscriptions}
			className="flex flex-col h-screen"
		/>
	);
};

export default Unsubscribe;

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
