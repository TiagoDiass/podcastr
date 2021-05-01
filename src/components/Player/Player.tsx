import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { PlayerContext } from 'contexts/Player.context';
import * as S from './Player.styles';

export default function Player() {
  const { episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState } = useContext(
    PlayerContext
  );
  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <S.PlayerContainer>
      <S.Header>
        <img src='/images/playing.svg' alt='Tocando agora' />
        <strong>Tocando agora</strong>
      </S.Header>

      {episode ? (
        <S.PlayingEpisode>
          <Image width={592} height={592} src={episode.thumbnail} objectFit='cover' />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </S.PlayingEpisode>
      ) : (
        <S.EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </S.EmptyPlayer>
      )}

      <S.Footer empty={!episode}>
        <S.Progress>
          <span>00:00</span>
          <div className='slider'>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ background: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className='emptySlider' />
            )}
          </div>
          <span>00:00</span>
        </S.Progress>

        {episode && (
          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <S.Buttons>
          <button type='button' disabled={!episode}>
            <img src='/images/shuffle.svg' alt='Embaralhar' />
          </button>

          <button type='button' disabled={!episode}>
            <img src='/images/play-previous.svg' alt='Tocar anterior' />
          </button>

          <button type='button' className='playButton' disabled={!episode} onClick={togglePlay}>
            {isPlaying ? (
              <img src='/images/pause.svg' alt='Pausar' />
            ) : (
              <img src='/images/play.svg' alt='Tocar' />
            )}
          </button>

          <button type='button' disabled={!episode}>
            <img src='/images/play-next.svg' alt='Tocar próxima' />
          </button>

          <button type='button' disabled={!episode}>
            <img src='/images/repeat.svg' alt='Repetir' />
          </button>
        </S.Buttons>
      </S.Footer>
    </S.PlayerContainer>
  );
}
