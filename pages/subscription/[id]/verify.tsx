import { fetchContentPaginated, ISite } from '@pinpt/react';
import config from '../../../pinpoint.config';
import SubscriptionVerify from '../../../components/Subscription/Verify';

const Verify = ({ site }: { site: ISite }) => {
	return <SubscriptionVerify site={site} />;
};

export default Verify;

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
