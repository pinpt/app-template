import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
	createClap,
	fetchContent,
	fetchContentAnalytics,
	fetchContentPaginated,
	Head,
	IContent,
	ISite,
	Prebuilt
} from '@pinpt/react';
import config from '../../pinpoint.config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface EntryPageProps {
	content: IContent;
	before: IContent;
	after: IContent;
	site: ISite;
}

export default function EntryPage(props: EntryPageProps) {
	const router = useRouter();
	const { content, site, before, after } = props;
	const [sessionCount, setSessionCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [maxed, setMaxed] = useState(false);
	const contentId = content.id;

	useEffect(() => {
		fetchContentAnalytics(config, contentId).then(({ claps }: { claps: number }) => {
			setTotalCount(claps);
		});
	}, [contentId]);

	const onClap = useCallback(
		(entry: IContent) => {
			if (!maxed) {
				createClap(config, entry.id).then((res: { sessionCount: number; count: number; max: boolean }) => {
					setSessionCount(res.sessionCount);
					setTotalCount(res.count);
					setMaxed(res.max);
				});
			}
		},
		[maxed]
	);

	return (
		<>
			<NextHead>
				<title>
					{content.title} - {site.name}
				</title>
				<Head site={site} content={content} />
			</NextHead>
			<Prebuilt.Entry
				content={content}
				site={site}
				onClap={onClap}
				clapCount={totalCount}
				sessionClapCount={sessionCount}
				handleSearch={(value) => router.push(`/search?term=${value}`)}
				nextEntry={after}
				previousEntry={before}
				handleSelectEntry={(content) => router.push(new URL(content.url).pathname)}
				renderHeader={(site) => <Header site={site} />}
				renderFooter={(site) => <Footer site={site} />}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const { content } = await fetchContentPaginated(config, { limit: 200, projection: ['id', 'title'] });

	return {
		paths: content.map(({ id, title }) => ({
			params: {
				id: [id, title],
			},
		})),
		fallback: 'blocking', // server render on-demand if page doesn't exist
	};
}

export async function getStaticProps({ params }: { params: { id: string; title: string } }) {
	const { content, before, after, site } = await fetchContent(config, params.id[0], {
		before: true,
		after: true,
		site: true,
	});

	return {
		props: {
			content,
			site,
			before,
			after,
		},
		revalidate: 60, // TODO: set low and cache on proxy
	};
}
