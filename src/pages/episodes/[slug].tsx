import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import api from 'services/api';
import { convertDurationToTimeString } from 'utils';
import * as S from 'pagesStyles/episode.styles';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { usePlayerContext } from 'contexts/Player.context';
import { Episode } from '@types';

type EpisodeProps = {
  episode: Episode;
};

export default function EpisodePage({ episode }: EpisodeProps) {
  const { play } = usePlayerContext();

  return (
    <>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <S.EpisodeContainer>
        <S.ThumbnailContainer>
          <Link href='/'>
            <button type='button'>
              <img src='/images/arrow-left.svg' alt='Voltar' />
            </button>
          </Link>

          <Image src={episode.thumbnail} width={700} height={160} objectFit='cover' />

          <button type='button' onClick={() => play(episode)}>
            <img src='/images/play.svg' alt='Tocar episódio' />
          </button>
        </S.ThumbnailContainer>

        <S.Header>
          <h1>{episode.title}</h1>

          <div className='dataRow'>
            <span>{episode.members}</span>
            <span>{episode.publishedAt}</span>
            <time>{episode.durationString}</time>
          </div>
        </S.Header>

        <S.Description dangerouslySetInnerHTML={{ __html: episode.description }} />
      </S.EpisodeContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/episodes');

  return {
    paths: data.map(episode => {
      return {
        params: {
          slug: episode.id,
        },
      };
    }),

    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  // formatted data
  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: { episode },
    revalidate: 60 * 60 * 36, // 36 hours
  };
};
