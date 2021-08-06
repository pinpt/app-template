import { Entry, fetchContent, fetchSite, Prebuilt, Site, createClap, fetchAnalytics } from '@pinpt/react';
import { useCallback, useState } from 'react';
import config from '../../pinpoint.config';

export default function EntryPage(props: { entry: Entry; site: Site; analytics: { claps: number } }) {
	const { entry, site, analytics } = props;
	const [sessionCount, setSessionCount] = useState(1);
	const [totalCount, setTotalCount] = useState(analytics.claps);
	const [maxed, setMaxed] = useState(false);

	const onClap = useCallback(
		async (siteId: string, entryId: string) => {
			if (!maxed) {
				const res = await createClap(siteId, entryId);
				setSessionCount(res.sessionCount);
				setTotalCount(res.count);
				setMaxed(res.max);
			}
		},
		[maxed]
	);

	return (
		<Prebuilt.Entry
			entry={entry}
			site={site}
			onClap={onClap}
			clapCount={totalCount}
			sessionClapCount={sessionCount}
		/>
	);
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
	const [entry, siteData] = await Promise.all([fetchContent(params.id), fetchSite(config.slug)]);
	const analytics = await fetchAnalytics(siteData.site.id, [entry.id]);

	return {
		props: {
			entry,
			site: siteData.site,
			analytics: analytics?.[entry.id],
		},
	};
}
