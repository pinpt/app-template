import { useRouter } from 'next/router';
import { fetchSite, ISite, Prebuilt } from '@pinpt/react';
import config from '../pinpoint.config';

export interface InternalServerErrorProps {
	site: ISite;
}

const InternalServerError = (props: InternalServerErrorProps) => {
	const { site } = props;
	const router = useRouter();

	return <Prebuilt.Error.InternalServerError site={site} handleLinkClick={() => router.push('/')} />;
};

export async function getStaticProps() {
	const site = await fetchSite(config);

	return {
		props: {
			site,
		},
	};
}

export default InternalServerError;
