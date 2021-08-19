import { useRouter } from 'next/router';
import { fetchSite, ISite, Prebuilt } from '@pinpt/react';
import config from '../pinpoint.config';

export interface NotFoundErrorProps {
	site: ISite;
}

const NotFoundError = (props: NotFoundErrorProps) => {
	const { site } = props;
	const router = useRouter();

	return (
		<Prebuilt.Error.NotFound
			site={site}
			handleLinkClick={() => router.push('/')}
		/>
	)
}

export async function getStaticProps() {
	const site = await fetchSite(config);

	return {
		props: {
			site,
		},
	};
}

export default NotFoundError;
