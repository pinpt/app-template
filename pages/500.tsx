import { useRouter } from 'next/router';
import { fetchSite, getRouterRelativePath, ISite, PrebuiltError } from '@pinpt/react';
import Footer from '../components/Footer';
import config from '../pinpoint.config';

export interface InternalServerErrorProps {
	site: ISite;
}

const InternalServerError = (props: InternalServerErrorProps) => {
	const { site } = props;
	const router = useRouter();

	return (
		<PrebuiltError.InternalServerError
			site={site}
			handleLinkClick={() => router.push(getRouterRelativePath(site, '/'))}
			renderFooter={(site: ISite) => <Footer site={site} />}
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
