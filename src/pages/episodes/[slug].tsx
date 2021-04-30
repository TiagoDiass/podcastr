import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import api from 'services/api';
import { convertDurationToTimeString } from 'utils';
import * as S from 'pagesStyles/episode.styles';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationString: string;
  url: string;
  description: string;
  publishedAt: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  return (
    <S.EpisodeContainer>
      <S.ThumbnailContainer>
        <button type='button'>
          <img src='/images/arrow-left.svg' alt='Voltar' />
        </button>

        <Image src={episode.thumbnail} width={700} height={160} objectFit='cover' />

        <button type='button'>
          <img src='/images/play.svg' alt='Tocar episódio' />
        </button>
      </S.ThumbnailContainer>

      <S.Header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <time>{episode.durationString}</time>
      </S.Header>

      <S.Description dangerouslySetInnerHTML={{ __html: episode.description }} />
    </S.EpisodeContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/episodes');

  return {
    paths: [],
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
