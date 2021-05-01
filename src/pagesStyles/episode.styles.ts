import styled from 'styled-components';

export const EpisodeContainer = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  max-width: 45rem;
  margin: 0 auto;
`;

export const ThumbnailContainer = styled.div`
  position: relative;

  img {
    border-radius: 1rem;
  }

  button {
    position: absolute;
    top: 50%;
    z-index: 2;
    font-size: 0;
    width: 1.5rem;
    height: 1.5rem;
    padding: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 0.675rem;

    transition: filter 0.25s ease;

    &:first-of-type {
      left: 0;
      background-color: var(--purple-400);
      transform: translate(-50%, -50%);
    }

    &:last-of-type {
      right: 0;
      background-color: var(--green-500);
      transform: translate(50%, -50%);
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const Header = styled.header`
  position: relative;
  padding-bottom: 1rem;

  h1 {
    color: var(--gray-800);
    margin-bottom: 1.5rem;
  }

  .dataRow {
    font-weight: 400;
    font-size: 0.876rem;
    display: flex;
    display: flex;
    column-gap: 1.5rem;
  }

  border-bottom: 1px solid var(--gray-100);
`;

export const Description = styled.div`
  color: var(--gray-800);
  font-weight: 400;
  line-height: 1.5rem;
`;
