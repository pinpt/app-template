import {
	fetchSite,
	Site,
	Entry,
	ChangelogCard,
	Prebuilt,
} from '@pinpt/react';
import { useRouter } from 'next/dist/client/router';
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
			renderCardButton={(entry) => (
				<ChangelogCard.ReadButton onClick={() => router.push(`/entry/${entry.id}`)} />
			)}
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
