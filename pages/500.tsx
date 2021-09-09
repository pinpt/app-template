import { useRouter } from 'next/router';
import { fetchSite, ISite, PrebuiltError } from '@pinpt/react';
import config from '../pinpoint.config';
import Footer from '../components/Footer';

export interface InternalServerErrorProps {
	site: ISite;
}

const InternalServerError = (props: InternalServerErrorProps) => {
	const { site } = props;
	const router = useRouter();

	return (
		<PrebuiltError.InternalServerError
			site={site}
			handleLinkClick={() => router.push('/')}
			renderFooter={(site) => <Footer site={site} />}
		/>
	);
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
