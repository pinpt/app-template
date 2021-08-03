import {
	fetchSite,
	Site,
	Entry,
	Page,
	Header,
	Subscribe,
	splitEntries,
	Latest,
	ChangelogCard,
	Statistic,
	Recent,
	Footer,
	Copyright,
	Logo,
	Social,
} from '@pinpt/react';
import { useRouter } from 'next/dist/client/router';
import config from '../pinpoint.config';

interface HomeProps {
	site: Site;
	changelogs: Entry[];
}

const Card = ({ entry }: { entry: Entry }) => {
	const router = useRouter();

	return (
		<ChangelogCard.Container
			imageUrl={entry.cover_image}
			title={<ChangelogCard.Title title={entry.title} />}
			date={<ChangelogCard.Date ts={entry.publishedAt} />}
			description={<ChangelogCard.Description description={entry.headline} />}
			statistics={<Statistic.Bar claps={0} views={0} />}
			button={<ChangelogCard.ReadButton onClick={() => router.push(`/entry/${entry.id}`)} />}
		/>
	);
};

export default function Home(props: HomeProps) {
	const { site, changelogs } = props;
	const { latest, recent } = splitEntries(changelogs, 2);

	return (
		<Page
			header={<Header title={`${site.name} Changelog`} description={site.theme.description} subscribe={<Subscribe />} />}
			latest={
				latest.length > 0 ? (
					<Latest>
						{latest.map((entry) => {
							return <Card key={entry.id} entry={entry} />;
						})}
					</Latest>
				) : undefined
			}
			recent={
				recent.length > 0 ? (
					<Recent>
						{recent.map((entry) => {
							return <Card key={entry.id} entry={entry} />;
						})}
					</Recent>
				) : undefined
			}
			footer={
				<Footer
					copyright={
						<Copyright
							text={site.theme.copyright}
							logo={<Logo src={site.logoUrl} href={site.theme.logoLink} />}
						/>
					}
					subscribe={<Subscribe />}
					social={
						<Social.Bar>
							{site.theme.social?.facebook && <Social.Facebook href={site.theme.social.facebook} />}
							{site.theme.social?.instagram && <Social.Instagram href={site.theme.social.instagram} />}
							{site.theme.social?.linkedin && <Social.LinkedIn href={site.theme.social.linkedin} />}
							{site.theme.social?.github && <Social.Github href={site.theme.social.github} />}
							{site.theme.social?.twitter && <Social.Twitter href={site.theme.social.twitter} />}
						</Social.Bar>
					}
				/>
			}
		/>
	);
}

export async function getStaticProps() {
	const { site, changelogs } = await fetchSite(config.slug);
	return {
		props: {
			site,
			changelogs,
		},
	};
}
