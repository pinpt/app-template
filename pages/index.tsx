import { useRouter } from 'next/dist/client/router';
import { ChangelogCard, Entry, fetchSite, Prebuilt, Site } from '@pinpt/react';
import config from '../pinpoint.config';

interface HomeProps {
	site: Site;
	entries: Entry[];
}

export default function Home(props: HomeProps) {
	const { site, entries } = props;
	const router = useRouter();

	return (
		<Prebuilt.Home
			entries={entries}
			site={site}
			latestCount={2}
			handleSelectEntry={(id) => router.push(`/entry/${id}`)}
			handleSearch={(value) => router.push(`/search?term=${value}`)}
			handleAddTagToQuery={(value) => router.push(`/search?tags=${encodeURIComponent(JSON.stringify([value]))}`)}
		/>
	);
}

export async function getStaticProps() {
	const { site, changelogs } = await fetchSite(config.slug);
	return {
		props: {
			site,
			entries: changelogs,
		},
	};
}
