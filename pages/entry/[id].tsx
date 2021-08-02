import { Entry, fetchContent, fetchSite, Content } from '@pinpt/react';
import config from '../../pinpoint.config';

export default function EntryPage (props: { entry: Entry }) {
	const { entry } = props;

	return (
		<Content node={entry.content} />
	);
};

export async function getStaticPaths () {
	const { changelogs } = await fetchSite(config.slug);

	return {
		paths: changelogs.map((c) => ({
			params: {
				id: c.id,
				title: c.title,
			}
		})),
		fallback: true,
	};
};

export async function getStaticProps ({ params }: { params: { id: string, title: string } }) {
	const entry = await fetchContent(params.id);
	return {
		props: {
			entry,
		},
	};
};
