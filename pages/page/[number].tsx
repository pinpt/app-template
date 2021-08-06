import { Entry, fetchAnalytics, fetchSite, Prebuilt, Site, Analytics } from '@pinpt/react';
import { useRouter } from 'next/router';
import config from '../../pinpoint.config';

interface PageProps {
	site: Site;
	entries: Entry[];
	pageCount: number;
	nextPage: number;
	previousPage: number;
	currentPage: number;
	analytics: Analytics;
}

export default function Page(props: PageProps) {
	const { entries, site, nextPage, previousPage, currentPage, pageCount, analytics } = props;
	const router = useRouter();

	return (
		<Prebuilt.Home
			entries={entries}
			site={site}
			latestCount={0}
			handleSelectEntry={(id) => router.push(`/entry/${id}`)}
			handleSearch={(value) => router.push(`/search?term=${value}`)}
			handleAddTagToQuery={(value) => router.push(`/search?tags=${encodeURIComponent(JSON.stringify([value]))}`)}
			pageForward={nextPage > 0 ? () => router.push(`/page/${nextPage}`) : undefined}
			pageBack={previousPage !== 1 ? () => router.push(`/page/${previousPage}`) : () => router.push('/')}
			pageNumber={currentPage}
			pageCount={pageCount}
			analytics={analytics}
		/>
	);
}

export async function getStaticPaths() {
	const { changelogs } = await fetchSite(config.slug);
	const pages = Math.ceil(changelogs.length / config.pageSize);
	const paths = [];

	for (let i = 0; i < pages; i++) {
		paths.push({
			params: {
				number: `${i + 1}`,
			},
		});
	}

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: { number: string } }) {
	const index = Number(params.number) - 1;
	const { changelogs, site } = await fetchSite(config.slug);
	const ids = changelogs.map((c) => c.id);

	const thisPage = ids.slice(index * config.pageSize, index * config.pageSize + config.pageSize);
	const pages = Math.ceil(changelogs.length / config.pageSize);

	const currentPage = index + 1;
	const nextPage = currentPage + 1;
	const previousPage = currentPage - 1;

	const analytics = await fetchAnalytics(site.id, thisPage);

	return {
		props: {
			pageCount: pages,
			nextPage: nextPage <= pages ? nextPage : -1,
			previousPage,
			entries: changelogs.filter((c) => thisPage.includes(c.id)),
			currentPage,
			site,
			analytics,
		},
	};
}
