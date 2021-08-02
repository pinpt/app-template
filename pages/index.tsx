import { fetchSite, Site, Entry, Page, Header, Subscribe, splitEntries, Latest, ChangelogCard, Statistic, Recent } from '@pinpt/react';
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
}

export default function Home(props: HomeProps) {
  const { site, changelogs } = props;
  const { latest, recent } = splitEntries(changelogs, 2);

  return (
    <Page
      header={(
        <Header
          title={site.name}
          description={`See what's new in ${site.name}`}
          subscribe={<Subscribe />}
        />
      )}
      latest={latest.length > 0 ? (
        <Latest>
          {latest.map((entry) => {
            return (
              <Card key={entry.id} entry={entry} />
            );
          })}
        </Latest>
      ) : undefined}
      recent={recent.length > 0 ? (
        <Recent>
          {recent.map((entry) => {
            return (
              <Card key={entry.id} entry={entry} />
            );
          })}
        </Recent>
      ) : undefined}
    />
  );
};

export async function getStaticProps(context: any) {
  const { site, changelogs } = await fetchSite(config.slug);
  return {
    props: {
      site,
      changelogs,
    },
  };
}

