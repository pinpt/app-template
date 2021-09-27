import NextHead from 'next/head';
import { useRouter } from 'next/router';
import {
	Analytics, fetchAnalytics, fetchContentPaginated, fetchSiteWithContentCount,
	getRouterRelativePath, Head, IContent, ISite, PrebuiltHome
} from '@pinpt/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import config from '../pinpoint.config';

interface HomeProps {
	site: ISite;
	content: IContent[];
	after?: IContent;
	analytics: Analytics;
	pageCount: number;
}

export default function Home(props: HomeProps) {
	const { site, content, after, analytics, pageCount } = props;
	const router = useRouter();
	const title = site.theme?.description ? `${site.theme.description} - ${site.name}` : site.name;

	return (
		<>
			<NextHead>
				<title>{title}</title>
				<Head site={site} />
			</NextHead>
			<PrebuiltHome
				entries={content}
				site={site}
				latestCount={1}
				handleSelectContent={(content) => router.push(getRouterRelativePath(site, content.url))}
				handleAddTagToQuery={(value) =>
					router.push(getRouterRelativePath(site, `/search?tags=${encodeURIComponent(JSON.stringify([value]))}`))
				}
				pageForward={
					after
						? () => router.push(getRouterRelativePath(site, `/entries/2/${after.dateAt}/${pageCount}`))
						: undefined
				}
				analytics={analytics}
				renderHeader={(site) => <Header site={site} />}
				renderFooter={(site) => <Footer site={site} />}
			/>
		</>
	);
}

export async function getServerSideProps() {
	const pageSize = config.pageSize ?? 11;
	const { site, content, after } = await fetchContentPaginated(config, {
		limit: pageSize,
		after: true,
		site: true,
	});

	const [{ count }, analytics] = await Promise.all([
		fetchSiteWithContentCount(config),
		fetchAnalytics(
			config,
			content.map((e) => e.id)
		),
	]);

	const pageCount = Math.ceil(count / pageSize);

	return {
		props: {
			site,
			content,
			after,
			analytics,
			pageCount,
		},
	};
}
