import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
	Banner,
	createClap,
	fetchContent,
	fetchContentAnalytics,
	fetchContentPaginated,
	Head,
	IContent,
	ISite,
	Prebuilt,
} from '@pinpt/react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import config from '../../pinpoint.config';

interface EntryPageProps {
	content: IContent;
	before: IContent;
	after: IContent;
	site: ISite;
	preview?: boolean;
}

const PreviewBanner = () => {
	return <Banner message="You are viewing an unpublished preview of your page" />;
};

export default function EntryPage(props: EntryPageProps) {
	const router = useRouter();
	const { content, site, before, after, preview } = props;
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
			{preview && <PreviewBanner />}
			<Prebuilt.Entry
				content={content}
				site={site}
				onClap={onClap}
				clapCount={totalCount}
				sessionClapCount={sessionCount}
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

export async function getStaticProps({
	params,
	preview,
	previewData,
}: {
	params: { id: string; title: string };
	preview?: boolean;
	previewData?: any;
}) {
	const { content, before, after, site } = await fetchContent(config, params.id[0], {
		before: true,
		after: true,
		site: true,
		commit: preview ? previewData?.commit : undefined,
	});

	return {
		props: {
			content,
			site,
			before,
			after,
			preview: !!preview,
		},
		revalidate: 1,
	};
}
