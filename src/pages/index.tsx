import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from 'services/api';
import { convertDurationToTimeString } from 'utils';
import * as S from 'pagesStyles/home.styles';
import { Episode } from '@types';
import { usePlayerContext } from 'contexts/Player.context';

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayerContext();
  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <>
      <Head>
        <title>Podcastr | Home</title>
      </Head>
      <S.HomeContainer>
        <S.LatestEpisodes>
          <S.Heading>Últimos lançamentos</S.Heading>

          <ul>
            {latestEpisodes.map((episode, index) => (
              <li key={episode.id}>
                <div className='imageWrapper' style={{ width: 68 }}>
                  <Image
                    width={192}
                    height={192}
                    objectFit='cover'
                    src={episode.thumbnail}
                    alt={episode.title}
                  />
                </div>

                <div className='episodeDetails'>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <time>{episode.durationString}</time>
                </div>

                <button
                  type='button'
                  onClick={() => playList(episodeList, index)}
                  title='Tocar episódio'
                >
                  <img src='/images/play-green.svg' alt='Tocar episódio' />
                </button>
              </li>
            ))}
          </ul>
        </S.LatestEpisodes>

        <S.AllEpisodes>
          <h2>Todos episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {allEpisodes.map((episode, index) => (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      objectFit='cover'
                      src={episode.thumbnail}
                      alt={episode.title}
                    />
                  </td>

                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>

                  <td>{episode.members}</td>

                  <td style={{ width: 100 }}>{episode.publishedAt}</td>

                  <td>{episode.durationString}</td>

                  <td>
                    <button
                      type='button'
                      onClick={() => playList(episodeList, index + latestEpisodes.length)}
                      title='Tocar episódio'
                    >
                      <img src='/images/play-green.svg' alt='Tocar episódio' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </S.AllEpisodes>
      </S.HomeContainer>
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

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: { latestEpisodes, allEpisodes },
    revalidate: 60 * 60 * 8,
  };
};
