import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: var(--white);
  height: 6.5rem;
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
  border-bottom: 1px solid var(--gray-100);
`;

export const Slogan = styled.p`
  margin-left: 2rem;
  padding: 0.25rem 0 0.25rem 2rem;
  border-left: 1px solid var(--gray-100);
`;

export const Date = styled.time`
  margin-left: auto;
  /* margin-right: 1.5rem; */
  text-transform: capitalize;
`;

export const ThemeChangeButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border-radius: 0.5rem;
  border: 1px solid var(--gray-500);
  color: var(--gray-500);

  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-500);
    color: var(--white);
  }
`;
