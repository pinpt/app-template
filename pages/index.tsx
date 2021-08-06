import { useRouter } from 'next/dist/client/router';
import { Entry, fetchSite, Prebuilt, Site } from '@pinpt/react';
import config from '../pinpoint.config';

interface HomeProps {
	site: Site;
	entries: Entry[];
	showNextPage: boolean;
}

export default function Home(props: HomeProps) {
	const { site, entries, showNextPage } = props;
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
		/>
	);
}

export async function getStaticProps() {
	const { site, changelogs } = await fetchSite(config.slug);
	const showNextPage = changelogs.length > config.pageSize;
	return {
		props: {
			site,
			entries: changelogs.slice(0, config.pageSize),
			showNextPage,
		},
	};
}
