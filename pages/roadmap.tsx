import {
	fetchContentPaginated,
	ISite,
	PrebuiltRoadmap,
	getRouterRelativePath,
	fetchRoadmap,
	getRouterAbsolutePath,
	useRoadmap,
	Head,
} from '@pinpt/react';
import NextHead from 'next/head';
import { PublishedRoadmapResponse } from '@pinpt/react/dist/cjs/lib/types/roadmap';
import config from '../pinpoint.config';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Roadmap = ({ site, roadmap }: { site: ISite; roadmap: PublishedRoadmapResponse }) => {
	const { userVotes, globalVotes, handleVote, loading, pendingVotes } = useRoadmap(config, site);

	return (
		<div>
			<NextHead>
				<title>{roadmap.title}</title>
				<Head site={site} />
			</NextHead>
			<PrebuiltRoadmap
				site={site}
				roadmap={roadmap}
				renderHeader={(site) => (
					<Header site={site} title={roadmap.title || undefined} description={roadmap.description || undefined} />
				)}
				renderFooter={(site) => <Footer site={site} />}
				enableVoting
				userVotes={userVotes}
				handleVote={handleVote}
				totalVotes={globalVotes}
				fetching={loading}
				loadingVotes={pendingVotes}
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
