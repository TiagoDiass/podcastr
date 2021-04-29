import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { Logo } from 'components';
import * as S from './Header.styles';

export default function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  return (
    <S.HeaderContainer>
      <Logo />

      <S.Slogan>O melhor lugar para você ouvir podcasts, sempre</S.Slogan>

      <S.Date>{currentDate}</S.Date>
    </S.HeaderContainer>
  );
}
