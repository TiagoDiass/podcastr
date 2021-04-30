import styled from 'styled-components';

export const PlayerContainer = styled.aside`
  width: 26.5rem;
  height: 100vh;
  padding: 3rem 4rem;

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

    &:not(.playButton) {
      background: transparent;
      border-radius: 0.4rem;
      width: 2.5rem;
      height: 2.5rem;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    &.playButton {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: var(--purple-300);

      &:hover {
        filter: brightness(0.97);
      }
    }
  }
`;
