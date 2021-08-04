import { Content, Entry, fetchContent, fetchSite, Page } from '@pinpt/react';
import config from '../../pinpoint.config';

export default function EntryPage(props: { entry: Entry }) {
	const { entry } = props;

	return <Page.Entry renderer={<Content node={entry?.content} />} />;
}

export async function getStaticPaths() {
	const { changelogs } = await fetchSite(config.slug);

	return {
		paths: changelogs.map((c) => ({
			params: {
				id: c.id,
				title: c.title,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: { id: string; title: string } }) {
	const entry = await fetchContent(params.id);
	return {
		props: {
			entry,
		},
	};
}
