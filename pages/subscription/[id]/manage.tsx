import { fetchContentPaginated, ISite } from '@pinpt/react';
import config from '../../../pinpoint.config';
import SubscriptionManage from '../../../components/Subscription/Manage';

const Manage = ({ site }: { site: ISite }) => {
	return <SubscriptionManage site={site} />;
};

export default Manage;

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
