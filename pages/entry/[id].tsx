import { Entry, fetchContent, fetchSite, Prebuilt, Site } from '@pinpt/react';
import config from '../../pinpoint.config';

export default function EntryPage(props: { entry: Entry, site: Site }) {
	const { entry, site } = props;

	return <Prebuilt.Entry entry={entry} site={site} />;
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
	const [entry, siteData] = await Promise.all([
		fetchContent(params.id),
		fetchSite(config.slug)
	]);
	return {
		props: {
			entry,
			site: siteData.site,
		},
	};
}
