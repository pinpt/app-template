import NextHead from 'next/head';
import { useRouter } from 'next/router';
import {
	Analytics,
	fetchAnalytics,
	fetchContentPaginated,
	fetchSiteWithContentCount,
	Head,
	IContent,
	ISite,
	Prebuilt,
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
			<Prebuilt.Home
				entries={content}
				site={site}
				latestCount={1}
				handleSelectContent={(content) => router.push(new URL(content.url).pathname)}
				handleAddTagToQuery={(value) => router.push(`/search?tags=${encodeURIComponent(JSON.stringify([value]))}`)}
				pageForward={after ? () => router.push(`/entries/2/${after.dateAt}/${pageCount}`) : undefined}
				analytics={analytics}
				renderHeader={(site) => <Header site={site} />}
				renderFooter={(site) => <Footer site={site} />}
			/>
		</>
	);
}

export async function getServerSideProps() {
	const { site, content, after } = await fetchContentPaginated(config, {
		limit: config.pageSize,
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

	const pageCount = Math.ceil(count / config.pageSize);

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
