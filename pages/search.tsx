import { ChangelogCard, fetchSite, Prebuilt, Site, useSearch } from '@pinpt/react';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import config from '../pinpoint.config';

interface SearchProps {
	site: Site;
}

export default function Search(props: SearchProps) {
	const router = useRouter();
	const { results } = useSearch(router?.query?.term as string, config.siteId);
	return (
		<Prebuilt.SearchResults
			site={props.site}
			entries={results}
			handleSelectEntry={(id) => router.push(`/entry/${id}`)}
			handleSearch={(value) => router.push(`/search?term=${value}`)}
		/>
	);
}

export async function getStaticProps() {
	const { site } = await fetchSite(config.slug);
	return {
		props: {
			site,
		},
	};
}
