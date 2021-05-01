import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { PlayerContext } from 'contexts/Player.context';
import { convertDurationToTimeString } from 'utils';
import * as S from './Player.styles';

export default function Player() {
  const {
    episodeList,
    currentEpisodeIndex,

    isPlaying,
    togglePlay,
    setPlayingState,

    isLooping,
    toggleLoop,

    isShuffling,
    toggleShuffle,

    playNextEpisode,
    playPreviousEpisode,
    hasNext,
    hasPrevious,

    clearPlayerState,
  } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleEpisodedEndend() {
    if (hasNext) {
      playNextEpisode();
    } else {
      clearPlayerState();
    }
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

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

      <S.Footer>
        <S.Progress empty={!episode}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className='slider'>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ background: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
              />
            ) : (
              <div className='emptySlider' />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </S.Progress>

        {episode && (
          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            loop={isLooping}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={handleEpisodedEndend}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <S.Buttons>
          <button
            type='button'
            title='Embaralhar'
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? 'isActive' : ''}
          >
            <img src='/images/shuffle.svg' alt='Embaralhar' />
          </button>

          <button
            type='button'
            title='Tocar anterior'
            disabled={!episode || !hasPrevious}
            onClick={playPreviousEpisode}
          >
            <img src='/images/play-previous.svg' alt='Tocar anterior' />
          </button>

          <button
            type='button'
            title={isPlaying ? 'Pausar' : 'Tocar'}
            className='playButton'
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src='/images/pause.svg' alt='Pausar' />
            ) : (
              <img src='/images/play.svg' alt='Tocar' />
            )}
          </button>

          <button
            type='button'
            title='Tocar próxima'
            disabled={!episode || !hasNext}
            onClick={playNextEpisode}
          >
            <img src='/images/play-next.svg' alt='Tocar próxima' />
          </button>

          <button
            type='button'
            title='Repetir'
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? 'isActive' : ''}
          >
            <img src='/images/repeat.svg' alt='Repetir' />
          </button>
        </S.Buttons>
      </S.Footer>
    </S.PlayerContainer>
  );
}
