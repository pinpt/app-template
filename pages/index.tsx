import { useRouter } from 'next/dist/client/router';
import { Analytics, Entry, fetchAnalytics, fetchSite, Prebuilt, Site } from '@pinpt/react';
import config from '../pinpoint.config';

interface HomeProps {
	site: Site;
	entries: Entry[];
	showNextPage: boolean;
	analytics: Analytics;
}

export default function Home(props: HomeProps) {
	const { site, entries, showNextPage, analytics } = props;
	const router = useRouter();

	return (
		<Prebuilt.Home
			entries={entries}
			site={site}
			latestCount={2}
			handleSelectEntry={(id) => router.push(`/entry/${id}`)}
			handleSearch={(value) => router.push(`/search?term=${value}`)}
			handleAddTagToQuery={(value) => router.push(`/search?tags=${encodeURIComponent(JSON.stringify([value]))}`)}
			pageForward={showNextPage ? () => router.push(`/page/2`) : undefined}
			analytics={analytics}
		/>
	);
}

export async function getStaticProps() {
	const { site, changelogs } = await fetchSite(config.slug);
	const entries = changelogs.slice(0, config.pageSize);
	const analytics = await fetchAnalytics(
		site.id,
		entries.map((e) => e.id)
	);

	const showNextPage = changelogs.length > config.pageSize;
	return {
		props: {
			site,
			entries,
			showNextPage,
			analytics,
		},
	};
}
