import { fetchContentPaginated, ISite } from '@pinpt/react';
import config from '../../../pinpoint.config';
import SubscriptionUnsubscribe from '../../../components/Subscription/Unsubscribe';

const Unsubscribe = ({ site }: { site: ISite }) => {
	return <SubscriptionUnsubscribe site={site} />;
};

export default Unsubscribe;

export async function getServerSideProps() {
	const { site } = await fetchContentPaginated(config, {
		limit: 0,
		site: true,
	});

	return {
		props: {
			site,
		},
	};
}
