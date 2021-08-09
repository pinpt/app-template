import NextHead from 'next/head';
import config from '../pinpoint.config';

interface SearchProps {
	// site: Site;
}

export default function Search(props: SearchProps) {
	// const router = useRouter();
	// const tags = JSON.parse(decodeURIComponent((router?.query?.tags ?? '') as string) || '[]');
	// const { results, loading } = useSearch((router?.query?.term ?? '') as string, tags, config.siteId);

	// const handleRemoveFromQuery = useCallback(
	// 	(term: string, clear: boolean) => {
	// 		console.log(term, tags);
	// 		if (clear) {
	// 			router.push('/');
	// 		} else {
	// 			const idx = tags.indexOf(term);
	// 			if (idx >= 0) {
	// 				const res = [...tags];
	// 				res.splice(idx, 1);
	// 				if (res.length === 0) {
	// 					router.push('/');
	// 				} else {
	// 					router.push(`/search?tags=${encodeURIComponent(JSON.stringify(res))}`);
	// 				}
	// 			}
	// 		}
	// 	},
	// 	[router, tags]
	// );

	// const handleAddToQuery = useCallback(
	// 	(term: string) => {
	// 		if (!tags.includes(term)) {
	// 			router.push(`/search?tags=${encodeURIComponent(JSON.stringify([...tags, term]))}`);
	// 		}
	// 	},
	// 	[router, tags]
	// );

	// return (
	// 	<Prebuilt.SearchResults
	// 		site={props.site}
	// 		entries={results}
	// 		handleSelectEntry={(id) => router.push(`/entry/${id}`)}
	// 		handleSearch={(value) => router.push(`/search?term=${value}`)}
	// 		loading={loading}
	// 		searchTerm={(router?.query?.term ?? '') as string}
	// 		searchTags={tags}
	// 		handleRemoveFromQuery={handleRemoveFromQuery}
	// 		handleAddTagToQuery={handleAddToQuery}
	// 		renderCardStatistics={() => <></>}
	// 	/>
	// );
	return <div>TODO</div>;
}

export async function getStaticProps() {
	// const { site } = await fetchSite(config.slug);
	return {
		props: {
			// site,
		},
		revalidate: 60, // TODO: set low and cache on proxy
	};
}
