import {
	fetchContentPaginated,
	ISite,
	PrebuiltRoadmap,
	getRouterRelativePath,
	fetchRoadmap,
	getRouterAbsolutePath,
} from '@pinpt/react';
import { PublishedRoadmapResponse } from '@pinpt/react/dist/cjs/lib/types/roadmap';
import config from '../pinpoint.config';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Roadmap = ({ site, roadmap }: { site: ISite; roadmap: PublishedRoadmapResponse }) => {
	return (
		<div>
			<PrebuiltRoadmap
				site={site}
				roadmap={roadmap}
				renderHeader={(site) => <Header site={site} title={roadmap.title} description={roadmap.description} />}
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

	if (site) {
		if (!site.features.roadmap) {
			return {
				redirect: {
					destination: getRouterRelativePath(site, '/'),
					permanent: false,
				},
			};
		}

		const roadmap = await fetchRoadmap({
			...config,
			siteUrl: getRouterAbsolutePath(site, ''),
		});

		return {
			props: {
				site,
				roadmap,
			},
		};
	}

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};
}
