import * as S from './Player.styles';

export default function Player() {
  return (
    <S.PlayerContainer>
      <S.Header>
        <img src='/images/playing.svg' alt='Tocando agora' />
        <strong>Tocando agora</strong>
      </S.Header>

      <S.EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </S.EmptyPlayer>

      <S.Footer empty={true}>
        <S.Progress>
          <span>00:00</span>
          <div className='slider'>
            <div className='emptySlider' />
          </div>
          <span>00:00</span>
        </S.Progress>

        <S.Buttons>
          <button type='button'>
            <img src='/images/shuffle.svg' alt='Embaralhar' />
          </button>

          <button type='button'>
            <img src='/images/play-previous.svg' alt='Tocar anterior' />
          </button>

          <button type='button' className='playButton'>
            <img src='/images/play.svg' alt='Tocar' />
          </button>

          <button type='button'>
            <img src='/images/play-next.svg' alt='Tocar próxima' />
          </button>

          <button type='button'>
            <img src='/images/repeat.svg' alt='Repetir' />
          </button>
        </S.Buttons>
      </S.Footer>
    </S.PlayerContainer>
  );
}
