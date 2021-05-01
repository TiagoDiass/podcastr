import styled, { css } from 'styled-components';

export const PlayerContainer = styled.aside`
  width: 26.5rem;
  height: 100vh;
  padding: 3rem 3.5rem;

  background: var(--purple-500);
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }
`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;
  border: 1.5px solid var(--purple-300);
  border-radius: 1.5rem;
  background: linear-gradient(143.8deg, rgba(145, 100, 250, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  padding: 4rem;

  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlayingEpisode = styled.div`
  text-align: center;

  img {
    border-radius: 1.5rem;
  }

  strong {
    display: block;
    margin-top: 2rem;
    font: 600 1.25rem Lexend, sans-serif;
    line-height: 1.75rem;
  }

  span {
    display: block;
    margin-top: 1rem;
    opacity: 0.6;
    line-height: 1.5rem;
  }
`;

export const Footer = styled.footer<{ empty: boolean }>`
  align-self: stretch;

  opacity: ${props => (props.empty ? '0.5' : '1')};
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }

  .slider {
    flex: 1;

    .emptySlider {
      width: 100%;
      height: 4px;
      background: var(--purple-300);
      border-radius: 2px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1rem;

  button {
    border: 0;
    font-size: 0;
    transition: all 0.15s ease;

    &:disabled {
      cursor: default;
    }

    &:not(.playButton) {
      background: transparent;
      border-radius: 0.4rem;
      width: 2.5rem;
      height: 2.5rem;

      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    &.playButton {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: var(--purple-300);

      &:hover:not(:disabled) {
        filter: brightness(0.97);
      }
    }
  }
`;
