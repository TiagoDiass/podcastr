import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 6.5rem); // 6.5 - Header's height
`;

const Heading = styled.h1`
  font-size: 2.2rem;
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Heading>Opa, parece que não tem nada aqui :(</Heading>
    </NotFoundContainer>
  );
}
