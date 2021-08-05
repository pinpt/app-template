import { ChangelogCard, fetchSite, Prebuilt, Site, useSearch } from '@pinpt/react';
import { useRouter } from 'next/dist/client/router';
import config from '../pinpoint.config';

interface SearchProps {
	site: Site;
}

const Search = (props: SearchProps) => {
	const router = useRouter();
	const { results } = useSearch((router.query?.term ?? '') as string, config.siteId);
	return (
		<Prebuilt.SearchResults
			site={props.site}
			entries={results}
			renderCardButton={(entry) => <ChangelogCard.ReadButton onClick={() => router.push(`/entry/${entry.id}`)} />}
		/>
	);
};

export default Search;

export async function getStaticProps() {
	const { site } = await fetchSite(config.slug);
	return {
		props: {
			site,
		},
	};
}
