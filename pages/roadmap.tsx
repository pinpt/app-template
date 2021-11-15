import { fetchContentPaginated, ISite, Loader, useRoadmap, PrebuiltRoadmap, getRouterRelativePath } from "@pinpt/react";
import config from '../pinpoint.config';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Roadmap = ({ site }: { site: ISite }) => {
	const { loading, roadmap } = useRoadmap(config, site);

	if (loading || !roadmap) {
		return <Loader />
	}

	return (
		<div>
			<PrebuiltRoadmap
				site={site}
				roadmap={roadmap}
				renderHeader={(site) => <Header site={site} />}
				renderFooter={(site) => <Footer site={site} />}
			/>
		</div>
	);
};

export default Roadmap;

export async function getServerSideProps() {
	const { site } = await fetchContentPaginated(config, {
		limit: 0,
		site: true,
	});

	if (site && !site.features.roadmap) {
		return {
			redirect: {
				destination: getRouterRelativePath(site, '/'),
				permanent: false,
			}
		}
	}

	return {
		props: {
			site,
		},
	};
}
