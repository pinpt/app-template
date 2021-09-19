import NextHead from 'next/head';
import { useRouter } from 'next/router';
import {
	Analytics, fetchAnalytics, fetchContentPaginated, fetchSiteWithContentCount,
	getRouterRelativePath, Head, IContent, ISite, PrebuiltHome
} from '@pinpt/react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import config from '../../pinpoint.config';

interface PageProps {
	pageNumber: number;
	pageCount: number;
	site: ISite;
	content: IContent[];
	before?: IContent;
	after?: IContent;
	analytics: Analytics;
}

export default function Page(props: PageProps) {
	const router = useRouter();
	const { content, site, pageNumber, pageCount, before, after, analytics } = props;

	return (
		<>
			<NextHead>
				<title>{site.theme?.title ?? site.name}</title>
				<Head site={site} />
			</NextHead>
			<PrebuiltHome
				entries={content}
				site={site}
				latestCount={0}
				handleSelectContent={(c: IContent) => router.push(getRouterRelativePath(site, c.url))}
				handleAddTagToQuery={(value) => router.push(`/search?tags=${encodeURIComponent(JSON.stringify([value]))}`)}
				pageForward={
					after ? () => router.push(`/entries/${pageNumber + 1}/${after.dateAt}/${pageCount}`) : undefined
				}
				pageBack={
					pageNumber > 2 && before
						? () => router.push(`/entries/${pageNumber - 1}/${before.dateAt}/${pageCount}`)
						: () => router.push('/')
				}
				pageNumber={pageNumber}
				pageCount={pageCount}
				analytics={analytics}
				renderHeader={(site) => <Header site={site} />}
				renderFooter={(site) => <Footer site={site} />}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const { count } = await fetchSiteWithContentCount(config);
	const pages = Math.ceil(count / config.pageSize);
	const paths = [];

	let next = 0;

	for (let i = 1; i <= pages; i++) {
		const res = await fetchContentPaginated(config, {
			offset: next,
			limit: config.pageSize,
			after: true,
			projection: ['id'],
		});
		paths.push({
			params: {
				id: [`${i + 1}`, String(next), String(pages)],
			},
		});
		next = res.after?.dateAt ?? 0;
	}

	return {
		paths,
		fallback: 'blocking', // server render on-demand if page doesn't exist
	};
}

export async function getStaticProps({ params }: { params: { id: [string, string, string] } }) {
	const pageNumber = parseInt(params.id[0]);
	const offset = parseInt(params.id[1] ?? '0');
	const pageCount = parseInt(params.id[2] ?? '0');

	const res = await fetchContentPaginated(config, {
		offset,
		limit: config.pageSize,
		before: true,
		after: true,
		site: true,
	});

	const analytics = await fetchAnalytics(
		config,
		res.content.map((e) => e.id)
	);

	return {
		props: {
			site: res.site,
			content: res.content,
			before: res.before,
			after: res.after,
			pageNumber,
			pageCount,
			analytics,
		},
		revalidate: 1,
	};
}
