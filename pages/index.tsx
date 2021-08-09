import NextHead from 'next/head';
import { useRouter } from 'next/router';
import {
	Analytics, fetchAnalytics, fetchContentPaginated, fetchSiteWithContentCount, Head, Prebuilt
} from '@pinpt/react';
import config from '../pinpoint.config';

import type { IContent, ISite } from '@pinpt/react';

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
				handleSearch={(value) => router.push(`/search?term=${value}`)}
				handleAddTagToQuery={(value) => router.push(`/search?tags=${encodeURIComponent(JSON.stringify([value]))}`)}
				pageForward={after ? () => router.push(`/entries/2/${after.dateAt}/${pageCount}`) : undefined}
				analytics={analytics}
			/>
		</>
	);
}

export async function getStaticProps() {
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
		revalidate: 60, // TODO: set low and cache on proxy
	};
}
