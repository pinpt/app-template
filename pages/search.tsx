import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { fetchSite, Head, Prebuilt, useSearch } from '@pinpt/react';
import config from '../pinpoint.config';
import Header from '../components/Header';
import Footer from '../components/Footer';

import type { ISite } from '@pinpt/react';
interface SearchProps {
	site: ISite;
}

export default function Search(props: SearchProps) {
	const { site } = props;
	const router = useRouter();
	const tags = JSON.parse(decodeURIComponent((router?.query?.tags ?? '') as string) || '[]');
	const term = (router?.query?.term as string) ?? '';
	const { results, loading } = useSearch(term, tags, config.siteId);

	const handleRemoveFromQuery = useCallback(
		(term: string, clear: boolean) => {
			console.log(term, tags);
			if (clear) {
				router.push('/');
			} else {
				const idx = tags.indexOf(term);
				if (idx >= 0) {
					const res = [...tags];
					res.splice(idx, 1);
					if (res.length === 0) {
						router.push('/');
					} else {
						router.push(`/search?tags=${encodeURIComponent(JSON.stringify(res))}`);
					}
				}
			}
		},
		[router, tags]
	);

	const handleAddToQuery = useCallback(
		(term: string) => {
			if (!tags.includes(term)) {
				router.push(`/search?tags=${encodeURIComponent(JSON.stringify([...tags, term]))}`);
			}
		},
		[router, tags]
	);

	const title = useMemo(
		() => `Search results for ${tags.length ? tags.join(' AND ') : term} - ${site.theme?.title ?? site.name}`,
		[tags, term, site]
	);

	return (
		<>
			<NextHead>
				<title>{title}</title>
				<Head site={site} />
			</NextHead>

			<Prebuilt.SearchResults
				site={props.site}
				entries={results}
				handleSelectContent={(content) => {
					console.log('Hello', content);
					router.push(new URL(content.url).pathname);
				}}
				loading={loading}
				searchTerm={(router?.query?.term ?? '') as string}
				searchTags={tags}
				handleRemoveFromQuery={handleRemoveFromQuery}
				handleAddTagToQuery={handleAddToQuery}
				renderCardStatistics={() => <></>}
				renderHeader={(site) => <Header site={site} />}
				renderFooter={(site) => <Footer site={site} />}
			/>
		</>
	);
}

export async function getStaticProps() {
	const site = await fetchSite(config);
	return {
		props: {
			site,
		},
		revalidate: 600 * 5,
	};
}
