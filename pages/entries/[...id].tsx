import NextHead from 'next/head';
import { useRouter } from 'next/router';
import {
	Analytics, fetchAnalytics, fetchContentPaginated, getRouterRelativePath, Head, IContent, ISite,
	PrebuiltHome
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
				handleAddTagToQuery={(value) =>
					router.push(getRouterRelativePath(site, `/search?tags=${encodeURIComponent(JSON.stringify([value]))}`))
				}
				pageForward={
					after
						? () =>
								router.push(
									getRouterRelativePath(site, `/entries/${pageNumber + 1}/${after.dateAt}/${pageCount}`)
								)
						: undefined
				}
				pageBack={
					pageNumber > 2 && before
						? () =>
								router.push(
									getRouterRelativePath(site, `/entries/${pageNumber - 1}/${before.dateAt}/${pageCount}`)
								)
						: () => router.push(getRouterRelativePath(site, '/'))
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

export async function getServerSideProps({ params }: { params: { id: [string, string, string] } }) {
	try {
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
		};
	} catch (ex: any) {
		if (ex.code === 404) {
			return {
				notFound: true,
			};
		}
		throw ex;
	}
}
