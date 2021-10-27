import { fetchContentPaginated, ISite } from '@pinpt/react';
import config from '../pinpoint.config';
import SubscriptionSubscribe from '../components/Subscription/Subscribe';

const Subscribe = ({ site }: { site: ISite }) => {
	return <SubscriptionSubscribe site={site} />;
};

export default Subscribe;

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
