import { ChangelogCard, fetchSite, Prebuilt, Site, useSearch } from '@pinpt/react';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';
import config from '../pinpoint.config';

interface SearchProps {
	site: Site;
}

export default function Search(props: SearchProps) {
	const router = useRouter();
	const { results, loading } = useSearch((router?.query?.term ?? '') as string, config.siteId);

	const handleRemoveFromQuery = useCallback(
		(_term: string, clear: boolean) => {
			if (clear) {
				router.push('/');
			}
		},
		[router]
	);

	return (
		<Prebuilt.SearchResults
			site={props.site}
			entries={results}
			handleSelectEntry={(id) => router.push(`/entry/${id}`)}
			handleSearch={(value) => router.push(`/search?term=${value}`)}
			loading={loading}
			searchTerm={(router?.query?.term ?? '') as string}
			handleRemoveFromQuery={handleRemoveFromQuery}
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
