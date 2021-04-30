import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from 'services/api';
import { convertDurationToTimeString } from 'utils';

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  durationString: string;
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home({ episodes }: HomeProps) {
  return (
    <>
      <h1>Página index </h1>
      <ul>
        {episodes.map(ep => (
          <li>
            {ep.title} === {ep.id} === {ep.publishedAt} === {ep.durationString}
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  // formatted data
  const episodes = data.map(episode => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(episode.file.duration),
    durationString: convertDurationToTimeString(Number(episode.file.duration)),
    url: episode.file.url,
  }));

  return {
    props: { episodes },
    revalidate: 60 * 60 * 8,
  };
};
